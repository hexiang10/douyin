package com.douyin.service.comment;

import com.douyin.common.results.PagedGridResult;
import com.douyin.framework.domain.comment.Comment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.douyin.framework.domain.comment.bo.CommentBO;
import com.douyin.framework.domain.comment.vo.CommentVO;

/**
 * <p>
 * 评论表 服务类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-20
 */
public interface CommentService extends IService<Comment> {

    /**
     * 发表评论
     * @param commentBO 评论数据层对象
     */
    public CommentVO createComment(CommentBO commentBO);

    /**
     * 分页查询视频评论
     * @param vlogId   视频Id
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    public PagedGridResult getCommentList(String vlogId, String userId, Integer page, Integer pageSize);

    /**
     * 删除视频下的某条评论
     * @param commentUserId 评论用户
     * @param commentId 被评论者
     * @param vlogId 评论视频
     */
    public void deleteComment(String commentUserId, String commentId,String vlogId);

}