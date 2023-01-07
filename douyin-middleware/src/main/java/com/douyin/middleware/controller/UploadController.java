package com.douyin.middleware.controller;

import com.douyin.common.results.GraceJSONResult;
import com.douyin.middleware.config.MinIOConfig;
import com.douyin.middleware.utils.MinIOUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 * 上传功能 前端控制器
 * </p>
 *
 * @author hexiang
 */

@RestController
@RequestMapping("/upload")
@Tag(name = "上传功能",description = "上传功能接口")
public class UploadController {

    @Autowired
    private MinIOConfig minIOConfig;

    /**
     * 文件上传测试
     *
     * @param file 上传的文件
     * @return Object
     * @throws Exception 异常
     */
    @PostMapping("/file")
    public Object upload(MultipartFile file) throws Exception {
        MinIOUtil.uploadFile(minIOConfig.getBucketName(),file.getOriginalFilename(),file.getInputStream());
        String url = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + file.getOriginalFilename();
        return GraceJSONResult.ok(url);
    }
}