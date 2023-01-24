package com.douyin.controller.middleware;

import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.exception.GraceException;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.StringUtil;
import com.douyin.config.middleware.MinIOConfig;
import com.douyin.framework.domain.vlog.vo.VlogUploadVO;
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
@Tag(name = "视频上传服务",description = "MinioController")
public class MinioController {

    @Autowired
    MinIOConfig minIOConfig;

    @Autowired
    MinioService minioService;

    /**
     * 上传封面
     *
     * @param file 上传的文件
     */
    @PostMapping("/upload/cover")
    public GraceJSONResult uploadCover(@RequestParam String userId, MultipartFile file) {
        String filename = "video_user/" + userId + "/"+ file.getOriginalFilename()+"_info/"+StringUtil.getCurrentTimeStr()+"_cover_"+file.getOriginalFilename();
        try {
            MinIOUtil.uploadFile(minIOConfig.getBucketName(),filename,file.getInputStream());
        } catch (Exception e) {
            return GraceJSONResult.errorCustom(ResponseStatusEnum.VIDEO_COVER_UPLOAD_FAILD);
        }
        String coverPath = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + filename;
        VlogUploadVO vlogUploadVO = new VlogUploadVO();
        vlogUploadVO.setCoverPath(coverPath);
        return GraceJSONResult.ok(vlogUploadVO);
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