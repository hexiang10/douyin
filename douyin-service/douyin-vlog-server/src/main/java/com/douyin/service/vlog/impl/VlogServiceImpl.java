package com.douyin.service.vlog.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.results.PagedGridResult;
import com.douyin.common.utils.RedisUtil;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.framework.domain.vlog.bo.VlogBo;
import com.douyin.framework.domain.vlog.vo.VlogIndexVO;
import com.douyin.framework.domain.vlog.vo.VlogMyLikedVO;
import com.douyin.framework.utils.IPageUtil;
import com.douyin.mapper.vlog.VlogMapper;
import com.douyin.service.fans.FansService;
import com.douyin.service.vlog.VlogService;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 短视频表 服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
@DubboService
public class VlogServiceImpl extends ServiceImpl<VlogMapper, Vlog> implements VlogService {

    @Autowired
    VlogMapper vlogMapper;

    @Autowired
    Sid sid;

    @Autowired
    RedisUtil redis;

    @DubboReference
    FansService fansService;

    public static final String REDIS_USER_LIKE_VLOG = "redis_user_like_vlog";
    public static final String REDIS_VLOG_BE_LIKED_COUNTS = "redis_vlog_be_liked_counts";

    /**
     * 新增volg视频信息
     *
     * @param vlogBo 视频信息对象
     */
    @Override
    @Transactional
    public void createVlog(VlogBo vlogBo) {
        String vlogId = sid.nextShort();
        Vlog vlog = new Vlog();
        BeanUtils.copyProperties(vlogBo,vlog);
        vlog.setId(vlogId);
        vlog.setCommentsCounts(0);
        vlog.setLikeCounts(0);
        vlog.setIsPrivate(YesOrNo.NO.type);
        if(StringUtils.isBlank(vlog.getCover())){
            vlog.setCover("https://img-blog.csdnimg.cn/e9ed66d572754951bc5b4173791d6fce.jpeg");
        }
        if(StringUtils.isBlank(vlog.getTitle())){
            vlog.setTitle("我发布了一条新视频，快来看看吧~");
        }
        vlogMapper.insert(vlog);
    }

    /**
     * 查询首页或搜索的Vlog列表
     *
     * @param search 搜索条件，可以为空
     */
    @Override
    public PagedGridResult getVlogList(String userId,String search, Integer page, Integer pageSize) {
        Map<String,Object> paramMap = new HashMap<>();
        if (StringUtils.isNotEmpty(search)) {
            paramMap.put("search", search);
        }
        IPage<VlogIndexVO> vlogPageList = vlogMapper.getVlogList(PageDTO.of(page, pageSize), paramMap);
        List<VlogIndexVO> vlogIndexVOList = vlogPageList.getRecords();
        for (VlogIndexVO vlogIndexVO : vlogIndexVOList) {
               setVlogIndexVO(vlogIndexVO,userId,0);
        }
        vlogPageList.setRecords(vlogIndexVOList);
        return IPageUtil.setterPagedGrid(vlogPageList, page);
    }

