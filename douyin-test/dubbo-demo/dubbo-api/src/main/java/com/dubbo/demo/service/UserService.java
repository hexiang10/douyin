package com.dubbo.demo.service;


import com.dubbo.demo.domain.User;

public interface UserService {

    User queryById(Long id);
}