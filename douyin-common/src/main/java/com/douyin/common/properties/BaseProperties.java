package com.douyin.common.properties;


import com.douyin.common.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseProperties {

    @Autowired
    public RedisUtil redis;

    public static final String MOBILE_SMSCODE = "mobile:smscode";
    public static final String REDIS_USER_TOKEN = "redis_user_token";
    public static final String REDIS_USER_INFO = "redis_user_info";

}