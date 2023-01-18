package com.douyin.framework.domain.vlog.bo;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

/**
 * <p>
 * 短视频表
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
@Data
public class VlogBo {

    private static final long serialVersionUID = 1L;

    private String id;

    /**
     * 对应用户表id，vlog视频发布者
     */
    @NotBlank(message = "用户不存在")
    private String vlogerId;
    /**
     * 视频播放地址
     */
    @NotBlank(message = "视频文件不存在")
    private String url;

    /**
     * 视频封面
     */
    private String cover;

    /**
     * 视频标题，可以为空
     */
    private String title;

    /**
     * 视频width
     */
    private Integer width;

    /**
     * 视频height
     */
    private Integer height;


}