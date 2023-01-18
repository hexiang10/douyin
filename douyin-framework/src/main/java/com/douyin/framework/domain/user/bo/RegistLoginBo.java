package com.douyin.framework.domain.user.bo;


import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;


/**
 * @author: hexiang
 * @description: 登录注册BO
 */

@Data
public class RegistLoginBo {
    @NotBlank(message = "手机号不能为空")
    @Length(min = 11, max = 11, message = "手机号长度不正确")
    private String mobile;
    @NotBlank(message = "验证码不能为空")
    private String smsCode;
}