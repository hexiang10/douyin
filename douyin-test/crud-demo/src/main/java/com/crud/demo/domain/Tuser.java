package com.crud.demo.domain;

import com.baomidou.mybatisplus.annotation.IdType;
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
 * 测试用户信息
 * </p>
 *
 * @author hexiang
 * @since 2022-12-31
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("test_tuser")
public class Tuser extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 编号
     */
    @TableField("uid")
    private String uid;

    /**
     * 名称
     */
    @TableField("username")
    private String username;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

    /**
     * 电话
     */
    @TableField("phone")
    private String phone;

    /**
     * 简介
     */
    @TableField("profile")
    private String profile;

    /**
     * 头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 性别：未知0；男1；女2
     */
    @TableField("sex")
    private Integer sex;

    /**
     * 用户状态；0正常，1封禁
     */
    @TableField("state")
    private Integer state;

    /**
     * 出生日期
     */
    @TableField("birthday")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date birthday;


}