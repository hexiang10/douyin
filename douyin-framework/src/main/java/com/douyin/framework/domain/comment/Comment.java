package com.douyin.framework.domain.comment;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 评论表
 * </p>
 *
 * @author hexiang
 * @since 2023-01-20
 */
@Data
@TableName("dy_comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId("id")
    private String id;

    /**
     * 评论的视频是哪个作者（vloger）的关联id
     */
    @TableField("vloger_id")
    private String vlogerId;

    /**
     * 如果是回复留言，则本条为子留言，需要关联查询
     */
    @TableField("father_comment_id")
    private String fatherCommentId;

    /**
     * 回复的那个视频id
     */
    @TableField("vlog_id")
    private String vlogId;

    /**
     * 发布留言的用户id
     */
    @TableField("comment_user_id")
    private String commentUserId;

    /**
     * 留言内容
     */
    @TableField("content")
    private String content;

    /**
     * 留言的点赞总数
     */
    @TableField("like_counts")
    private Integer likeCounts;

    /**
     * 留言时间
     */
    @TableField("created_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdTime;


}