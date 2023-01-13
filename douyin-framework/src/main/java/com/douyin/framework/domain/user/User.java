package com.douyin.framework.domain.user;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.douyin.framework.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * <p>
 * 用户表
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("dy_user")
public class User extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId("id")
    private String id;

    /**
     * 手机号
     */
    @TableField("mobile")
    private String mobile;

    /**
     * 昵称
     */
    @TableField("nickname")
    private String nickname;

    /**
     * 抖音号，唯一标识，需要限制修改次数，比如终生1次，每年1次，每半年1次等，可以用于付费修改。
     */
    @TableField("imooc_num")
    private String imoocNum;

    /**
     * 头像
     */
    @TableField("face")
    private String face;
    /**
     * 性别：1:男  0:女  2:保密
     */
    @TableField("sex")
    private Integer sex;

    /**
     * 生日
     */
    @TableField("birthday")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    /**
     * 国家
     */
    @TableField("country")
    private String country;

    /**
     * 省份
     */
    @TableField("province")
    private String province;

    /**
     * 城市
     */
    @TableField("city")
    private String city;

    /**
     * 区县
     */
    @TableField("district")
    private String district;

    /**
     * 简介
     */
    @TableField("description")
    private String description;

    /**
     * 个人介绍的背景图
     */
    @TableField("bg_img")
    private String bgImg;

    /**
     * 抖音号能否被修改：1：默认，可以修改；0，无法修改
     */
    @TableField("can_imooc_num_be_updated")
    private Integer canImoocNumBeUpdated;


}