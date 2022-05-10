package com.douyin.model.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @author: 何翔
 * @date: 2022/5/10
 * @description: 登录注册BO
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistLoginBo {
    @NotBlank(message = "手机号不能为空")
    @Length(min = 11, max = 11, message = "手机号长度不正确")
    private String mobile;
    @NotBlank(message = "验证码不能为空")
    private String smsCode;
}
