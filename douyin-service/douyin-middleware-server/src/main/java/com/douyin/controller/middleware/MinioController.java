package com.douyin.controller.middleware;

import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.StringUtil;
import com.douyin.config.middleware.MinIOConfig;
import com.douyin.service.middleware.MinioService;
import com.douyin.utils.middleware.MinIOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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
public class MinioController {

    @Autowired
    private MinIOConfig minIOConfig;

    @Autowired
    MinioService minioService;

    /**
     * 文件上传测试
     *
     * @param file 上传的文件
     * @return Object
     * @throws Exception 异常
     */
    @PostMapping("/upload/file")
    public Object upload(MultipartFile file) throws Exception {
        String filename = StringUtil.getCustomUUid("dy",4)+file.getOriginalFilename();
        MinIOUtil.uploadFile(minIOConfig.getBucketName(),filename,file.getInputStream());
        String url = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + filename;
        return GraceJSONResult.ok(url);
    }

}