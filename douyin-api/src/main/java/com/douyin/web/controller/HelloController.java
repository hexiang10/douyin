package com.douyin.web.controller;

import com.douyin.common.result.GraceJSONResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 项目启动测试 前端控制器
 * </p>
 *
 * @author 何翔
 * @since 2022-05-07
 */

@RestController
@Api(value = "项目启动测试", tags = "项目启动测试")
public class HelloController {

    @GetMapping("/hello")
    @ApiOperation(value = "项目启动测试", notes = "项目启动测试")
    public Object hello() {
        return GraceJSONResult.ok("hello world");
    }

}
