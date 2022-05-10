package com.douyin.model.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDateTime;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 评论表
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("t_comment")
@ApiModel(value="Comment对象", description="评论表")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    @ApiModelProperty(value = "评论的视频是哪个作者（vloger）的关联id")
    private String vlogerId;

    @ApiModelProperty(value = "如果是回复留言，则本条为子留言，需要关联查询")
    private String fatherCommentId;

    @ApiModelProperty(value = "回复的那个视频id")
    private String vlogId;

    @ApiModelProperty(value = "发布留言的用户id")
    private String commentUserId;

    @ApiModelProperty(value = "留言内容")
    private String content;

    @ApiModelProperty(value = "留言的点赞总数")
    private Integer likeCounts;

    @ApiModelProperty(value = "留言时间")
    private LocalDateTime createTime;


}
