package com.douyin.service.fans;

import com.douyin.common.results.PagedGridResult;
import com.douyin.framework.domain.fans.Fans;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 粉丝表

 服务类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
public interface FansService extends IService<Fans> {

    /**
     * 关注
     * @param myId 用户Id
     * @param vlogerId 被关注视频博主Id
     */
    public void doFollow(String myId,String vlogerId);

    /**
     * 取消关注
     * @param myId 用户Id
     * @param vlogerId 被关注视频博主Id
     */
    public void doCancel(String myId,String vlogerId);

    /**
     * 查询用户是否关注博主
     * @param myId 用户Id
     * @param vlogerId 被关注视频博主Id
     */
    public boolean queryDoIFollowVloger(String myId,String vlogerId);

    /**
     * 分页查询用户关注博主
     * @param myId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult queryMyFollows(String myId , Integer page, Integer pageSize);

    /**
     * 分页查询用户粉丝
     * @param myId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult queryMyFans(String myId , Integer page, Integer pageSize);

}