package com.douyin.controller.gateway;

import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.StringUtil;
import com.douyin.gateway.utils.GatewayIPUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
@RestController
@Slf4j
@RequestMapping("/passport")
public class PassportController extends BaseProperties {


    /**
     * 发送短信
     *
     * @param mobile 手机号
     */
    @PostMapping("/getSMSCode")
    public GraceJSONResult sendSms(@RequestParam String mobile , ServerWebExchange request) {
        //获取用户id
        String userIp = GatewayIPUtil.getRequestIp(request);
        //判断是否60s内有请求发送验证码
        if(redis.keyIsExist(MOBILE_SMSCODE + ":" + userIp)){
            //返回给前端捕获异常
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SMS_NEED_WAIT_ERROR);
        }
        try{
            // 若手机号码为空或不存在则直接返回
            if (StringUtils.isBlank(mobile) || !StringUtil.isPhoneNumber(mobile)) {
                return GraceJSONResult.errorMsg("手机号输入不正确");
            }
            // 根据用户ip进行限制，限制用户在60秒之内只能获得一次验证码
            redis.setnx60s(MOBILE_SMSCODE+":"+userIp,userIp);
            // 随机生成6位验证码数字
            //String smsCode = String.valueOf((int)((Math.random() * 9 + 1) * 100000));
            // 测试
            String smsCode = "985211";
            // 发送验证码 —— prod环境下短信功能已开放使用
            //smsUtil.sendSMS(mobile, smsCode);
            // 测试或者发送失败,可查看控制台日志获取验证码
            log.info(smsCode);
            // 将验证码存入redis
            redis.set(MOBILE_SMSCODE+":"+mobile,smsCode,60);
            return GraceJSONResult.ok("发送成功");
        }catch(Exception e){
            log.error(e.getMessage());
        }

        return GraceJSONResult.errorMsg("发送失败");
    }

    /**
     * 退出登录
     *
     * @param userId 用户Id
     */
    @PostMapping("/logout")
    public GraceJSONResult logout(@RequestParam String userId){
        // 后端清除用户会话的token信息、用户信息；前端清除本地app中的用户信息和token
        redis.del(REDIS_USER_TOKEN + ":"+userId);
        redisCache.removeObj(REDIS_USER_INFO+":"+userId);
        return GraceJSONResult.ok();
    }

}
