package com.douyin.framework.domain.user.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

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
public class UserVo {

    private static final long serialVersionUID = 1L;

    /**
     * 用户token，传递给前端
     */
    private String userToken;
    /**
     * 主键
     */
    private String id;
    /**
     * 手机号
     */
    private String mobile;
    /**
     * 昵称
     */
    private String nickname;
    /**
     * 抖音号，唯一标识，需要限制修改次数，比如终生1次，每年1次，每半年1次等，可以用于付费修改。
     */
    private String imoocNum;
    /**
     * 头像
     */
    private String face;
    /**
     * 性别：1:男  0:女  2:保密
     */
    private Integer sex;
    /**
     * 生日
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date birthday;
    /**
     * 国家
     */
    private String country;
    /**
     * 省份
     */
    private String province;
    /**
     * 城市
     */
    private String city;
    /**
     * 区县
     */
    private String district;
    /**
     * 简介
     */
    private String description;
    /**
     * 个人介绍的背景图
     */
    private String bgImg;
    /**
     * 抖音号能否被修改：1：默认，可以修改；0，无法修改
     */
    private Integer canImoocNumBeUpdated;
    /**
     * 用户关注博主的总数量
     */
    private Integer myFollowsCounts;
    /**
     * 用户的粉丝总数
     */
    private Integer myFansCounts;
    /**
     * 所有喜欢用户的总数
     */
    private Integer totalLikeMeCounts;


}