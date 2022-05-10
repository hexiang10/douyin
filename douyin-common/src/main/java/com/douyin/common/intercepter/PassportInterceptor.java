package com.douyin.common.intercepter;

import com.douyin.common.exceptions.GraceException;
import com.douyin.common.properties.BaseInfoProperties;
import com.douyin.common.result.ResponseStatusEnum;
import com.douyin.common.utils.IPUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: 何翔
 * @date: 2022/5/10
 * @description: 请求拦截器
 */

@Slf4j
public class PassportInterceptor extends BaseInfoProperties implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //获取用户id
        String ip = IPUtil.getRequestIp(request);
        //判断是否60s内有请求发送验证码
        boolean keyIsExist = redisUtil.keyIsExist(MOBILE_SMSCODE + ":" + ip);
        if(keyIsExist){
            //返回给前端捕获异常
            GraceException.display(ResponseStatusEnum.SMS_NEED_WAIT_ERROR);
            log.info("短信发送频率太大！");
            //请求拦截
            return false;
        }
        //请求放行
        return true;
    }

}
