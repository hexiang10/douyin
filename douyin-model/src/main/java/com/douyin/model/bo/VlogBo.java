package com.douyin.model.bo;

import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 短视频表
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@TableName("t_vlog")
@ApiModel(value="Vlog对象", description="短视频表")
public class VlogBo implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    @ApiModelProperty(value = "对应用户表id，vlog视频发布者")
    private String vlogerId;

    @ApiModelProperty(value = "视频播放地址")
    private String url;

    @ApiModelProperty(value = "视频封面")
    private String cover;

    @ApiModelProperty(value = "视频标题，可以为空")
    private String title;

    @ApiModelProperty(value = "视频width")
    private Integer width;

    @ApiModelProperty(value = "视频height")
    private Integer height;

    @ApiModelProperty(value = "点赞总数")
    private Integer likeCounts;

    @ApiModelProperty(value = "评论总数")
    private Integer commentsCounts;

}
