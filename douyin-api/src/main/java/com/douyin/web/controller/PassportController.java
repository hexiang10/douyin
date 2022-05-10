package com.douyin.web.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.douyin.common.properties.BaseInfoProperties;
import com.douyin.common.result.GraceJSONResult;
import com.douyin.common.result.ResponseStatusEnum;
import com.douyin.common.utils.IPUtil;
import com.douyin.common.utils.SMSUtil;
import com.douyin.model.bo.RegistLoginBo;
import com.douyin.model.domain.Users;
import com.douyin.model.vo.UsersVo;
import com.douyin.service.IUsersService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
 * 通行认证 前端控制器
 * </p>
 *
 * @author 何翔
 * @since 2022-05-07
 */

@Slf4j
@RestController
@RequestMapping("/passport")
@Api(value = "通行认证接口模块", tags = "通行认证接口模块")
public class PassportController extends BaseInfoProperties {

    @Autowired
    private SMSUtil smsUtil;

    @Autowired
    private IUsersService userService;

    @PostMapping("/getSMSCode")
    @ApiOperation(value = "发送短信", notes = "发送短信")
    public GraceJSONResult sendSms(@RequestParam String mobile , HttpServletRequest request) {
        try {
            //判断手机号码是否为空
            if(StringUtils.isBlank(mobile)){
                return GraceJSONResult.ok();
            }
            //获取用户id
            String ip = IPUtil.getRequestIp(request);
            //根据用户id进行限制，限制用户60s内只能获得一次验证码
            redisUtil.setnx(MOBILE_SMSCODE+":"+ip,ip);
            //生成随机的验证码
            String code = (int)(Math.random()*9+1)*100000+"";
            //发送短信
            smsUtil.sendSMS(mobile, code);
            log.info(code);
            //将验证码存入redis
            redisUtil.set(MOBILE_SMSCODE+":"+mobile,code,30*60);
            return GraceJSONResult.ok();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return GraceJSONResult.errorMsg("发送失败");
    }


    @PostMapping("/login")
    @ApiOperation(value = "登录注册", notes = "登录注册")
    public GraceJSONResult login(@Valid @RequestBody RegistLoginBo registLoginBo) {

        //获取注册信息
        String mobile = registLoginBo.getMobile();
        String code = registLoginBo.getSmsCode();
        //从redis获取验证码进行校验
        String redisCode = redisUtil.get(MOBILE_SMSCODE+":"+mobile);
        //校验验证码
        if(StringUtils.isBlank(redisCode)||!redisCode.equalsIgnoreCase(code)){
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SMS_CODE_ERROR);
        }
        //查询数据库是否存在该用户
        QueryWrapper<Users> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("mobile", mobile);
        Users user= userService.getOne(queryWrapper);
        if(user==null){
            //如果用户不存在，则注册
            user = userService.createUser(mobile);
            //保存用户信息
            userService.save(user);
        }
        //如果用户存在，则执行以下业务，可以保存用户会话信息
        String uToken = UUID.randomUUID().toString();
        redisUtil.set(REDIS_USER_TOKEN+":"+user.getId(),uToken,60*60*24);
        //校验成功后，将验证码删除
        redisUtil.del(MOBILE_SMSCODE+":"+mobile);
        //返回用户信息和token
        UsersVo usersVo = new UsersVo();
        BeanUtils.copyProperties(user, usersVo);
        usersVo.setUserToken(uToken);
        return GraceJSONResult.ok(usersVo);
    }
}
