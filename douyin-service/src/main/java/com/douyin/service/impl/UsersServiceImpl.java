package com.douyin.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.Sex;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.idworker.Sid;
import com.douyin.common.utils.DateUtil;
import com.douyin.common.utils.DesensitizationUtil;
import com.douyin.dao.mapper.UsersMapper;
import com.douyin.model.domain.Users;
import com.douyin.service.IUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Service
public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements IUsersService {

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private Sid sid;

    private static final String USER_FACE1 = "http://192.168.238.130:8888/group1/M00/00/00/wKjugmJhCT2AMCMPAAOW3cLBiRY024.jpg";

    @Override
    @Transactional
    public Users createUser(String mobile) {
        Users user = new Users();
        String userId = sid.nextShort();
        user.setId(userId);
        user.setMobile(mobile);
        user.setNickname("用户：" + DesensitizationUtil.commonDisplay(mobile));
        user.setDouyinNum("用户：" + DesensitizationUtil.commonDisplay(mobile));
        user.setFace(USER_FACE1);

        user.setBirthday(DateUtil.stringToDate("1900-01-01"));
        user.setSex(Sex.secret.type);

        user.setCountry("中国");
        user.setProvince("");
        user.setCity("");
        user.setDistrict("");
        user.setDescription("这家伙很懒，什么都没留下~");
        user.setCanDouyinNumBeUpdated(YesOrNo.YES.type);

        user.setCreatedTime(new Date());
        user.setUpdatedTime(new Date());
        return user;
    }
}
