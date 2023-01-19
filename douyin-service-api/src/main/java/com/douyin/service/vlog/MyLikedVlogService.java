package com.douyin.service.vlog;

import com.douyin.framework.domain.vlog.MyLikedVlog;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 点赞短视频关联表
 服务类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
public interface MyLikedVlogService extends IService<MyLikedVlog> {

    /**
     * 用户点赞/喜欢视频
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    public void userLikeVlog(String userId,String vlogId);

    /**
     * 用户取消点赞/喜欢视频
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    public void userUnLikeVlog(String userId, String vlogId);
}