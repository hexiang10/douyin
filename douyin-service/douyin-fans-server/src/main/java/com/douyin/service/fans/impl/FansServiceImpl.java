package com.douyin.service.fans.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.results.PagedGridResult;
import com.douyin.common.utils.RedisUtil;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.framework.domain.fans.Fans;
import com.douyin.framework.domain.fans.vo.FansVo;
import com.douyin.framework.domain.vlog.vo.VlogerVO;
import com.douyin.framework.utils.IPageUtil;
import com.douyin.mapper.fans.FansMapper;
import com.douyin.service.fans.FansService;
import com.douyin.service.middleware.MessageService;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 粉丝表
 * <p>
 * 服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@DubboService
public class FansServiceImpl extends ServiceImpl<FansMapper, Fans> implements FansService {

    @Autowired
    RedisUtil redis;

    @Autowired
    Sid sid;

    @Autowired
    FansMapper fansMapper;

    @DubboReference
    MessageService messageService;

    // 我的粉丝总数
    public static final String REDIS_FANS_AND_VLOGGER_RELATIONSHIP = "redis_fans_and_vlogger_relationship";

    /**
     * 关注
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @Override
    @Transactional
    public void doFollow(String myId, String vlogerId) {
        Fans fans = new Fans();
        fans.setId(sid.nextShort());
        fans.setFanId(myId);
        fans.setVlogerId(vlogerId);
        // 判断对方是否关注我，如果关注我，那么双方都要互为朋友关系
        Fans vloger = queryFansRelationship(vlogerId, myId);
        if (vloger != null) {
            fans.setIsFanFriendOfMine(YesOrNo.YES.type);
            vloger.setIsFanFriendOfMine(YesOrNo.YES.type);
            fansMapper.updateById(vloger);
        } else {
            fans.setIsFanFriendOfMine(YesOrNo.NO.type);
        }

        fansMapper.insert(fans);

        // 系统消息：关注
        //msgService.createMsg(myId,vlogerId, MessageTypeEnum.FOLLOW_YOU.type,null);
        //MessageMO messageMO = new MessageMO();
        //messageMO.setFromUserId(myId);
        //messageMO.setToUserId(vlogerId);
        //// 优化：使用mq异步解耦
        //rabbitTemplate.convertAndSend(
        //        RabbitMQConfig.EXCHANGE_MSG,
        //        "sys.msg." + MessageEnum.FOLLOW_YOU.enValue,
        //        JsonUtils.objectToJson(messageMO));

        messageService.sentFollowMessage(myId, vlogerId);
    }

    /**
     * 取消关注
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @Override
    @Transactional
    public void doCancel(String myId, String vlogerId) {
        // 判断我们是否是朋友关系，如果是，则需要取消对方的关系
        Fans fans = queryFansRelationship(myId, vlogerId);
        if (fans != null && fans.getIsFanFriendOfMine() == YesOrNo.YES.type) {
            // 抹除双方的朋友关系，自己的关系删除即可
            Fans vloger = queryFansRelationship(vlogerId, myId);
            vloger.setIsFanFriendOfMine(YesOrNo.NO.type);
            fansMapper.updateById(vloger);
        }
        // 删除自己的关注关联表记录
        fansMapper.deleteById(fans);
    }

    /**
     * 查询用户是否关注博主
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @Override
    public boolean queryDoIFollowVloger(String myId, String vlogerId) {
        Fans vloger = queryFansRelationship(myId, vlogerId);
        return vloger != null;
    }

    /**
     * 分页查询用户关注博主
     *
     * @param myId     用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @Override
    public PagedGridResult queryMyFollows(String myId, Integer page, Integer pageSize) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("myId", myId);
        IPage<VlogerVO> vlogerVOIPage = fansMapper.queryMyFollows(PageDTO.of(page, pageSize), paramMap);
        return IPageUtil.setterPagedGrid(vlogerVOIPage, page);
    }

    /**
     * 分页查询用户粉丝
     *
     * @param myId     用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @Override
    public PagedGridResult queryMyFans(String myId, Integer page, Integer pageSize) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("myId", myId);
        IPage<FansVo> fansVOIPage = fansMapper.queryMyFans(PageDTO.of(page, pageSize), paramMap);
        List<FansVo> fansVoList = fansVOIPage.getRecords();
        String relationship;
        for (FansVo fansVO : fansVoList) {
            relationship = redis.get(REDIS_FANS_AND_VLOGGER_RELATIONSHIP + ":" + myId + ":" + fansVO.getFanId());
            if (StringUtils.isNotBlank(relationship) && relationship.equalsIgnoreCase("1")) {
                fansVO.setFriend(true);
            }
        }
        fansVOIPage.setRecords(fansVoList);
        return IPageUtil.setterPagedGrid(fansVOIPage, page);
    }

    /**
     * 查询是否为朋友关系
     *
     * @param fanId    关注者
     * @param vlogerId 被关注者
     */
    public Fans queryFansRelationship(String fanId, String vlogerId) {
        LambdaQueryWrapper<Fans> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Fans::getFanId, fanId).eq(Fans::getVlogerId, vlogerId);
        return fansMapper.selectOne(wrapper);
    }
}