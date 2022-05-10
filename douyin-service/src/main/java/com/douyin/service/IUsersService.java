package com.douyin.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.douyin.model.domain.Users;

/**
 * <p>
 * 用户表 服务类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
public interface IUsersService extends IService<Users> {


    /*
     * @Description: 创建用户信息，并且返回用户对象
     */
    Users createUser(String mobile);

}
