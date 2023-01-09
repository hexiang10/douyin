package com.douyin.service.user;

import com.douyin.framework.domain.user.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 用户表 服务类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
public interface UserService extends IService<User> {

    /**
     * 判断用户是否存在，如果存在则返回用户信息
     *
     * @param mobile 手机号
     * @return 用户信息
     */
    public User queryMobileIsExist(String mobile);

    /**
     * 创建用户信息，并且返回用户对象
     * @param mobile 手机号
     * @return 用户对象
     */
    public User createUser(String mobile);

}