    /**
     * 根据视频Id查询对应视频详情
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @Override
    public VlogIndexVO getVlogById(String userId,
                                   String vlogId) {
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("vlogId", vlogId);
        List<VlogIndexVO> vlog = vlogMapper.getVlogById(paramMap);
        if(vlog!=null&&vlog.size()>0){
            VlogIndexVO vlogIndexVO = vlog.get(0);
            setVlogIndexVO(vlogIndexVO,userId,0);
            return vlogIndexVO;
        }
        return null;
    }

    /**
     * 更改视频私密状态
     *
     * @param userId  用户Id
     * @param vlogId  视频Id
     * @param yesOrNo 私密与否
     */
    @Override
    @Transactional
    public void changeToPrivateOrPublic(String userId, String vlogId, Integer yesOrNo) {
        LambdaQueryWrapper<Vlog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Vlog::getVlogerId,userId)
               .eq(Vlog::getId,vlogId);
        Vlog vlog = new Vlog();
        //vlog.setId(vlogId);
        vlog.setIsPrivate(yesOrNo);
        vlogMapper.update(vlog,wrapper);

    }

    /**
     * 查询用户公开/私密的视频列表
     *
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     * @param yesOrNo  视频私密类型
     */
    @Override
    public PagedGridResult queryUserVlogList(String userId, Integer page, Integer pageSize, Integer yesOrNo) {
        LambdaQueryWrapper<Vlog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Vlog::getVlogerId,userId)
                .eq(Vlog::getIsPrivate,yesOrNo)
                .orderByDesc(Vlog::getCreatedTime);
        Page<Vlog> vlogPage = vlogMapper.selectPage(new Page<>(page,pageSize), wrapper);
        return IPageUtil.setterPagedGrid(vlogPage, page);
    }

    /**
     * 查询用户点赞过的视频
     *
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @Override
    public PagedGridResult getMyLikedVlogList(String userId, Integer page, Integer pageSize) {
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("userId", userId);
        IPage<VlogMyLikedVO> vlogPageList = vlogMapper.getMyLikedVlogList(PageDTO.of(page, pageSize), paramMap);
        return IPageUtil.setterPagedGrid(vlogPageList,page);
    }

    /**
     * 查询用户点关注博主的视频
     *
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @Override
    public PagedGridResult getMyFollowVlogList(String userId, Integer page, Integer pageSize) {
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("userId", userId);
        IPage<VlogIndexVO> vlogPageList = vlogMapper.getMyFollowVlogList(PageDTO.of(page, pageSize), paramMap);
        List<VlogIndexVO> vlogIndexVOList = vlogPageList.getRecords();
        for (VlogIndexVO vlogIndexVO : vlogIndexVOList) {
            setVlogIndexVO(vlogIndexVO,userId,1);
        }
        vlogPageList.setRecords(vlogIndexVOList);
        return IPageUtil.setterPagedGrid(vlogPageList,page);
    }

    /**
     * 查询用户朋友的视频
     *
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @Override
    public PagedGridResult getMyFriendVlogList(String userId, Integer page, Integer pageSize) {
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("userId", userId);
        IPage<VlogIndexVO> vlogPageList = vlogMapper.getMyFriendVlogList(PageDTO.of(page, pageSize), paramMap);
        List<VlogIndexVO> vlogIndexVOList = vlogPageList.getRecords();
        for (VlogIndexVO vlogIndexVO : vlogIndexVOList) {
            setVlogIndexVO(vlogIndexVO,userId,1);
        }
        vlogPageList.setRecords(vlogIndexVOList);
        return IPageUtil.setterPagedGrid(vlogPageList,page);
    }


    /**
     * 获取视频点赞总数
     *
     * @param vlogId 视频Id
     */
    @Override
    public Integer getVlogBeLikedCounts(String vlogId) {
        String countsStr = redis.get(REDIS_VLOG_BE_LIKED_COUNTS + ":" + vlogId);
        if (StringUtils.isBlank(countsStr)) {
            countsStr = "0";
        }
        return Integer.valueOf(countsStr);
    }

    /**
     * 把counts输入数据库
     *
     * @param vlogId 视频Id
     * @param counts 数量
     * @param type   刷新类型：0刷新视频点赞数；1刷新视频评论数
     */
    @Override
    @Transactional
    public void flushCounts(String vlogId, Integer counts, Integer type) {
        Vlog vlog = new Vlog();
        vlog.setId(vlogId);
        if (type == 0) {
            vlog.setLikeCounts(counts);
        }
        if (type == 1) {
            vlog.setCommentsCounts(counts);
        }
        vlogMapper.updateById(vlog);
    }

    /**
     * 判断用户是否点赞此视频
     *
     * @param myId   用户Id
     * @param vlogId 视频Id
     */
    public boolean doILikeVlog(String myId, String vlogId) {
        String doILike = redis.get(REDIS_USER_LIKE_VLOG + ":" + myId + ":" + vlogId);
        return StringUtils.isNotBlank(doILike)
                && doILike.equalsIgnoreCase("1");
    }

    /**
     * 抽取方法，设置前端视频信息展示对象属性
     *
     * @param vlogIndexVO 前端视频信息展示对象
     * @param userId 用户Id
     * @param type 设置类型：0：用户是否关注该博主；1：用户必定关注该博主
     */
    public void setVlogIndexVO(VlogIndexVO vlogIndexVO, String userId,Integer type){
        if(StringUtils.isNotBlank(userId)){
            if(type==0){
                // 用户是否关注该博主
                vlogIndexVO.setDoIFollowVloger(fansService.queryDoIFollowVloger(userId, vlogIndexVO.getVlogerId()));
            }
            if(type==1){
                // 用户必定关注该博主
                vlogIndexVO.setDoIFollowVloger(true);
            }
            // 判断当前用户是否点赞过视频
            vlogIndexVO.setDoILikeThisVlog(doILikeVlog(userId,vlogIndexVO.getVlogId()));
        }
        // 获得当前视频被点赞过的总数
        vlogIndexVO.setLikeCounts(getVlogBeLikedCounts(vlogIndexVO.getVlogId()));
    }


}
