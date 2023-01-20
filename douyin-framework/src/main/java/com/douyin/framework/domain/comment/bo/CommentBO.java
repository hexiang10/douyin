package com.douyin.framework.domain.comment.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentBO implements Serializable {

    @NotBlank(message = "留言信息不完整")
    private String vlogerId;

    @NotBlank(message = "留言信息不完整")
    private String fatherCommentId;

    @NotBlank(message = "留言信息不完整")
    private String vlogId;

    @NotBlank(message = "当前用户信息不正确，请尝试重新登录")
    private String commentUserId;

    @NotBlank(message = "评论内容不能为空")
    @Length(max = 120, message = "评论内容长度不能超过120")
    private String content;
}