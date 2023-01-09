package com.douyin.controller.user;

import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.IPUtil;
import com.douyin.common.utils.StringUtil;
import com.douyin.framework.domain.user.User;
import com.douyin.framework.domain.user.bo.RegistLoginBo;
import com.douyin.framework.domain.user.vo.UserVo;
import com.douyin.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.UUID;

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
@RequestMapping("/user")
@Tag(name = "UserController",description = "用户接口模块")
public class UserController extends BaseProperties {

    @Autowired
    UserService userService;

    /**
     * 发送短信
     *
     * @param mobile 手机号
     */
    @PostMapping("/getSMSCode")
    public GraceJSONResult sendSms(@RequestParam String mobile , HttpServletRequest request) {
        try{
            // 若手机号码为空或不存在则直接返回
            if (StringUtils.isBlank(mobile) || !StringUtil.isPhoneNumber(mobile)) {
                return GraceJSONResult.errorMsg("手机号输入不正确");
            }
            // 获取用户ip
            String userIp = IPUtil.getRequestIp(request);
            // 根据用户ip进行限制，限制用户在60秒之内只能获得一次验证码
            redis.setnx60s(MOBILE_SMSCODE+":"+userIp,userIp);
            // 随机生成6位验证码数字
            String smsCode = String.valueOf((int)((Math.random() * 9 + 1) * 100000));
            // 发送验证码 —— prod环境下短信功能已开放使用
            //smsUtil.sendSMS(mobile, smsCode);
            // 测试或者发送失败。查看控制台日志获取验证码
            log.info(smsCode);
            // 将验证码存入redis
            redis.set(MOBILE_SMSCODE+":"+mobile,smsCode,60);
            return GraceJSONResult.ok();
        }catch(Exception e){
            log.error(e.getMessage());
        }

        return GraceJSONResult.errorMsg("发送失败");
    }

    /**
     * 实现用户手机号一键登录/注册
     *
     * @param registLoginBo 注册登录对象
     */
    @PostMapping("/login")
    public GraceJSONResult login(@Valid @RequestBody RegistLoginBo registLoginBo) {
        // TODO 用户名密码登录业务待拓展
        String mobile = registLoginBo.getMobile();
        String code = registLoginBo.getSmsCode();
        // 从redis获取验证码进行校验是否匹配
        String smsCode = redis.get(MOBILE_SMSCODE+":"+mobile);
        if (StringUtils.isBlank(smsCode)||!smsCode.equalsIgnoreCase(code)) {
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SMS_CODE_ERROR);
        }
        // 查询数据库，判断用户是否存在
        User user = userService.queryMobileIsExist(mobile);
        // 如果用户为空，表示没有注册过，则为null，需要注册信息入库
        if(user==null){
            user= userService.createUser(mobile);
        }
        // 如果用户不为空，则保存用户会话信息(也可以存用户信息，看个人需求)
        String uToken = UUID.randomUUID().toString();
        redis.set(REDIS_USER_TOKEN + ":"+ user.getId(),uToken,24*60*60*7);
        // 用户登录注册成功以后，删除redis中的短信验证码
        redis.del(MOBILE_SMSCODE+":"+mobile);
        // 返回用户信息，包含token令牌
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(user,userVo);
        userVo.setUserToken(uToken);
        return GraceJSONResult.ok(userVo);
    }

    /**
     * 退出登录
     *
     * @param userId 用户Id
     */
    @PostMapping("/logout")
    public GraceJSONResult logout(@RequestParam String userId){
        // 后端清除用户会话的token信息，前端清除本地app中的用户信息和token
        redis.del(REDIS_USER_TOKEN + ":"+userId);
        return GraceJSONResult.ok();
    }


}