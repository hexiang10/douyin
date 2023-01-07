package com.crud.demo.domain.vo;

import lombok.Data;

/**
 * <p>
 * 测试用户Vo对象
 * </p>
 *
 * @author hexiang
 * @since 2022-12-31
 */
@Data
public class TuserVo {

    /**
     * 编号
     */
    private String uid;

    /**
     * 名称
     */
    private String username;

    /**
     * 电话
     */
    private String phone;

    /**
     * 性别：未知0；男1；女2
     */
    private String sex;

    /**
     * 用户状态；0正常，1封禁
     */
    private String state;

    /**
     * 开始时间
     */
    private String createTime;

    /**
     * 结束时间
     */
    private String endTime;


}