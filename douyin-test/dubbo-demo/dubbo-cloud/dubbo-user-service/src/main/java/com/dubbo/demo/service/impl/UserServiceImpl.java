package com.dubbo.demo.service.impl;


import com.dubbo.demo.domain.User;
import com.dubbo.demo.mapper.UserMapper;
import com.dubbo.demo.service.UserService;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;

@DubboService
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    public User queryById(Long id) {
        return userMapper.findById(id);
    }
}