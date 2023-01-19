package com.douyin.gateway.filter;

import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.properties.BaseProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
@RefreshScope
public class AuthFilter extends BaseProperties implements GlobalFilter, Ordered {

    //排除的链接
    @Value("#{'${gateway.excludedUrls}'.split(',')}")
    private List<String> excludedUrls;

    /**
     * 统一鉴权
     *
     * @param exchange 请求
     * @param chain 过滤器
     */
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String url = exchange.getRequest().getURI().getPath();
        log.info( "url:"+ url);
        // 排除特殊不需要校验接口地址
        if(excludedUrls.contains(url)){
            return chain.filter(exchange);
        }
        String userId = exchange.getRequest().getHeaders().getFirst("headerUserId");
        String token = exchange.getRequest().getHeaders().getFirst("headerUserToken");
        ServerHttpResponse response = exchange.getResponse();
        if(StringUtils.isNotBlank(userId)&&StringUtils.isNotBlank(token)){
            String userToken = redis.get(REDIS_USER_TOKEN + ":" + userId);
            // 如果没有token，则进行拦截，用户未登录
            if(StringUtils.isBlank(userToken)){
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("status", ResponseStatusEnum.FAILED.status());
                responseData.put("msg", "用户未登录");
                responseData.put("success", ResponseStatusEnum.FAILED.success());
                responseData.put("data", null);
                return responseError(response,responseData);
            }
            // 如果token存在但与缓存所获取的token不一致，则为会话失效
            if(!userToken.equalsIgnoreCase(token)){
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("status", ResponseStatusEnum.FAILED.status());
                responseData.put("msg", ResponseStatusEnum.TICKET_INVALID);
                responseData.put("success", ResponseStatusEnum.FAILED.success());
                responseData.put("data", null);
                return responseError(response,responseData);
            }
        }else {
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", ResponseStatusEnum.FAILED.status());
            responseData.put("msg", "登录后才能查看哦~");
            responseData.put("success", ResponseStatusEnum.FAILED.success());
            responseData.put("data", null);
            return responseError(response,responseData);
        }
        return chain.filter(exchange);
    }


    /**
     * 响应错误数据
     *
     * @param response 响应
     * @param responseData 响应数据
     * @return 错误数据
     */
    private Mono<Void> responseError(ServerHttpResponse response,Map<String, Object> responseData){
        // 将信息转换为 JSON
        ObjectMapper objectMapper = new ObjectMapper();
        byte[] data = new byte[0];
        try {
            data = objectMapper.writeValueAsBytes(responseData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        // 输出错误信息到页面
        DataBuffer buffer = response.bufferFactory().wrap(data);
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
        return response.writeWith(Mono.just(buffer));
    }

    /**
     * 设置过滤器的执行顺序
     */
    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}