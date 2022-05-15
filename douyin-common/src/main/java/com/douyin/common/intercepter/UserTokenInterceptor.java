package com.douyin.common.intercepter;

import com.douyin.common.exceptions.GraceException;
import com.douyin.common.properties.BaseInfoProperties;
import com.douyin.common.result.ResponseStatusEnum;
import com.douyin.common.utils.IPUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: 何翔
 * @date: 2022/5/10
 * @description: 请求拦截器
 */

@Slf4j
public class UserTokenInterceptor extends BaseInfoProperties implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 从请求头中获取token
        String token = request.getHeader("headerUserToken");
        // 从请求头中获取用户id
        String userId = request.getHeader("headerUserId");
        //判断用户的token和id是否为空
        if (StringUtils.isNotBlank(token) && StringUtils.isNotBlank(userId)) {
            String redisToken = redisUtil.get(REDIS_USER_TOKEN + ":" + userId);
            //判断redis中的token是否为空
            if (StringUtils.isBlank(redisToken)) {
                GraceException.display(ResponseStatusEnum.UN_LOGIN);
                return false;
            }
            //判断redis中的token和请求头中的token是否一致
            if (!redisToken.equalsIgnoreCase(token)) {
                GraceException.display(ResponseStatusEnum.TICKET_INVALID);
                return false;
            }
        }else {
            GraceException.display(ResponseStatusEnum.UN_LOGIN);
            return false;
        }
        //请求放行
        return true;
    }

}
