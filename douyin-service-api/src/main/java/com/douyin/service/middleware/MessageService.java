package com.douyin.service.middleware;

import com.douyin.framework.domain.comment.Comment;

public interface MessageService {

    /**
     * 系统消息：点赞短视频
     * @param userId 用户Id
     * @param vlogId 视频作者Id
     */
    public void sentMyLikedVlogMessage(String userId, String vlogId);

    /**
     * 系统消息：点赞短视频
     * @param userId 用户Id
     * @param commentId 评论者Id
     */
    public void sentLikeCommentMessage(String userId, String commentId);

    /**
     * 系统消息：评论/回复
     * @param comment 评论对象
     */
    public void sentCommentMessage(Comment comment);

    /**
     * 系统消息：关注
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    public void sentFollowMessage(String myId, String vlogerId);
}