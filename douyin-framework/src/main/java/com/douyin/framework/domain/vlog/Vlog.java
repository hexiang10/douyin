package com.douyin.framework.domain.vlog;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.douyin.framework.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 短视频表
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("dy_vlog")
public class Vlog extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId("id")
    private String id;

    /**
     * 对应用户表id，vlog视频发布者
     */
    @TableField("vloger_id")
    private String vlogerId;

    /**
     * 视频播放地址
     */
    @TableField("url")
    private String url;

    /**
     * 视频封面
     */
    @TableField("cover")
    private String cover;

    /**
     * 视频标题，可以为空
     */
    @TableField("title")
    private String title;

    /**
     * 视频width
     */
    @TableField("width")
    private Integer width;

    /**
     * 视频height
     */
    @TableField("height")
    private Integer height;

    /**
     * 点赞总数
     */
    @TableField("like_counts")
    private Integer likeCounts;

    /**
     * 评论总数
     */
    @TableField("comments_counts")
    private Integer commentsCounts;

    /**
     * 是否私密，用户可以设置私密，如此可以不公开给比人看
     */
    @TableField("is_private")
    private Integer isPrivate;

    /**
     * 视频状态，0正常，1下架
     */
    @TableField("state")
    private Integer state;

}