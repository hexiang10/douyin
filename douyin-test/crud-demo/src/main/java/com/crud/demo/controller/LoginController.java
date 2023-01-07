package com.crud.demo.controller;

import com.douyin.common.results.R;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 * 登录测试控制器
 *</p>
 *
 * @author hexiang
 */

@RestController
@Tag(name = "登录管理",description = "登录接口测试")
public class LoginController {
    /**
     * 用户登录测试
     */
    @PostMapping("/user/login")
    public R<Map<String,Object>> login(){
        Map<String,Object> map = new HashMap<>();
        map.put("token","admin-token");
        return R.ok(map);
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/user/info")
    public R<Map<String,Object>> info(){
        Map<String,Object> map = new HashMap<>();
        map.put("roles","admin");
        map.put("name","Super Admin");
        map.put("introduction","I am a super administrator");
        map.put("avatar","https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
        return R.ok(map);
    }
}