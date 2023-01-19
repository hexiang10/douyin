package com.douyin.service.user.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.enums.Sex;
import com.douyin.common.enums.UserInfoModifyType;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.exception.GraceException;
import com.douyin.common.utils.DesensitizationUtil;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.framework.domain.user.User;
import com.douyin.mapper.user.UserMapper;
import com.douyin.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    Sid sid;

    /**
     * 判断用户是否存在，如果存在则返回用户信息
     *
     * @param mobile 手机号
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
        user.setBgImg("https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png");
        user.setBirthday(new Date());
        user.setSex(Sex.secret.type);
        user.setCountry("中国");
        user.setProvince("");
        user.setCity("");
        user.setDescription("这个家伙很懒，什么都没留下~");
        userMapper.insert(user);
        return user;
    }

    /**
     * 根据用户主键查询用户信息
     *
     * @param userId 主键
     */
    @Override
    public User getUser(String userId) {
        return userMapper.selectById(userId);
    }

    /**
     * 修改用户信息
     *
     * @param userUpdateBo 用户数据层对象
     */
    @Override
    @Transactional
    public User updateUserInfo(User userUpdateBo) {
        int result = userMapper.updateById(userUpdateBo);
        if (result != 1) {
            GraceException.display(ResponseStatusEnum.USER_INFO_UPDATED_ERROR);
        }
        return getUser(userUpdateBo.getId());
    }

    /**
     * 根据修改类型修改用户对应信息
     *
     * @param userUpdateBo 用户信息更新数据层对象
     * @param type         修改类型
     */
    @Override
    @Transactional
    public User updateUserInfo(User userUpdateBo, Integer type) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        // 修改昵称
        if (type == UserInfoModifyType.NICKNAME.type) {
            wrapper.eq(User::getNickname, userUpdateBo.getNickname());
            User user = userMapper.selectOne(wrapper);
            if (user != null) {
                GraceException.display(ResponseStatusEnum.USER_INFO_UPDATED_NICKNAME_EXIST_ERROR);
            }
        }
        // 修改抖音号
        if (type == UserInfoModifyType.DOUYINNUM.type) {
            wrapper.eq(User::getImoocNum, userUpdateBo.getImoocNum());
            User user = userMapper.selectOne(wrapper);
            if (user != null) {
                GraceException.display(ResponseStatusEnum.USER_INFO_UPDATED_DOUYINNUM_EXIST_ERROR);
            }
            if (getUser(userUpdateBo.getId()).getCanImoocNumBeUpdated() == YesOrNo.NO.type) {
                GraceException.display(ResponseStatusEnum.USER_INFO_CANT_UPDATED_DOUYINNUM_ERROR);
            }
            userUpdateBo.setCanImoocNumBeUpdated(YesOrNo.NO.type);
        }

        return updateUserInfo(userUpdateBo);
    }
}