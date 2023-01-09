package com.douyin.service.user.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.Sex;
import com.douyin.common.utils.DesensitizationUtil;
import com.douyin.framework.domain.user.User;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.mapper.user.UserMapper;
import com.douyin.service.user.UserService;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
@DubboService
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    Sid sid;

    /**
     * 判断用户是否存在，如果存在则返回用户信息
     *
     * @param mobile 手机号
     * @return 用户信息
     */
    @Override
    public User queryMobileIsExist(String mobile) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getMobile, mobile);
        return userMapper.selectOne(wrapper);
    }

    /**
     * 创建用户信息，并且返回用户对象
     *
     * @param mobile 手机号
     * @return 用户对象
     */
    @Override
    @Transactional
    public User createUser(String mobile) {
        User user = new User();
        String userId = sid.nextShort();
        user.setId(userId);
        user.setMobile(mobile);
        user.setImoocNum(userId);
        user.setNickname("用户：" + DesensitizationUtil.commonDisplay(mobile));
        user.setFace("https://img-blog.csdnimg.cn/2592a77c1b45499ea109d39d67aa827b.jpeg");
        user.setBirthday(new Date());
        user.setSex(Sex.secret.type);
        user.setCountry("中国");
        user.setDescription("这个家伙很懒，什么都没留下~");
        userMapper.insert(user);
        return user;
    }
}