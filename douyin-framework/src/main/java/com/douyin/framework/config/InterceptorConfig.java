package com.douyin.framework.config;


import com.douyin.framework.handler.PassportHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author: hexiang
 * @description: 拦截器配置
 */

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Bean
    public PassportHandler passportInterceptor(){
        return new PassportHandler();
    }

    //@Bean
    //public UserTokenInterceptor userTokenInterceptor(){
    //    return new UserTokenInterceptor();
    //}

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        registry.addInterceptor(passportInterceptor()).
                addPathPatterns("/passport/getSMSCode");
        // 会话拦截器
        //registry.addInterceptor(userTokenInterceptor()).
        //        addPathPatterns("/userInfo/modifyUserInfo","/userInfo/modifyImage");

    }
}