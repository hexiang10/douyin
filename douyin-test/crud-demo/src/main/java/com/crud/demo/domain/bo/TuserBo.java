package com.crud.demo.domain.bo;

import lombok.Data;

import java.util.Date;

/**
 * <p>
 * 测试用户信息
 * </p>
 *
 * @author hexiang
 * @since 2022-12-31
 */
@Data
public class TuserBo {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    private Long id;

    /**
     * 编号
     */
    private String uid;

    /**
     * 名称
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 电话
     */
    private String phone;

    /**
     * 简介
     */
    private String profile;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 性别：未知0；男1；女2
     */
    private Integer sex;

    /**
     * 用户状态；0正常，1封禁
     */
    private Integer state;

    /**
     * 出生日期
     */
    private Date birthday;


}