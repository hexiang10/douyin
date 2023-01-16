package com.douyin.controller.middleware;

import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.exception.GraceException;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.StringUtil;
import com.douyin.config.middleware.MinIOConfig;
import com.douyin.service.middleware.MinioService;
import com.douyin.utils.middleware.MinIOUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * <p>
 * 上传功能 前端控制器
 * </p>
 *
 * @author hexiang
 */

@RestController
@Tag(name = "MinioController",description = "短视频业务模块")
public class MinioController {

    @Autowired
    MinIOConfig minIOConfig;

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
    public Object upload(@RequestParam String userId,MultipartFile file) throws Exception {
        String filename = "Video/" + userId + "/"+ file.getOriginalFilename()+".info/"+StringUtil.getCurrentTimeStr()+"_"+file.getOriginalFilename();
        MinIOUtil.uploadFile(minIOConfig.getBucketName(),filename,file.getInputStream());
        String url = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + filename;
        return GraceJSONResult.ok(url);
    }

    /**
     * 上传视频
     *
     * @param userId 用户id
     * @param file 视频文件
     */
    @PostMapping("/upload/video")
    public GraceJSONResult uploadVideo(@RequestParam String userId, MultipartFile file){
        // 因为dubbo中不能传递MultipartFile，所以需要转为字节后传过去再转回来
        byte[] arr=null;
        // 获取文件名
        String originalFilename = file.getOriginalFilename();
        // 获取文件大小
        long fileSize = file.getSize();
        try {
            arr = file.getBytes();
        } catch (IOException e) {
            GraceException.display(ResponseStatusEnum.VIDEO_UPLOAD_FAILD);
        }
        return minioService.uploadVideo(userId,originalFilename,fileSize,arr);
    }

}