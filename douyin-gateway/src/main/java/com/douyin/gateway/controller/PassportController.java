package com.douyin.gateway.controller;

import com.douyin.common.properties.BaseProperties;
import com.douyin.common.utils.StringUtil;
import com.douyin.gateway.domain.bo.RegistLoginBo;
import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.IPUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * <p>
 * 通行认证 前端控制器
 * </p>
 *
 * @author hexiang
 */

@Slf4j
@RestController
@RequestMapping("/passport")
@Tag(name = "通行认证接口模块",description = "通行认证接口模块")
public class PassportController extends BaseProperties {

    //@Autowired
    //SMSUtil smsUtil;

    //@Autowired
    //UsersService userService;

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
     * 短信登录/注册
     *
     * @param registLoginBo 注册登录对象
     */
    @PostMapping("/login")
    //@ApiOperation(value = "注册登录", notes = "注册登录")
    public GraceJSONResult login(@Valid @RequestBody RegistLoginBo registLoginBo) {
        // TODO 用户名密码登录业务待拓展
        String mobile = registLoginBo.getMobile();
        String code = registLoginBo.getSmsCode();
        // 从redis获取验证码进行校验
        String smsCode = redis.get(MOBILE_SMSCODE+":"+mobile);
        if (StringUtils.isBlank(smsCode)||!smsCode.equalsIgnoreCase(code)) {
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SMS_CODE_ERROR);
        }

        return GraceJSONResult.ok();
        //获取注册信息

        ////从redis获取验证码进行校验
        //String redisCode = redisUtil.get(MOBILE_SMSCODE+":"+mobile);
        ////校验验证码
        //if(StringUtils.isBlank(redisCode)||!redisCode.equalsIgnoreCase(code)){
        //    return GraceJSONResult.errorCustom(ResponseStatusEnum.SMS_CODE_ERROR);
        //}
        ////查询数据库是否存在该用户
        //QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        //queryWrapper.eq("mobile", mobile);
        //User user= userService.getOne(queryWrapper);
        //if(user==null){
        //    //如果用户不存在，则注册
        //    user = userService.createUser(mobile);
        //    //保存用户信息
        //    userService.save(user);
        //}
        ////如果用户存在，则执行以下业务，可以保存用户会话信息
        //String uToken = UUID.randomUUID().toString();
        //log.info(uToken);
        //redisUtil.set(REDIS_USER_TOKEN+":"+user.getId(),uToken,60*60*24);
        ////校验成功后，将验证码删除
        //redisUtil.del(MOBILE_SMSCODE+":"+mobile);
        ////返回用户信息和token
        //UserVo usersVo = new UserVo();
        //BeanUtils.copyProperties(user, usersVo);
        //usersVo.setUserToken(uToken);
        //return GraceJSONResult.ok(usersVo);
    }


    //    /*
    //    * @Author: 何翔
    //    * @Description: 发送短信验证码
    //    * @DateTime: 2022/6/14 21:43
    //    * @Params: [mobile, request]
    //    * @Return com.tiktok.common.results.GraceJSONResult
    //    */
    //    try {
    //        //判断手机号码是否为空
    //        if(StringUtils.isBlank(mobile)){
    //            return GraceJSONResult.ok();
    //        }
    //        //获取用户id
    //        String ip = IPUtil.getRequestIp(request);
    //
    //        //根据用户id进行限制，限制用户60s内只能获得一次验证码
    //        redisUtil.setnx("mobile:smscode"+":"+ip,ip);
    //
    //        //prod:生成随机的验证码
    //        String code = (int)(Math.random()*9+1)*100000+"";
    //        //prod:发送短信
    //        //smsUtil.sendSMS(mobile, code);
    //
    //        //将验证码存入redis
    //        log.info(code);
    //        //dev
    //        redisUtil.set("mobile:smscode:"+mobile,"6666",60);
    //        //prod
    //        //redisUtil.set("mobile:smscode:"+mobile,code,30*60);
    //        return GraceJSONResult.ok();
    //    } catch (Exception e) {
    //        e.printStackTrace();
    //    }
    //    return GraceJSONResult.errorMsg("发送失败");
    //}




    //@PostMapping("/logout")
    //@ApiOperation(value = "退出登录", notes = "退出登录")
    //public GraceJSONResult logout(@RequestParam String userId , HttpServletRequest request) {
    //    //删除redis中的用户会话信息
    //    redisUtil.del(REDIS_USER_TOKEN+":"+userId);
    //    redisUtil.del(MOBILE_SMSCODE+":"+IPUtil.getRequestIp(request));
    //    return GraceJSONResult.ok();
    //
    //}





}