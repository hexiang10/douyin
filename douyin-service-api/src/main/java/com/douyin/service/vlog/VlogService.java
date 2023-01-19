package com.douyin.service.vlog;

import com.baomidou.mybatisplus.extension.service.IService;
import com.douyin.common.results.PagedGridResult;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.framework.domain.vlog.bo.VlogBo;
import com.douyin.framework.domain.vlog.vo.VlogIndexVO;

/**
 * <p>
 * 短视频表 服务类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
public interface VlogService extends IService<Vlog> {

    /**
     * 新增vlog视频信息
     * @param vlogBo 视频信息对象
     */
    public void createVlog(VlogBo vlogBo);

    /**
     * 查询首页或搜索的Vlog列表
     * @param userId 用户Id
     * @param search 搜索条件，可以为空
     * @param page 当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult getVlogList(String userId,String search , Integer page, Integer pageSize);

    /**
     * 根据视频Id查询对应视频详情
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    public VlogIndexVO getVlogById(String userId,String vlogId);

    /**
     * 更改视频私密状态
     * @param userId 用户Id
     * @param vlogId 视频Id
     * @param yesOrNo 私密与否
     */
    public void changeToPrivateOrPublic(String userId,String vlogId,Integer yesOrNo);

    /**
     * 查询用户公开/私密的视频列表
     * @param userId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     * @param yesOrNo 视频私密类型
     */
    public PagedGridResult queryUserVlogList(String userId , Integer page, Integer pageSize,Integer yesOrNo);

    /**
     * 查询用户点赞过的视频
     * @param userId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult getMyLikedVlogList(String userId , Integer page, Integer pageSize);

    /**
     * 查询用户点关注博主的视频
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult getMyFollowVlogList(String userId, Integer page, Integer pageSize);

    /**
     * 查询用户朋友的视频
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult getMyFriendVlogList(String userId, Integer page, Integer pageSize);

    /**
     * 获取视频点赞总数
     * @param vlogId 视频Id
     */
    public Integer getVlogBeLikedCounts(String vlogId);

}