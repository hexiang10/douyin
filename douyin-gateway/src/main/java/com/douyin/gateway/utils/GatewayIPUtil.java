package com.douyin.gateway.utils;

import org.springframework.web.server.ServerWebExchange;

/**
 * 用户获得用户ip的工具类
 */

public class GatewayIPUtil {

    /**
     * 获取请求IP:
     * 用户的真实IP不能使用request.getRemoteAddr()
     * 这是因为可能会使用一些代理软件，这样ip获取就不准确了
     * 此外我们如果使用了多级（LVS/Nginx）反向代理的话，ip需要从X-Forwarded-For中获得第一个非unknown的IP才是用户的有效ip。
     */
    public static String getRequestIp(ServerWebExchange  request) {
        String ip = request.getRequest().getHeaders().getFirst("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRequest().getHeaders().getFirst("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRequest().getHeaders().getFirst("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRequest().getHeaders().getFirst("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRequest().getHeaders().getFirst("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRequest().getRemoteAddress().getAddress().getHostAddress();
        }
        return ip;
    }
}