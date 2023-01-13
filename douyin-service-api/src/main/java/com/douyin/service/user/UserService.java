package com.douyin.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.douyin.framework.domain.user.User;

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
     * 判断用户是否存在
     * @param mobile 手机号
     */
    public User queryMobileIsExist(String mobile);

    /**
     * 创建用户信息
     * @param mobile 手机号
     */
    public User createUser(String mobile);

    /**
     * 查询用户信息
     * @param userId 主键
     */
    public User getUser(String userId);

    /**
     * 更新用户信息
     * @param userUpdateBo 用户信息更新数据层对象
     */
    public User updateUserInfo(User userUpdateBo);

    /**
     * 根据修改类型修改用户对应信息
     * @param userUpdateBo 用户信息更新数据层对象
     * @param type 修改类型
     */
    public User updateUserInfo(User userUpdateBo , Integer type);

}