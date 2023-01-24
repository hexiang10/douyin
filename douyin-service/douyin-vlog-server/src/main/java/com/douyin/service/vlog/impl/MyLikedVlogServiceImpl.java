package com.douyin.service.vlog.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.framework.domain.vlog.MyLikedVlog;
import com.douyin.mapper.vlog.MyLikedVlogMapper;
import com.douyin.service.middleware.MessageService;
import com.douyin.service.vlog.MyLikedVlogService;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 点赞短视频关联表
 服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@DubboService
public class MyLikedVlogServiceImpl extends ServiceImpl<MyLikedVlogMapper, MyLikedVlog> implements MyLikedVlogService {

    @Autowired
    MyLikedVlogMapper myLikedVlogMapper;

    @Autowired
    Sid sid;

    @DubboReference
    MessageService messageService;


    /**
     * 用户点赞/喜欢视频
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @Override
    @Transactional
    public void userLikeVlog(String userId, String vlogId) {
        MyLikedVlog likedVlog = new MyLikedVlog();
        likedVlog.setId(sid.nextShort());
        likedVlog.setUserId(userId);
        likedVlog.setVlogId(vlogId);
        myLikedVlogMapper.insert(likedVlog);

        // 系统消息：点赞短视频 —— V1
        //Vlog vlog = vlogMapper.selectById(vlogId);
        //Map msgContent = new HashMap();
        //msgContent.put("vlogId", vlogId);
        //msgContent.put("vlogCover", vlog.getCover());
        //msgService.createMsg(userId,vlog.getVlogerId(), MessageTypeEnum.LIKE_VLOG.type, msgContent);

        // 系统消息：点赞短视频 —— V2
        //Vlog vlog = vlogMapper.selectById(vlogId);
        //Map msgContent = new HashMap();
        //msgContent.put("vlogId", vlogId);
        //msgContent.put("vlogCover", vlog.getCover());
//        msgService.createMsg(userId,
//                            vlog.getVlogerId(),
//                            MessageEnum.LIKE_VLOG.type,
//                            msgContent);
        // MQ异步解耦
        //MessageMO messageMO = new MessageMO();
        //messageMO.setFromUserId(userId);
        //messageMO.setToUserId(vlog.getVlogerId());
        //messageMO.setMsgContent(msgContent);
        //rabbitTemplate.convertAndSend(
        //        RabbitMQConfig.EXCHANGE_MSG,
        //        "sys.msg." + MessageEnum.LIKE_VLOG.enValue,
        //        JsonUtils.objectToJson(messageMO));

        // 系统消息：点赞短视频 —— V3
        messageService.sentMyLikedVlogMessage(userId,vlogId);
    }

    /**
     * 用户取消点赞/喜欢视频
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @Override
    @Transactional
    public void userUnLikeVlog(String userId, String vlogId) {
        MyLikedVlog likedVlog = new MyLikedVlog();
        likedVlog.setUserId(userId);
        likedVlog.setVlogId(vlogId);
        LambdaQueryWrapper<MyLikedVlog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MyLikedVlog::getUserId,userId).eq(MyLikedVlog::getVlogId,vlogId);
        myLikedVlogMapper.delete(wrapper);
    }
}