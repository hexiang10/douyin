package com.douyin.web.controller;

import com.douyin.common.config.MinIOConfig;
import com.douyin.common.result.GraceJSONResult;
import com.douyin.common.utils.MinIOUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * <p>
 * 项目启动测试 前端控制器
 * </p>
 *
 * @author 何翔
 * @since 2022-05-07
 */

@RestController
@Api(value = "项目测试接口模块", tags = "项目测试接口模块")
@RequestMapping("test")
public class TestController {

    @Autowired
    private MinIOConfig minIOConfig;

    @GetMapping("/hello")
    @ApiOperation(value = "项目启动测试", notes = "项目启动测试")
    public Object hello() {
        return GraceJSONResult.ok("hello world");
    }

    @PostMapping("/upload")
    @ApiOperation(value = "文件上传测试", notes = "文件上传测试")
    public Object upload(MultipartFile file) throws Exception {
        MinIOUtil.uploadFile(minIOConfig.getBucketName(),file.getOriginalFilename(),file.getInputStream());
        String url = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + file.getOriginalFilename();
        return GraceJSONResult.ok(url);
    }

}
