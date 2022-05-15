package com.douyin.common.config;

import com.douyin.common.intercepter.PassportInterceptor;
import com.douyin.common.intercepter.UserTokenInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author: 何翔
 * @date: 2022/5/10
 * @description: 拦截器配置
 */

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Bean
    public PassportInterceptor passportInterceptor(){
        return new PassportInterceptor();
    }

    @Bean
    public UserTokenInterceptor userTokenInterceptor(){
        return new UserTokenInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        registry.addInterceptor(passportInterceptor()).
                addPathPatterns("/passport/getSMSCode");
        // 会话拦截器
        registry.addInterceptor(userTokenInterceptor()).
                addPathPatterns("/userInfo/modifyUserInfo","/userInfo/modifyImage");

    }
}
