package com.douyin.common.properties;


import com.douyin.common.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: 何翔
 * @date: 2022/5/10
 * @description: 基础控制器
 */

public class BaseInfoProperties {
    @Autowired
    public RedisUtil redisUtil;
    public static final String MOBILE_SMSCODE = "mobile:smscode";
    public static final String REDIS_USER_TOKEN = "redis_user_token";
    public static final String REDIS_USER_INFO = "redis_user_info";


}
