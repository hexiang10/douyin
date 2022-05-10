package com.douyin.model.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 粉丝表


 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("t_fans")
@ApiModel(value="Fans对象", description="粉丝表")
public class Fans implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    @ApiModelProperty(value = "作家用户id")
    private String vlogerId;

    @ApiModelProperty(value = "粉丝用户id")
    private String fanId;

    @ApiModelProperty(value = "粉丝是否是vloger的朋友，如果成为朋友，则本表的双方此字段都需要设置为1，如果有一人取关，则两边都需要设置为0")
    private Integer isFanFriendOfMine;


}
