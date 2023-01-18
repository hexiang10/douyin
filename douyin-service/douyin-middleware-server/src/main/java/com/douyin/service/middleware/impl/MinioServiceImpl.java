package com.douyin.service.middleware.impl;

import com.douyin.common.enums.FileTypeEnum;
import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.exception.GraceException;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.common.utils.StringUtil;
import com.douyin.config.middleware.MinIOConfig;
import com.douyin.framework.domain.user.User;
import com.douyin.framework.domain.vlog.vo.VlogUploadVO;
import com.douyin.service.middleware.MinioService;
import com.douyin.utils.middleware.MinIOUtil;
import com.douyin.utils.middleware.VideoUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@DubboService
@Slf4j
public class MinioServiceImpl implements MinioService {

    @Autowired
    MinIOConfig minIOConfig;

    /**
     * 上传图片信息
     *
     * @param userId           用户id
     * @param type             类型
     * @param originalFilename 源文件名
     * @param fileSize         文件大小
     * @param arr              文件流
     */
    @Override
    public User uploadImg(String userId, Integer type, String originalFilename, long fileSize, byte[] arr) {
        String filename = "test/system/img_error.jpg";
        try {
            if(type == FileTypeEnum.BGIMG.type){
                filename = "img_bg/" + userId + "/"+ StringUtil.getCurrentTimeStr()+"_"+originalFilename;
            }
            if(type == FileTypeEnum.FACE.type){
                filename = "img_face/" + userId + "/"+ StringUtil.getCurrentTimeStr()+"_"+originalFilename;
            }
            //将字节转换为流
            InputStream inputStream=null;
            inputStream = new ByteArrayInputStream(arr);
            // 上传文件
            MinIOUtil.uploadFile(minIOConfig.getBucketName(),filename,inputStream);
            String url = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + filename;
            log.info("上传图片返回地址为：{}",url);
            User userUpdateBo = new User();
            userUpdateBo.setId(userId);
            if(type == FileTypeEnum.BGIMG.type){
                userUpdateBo.setBgImg(url);
            }
            if(type == FileTypeEnum.FACE.type){
                userUpdateBo.setFace(url);
            }
            return userUpdateBo;
        } catch (Exception e) {
            GraceException.display(ResponseStatusEnum.FILE_UPLOAD_FAILD);
        }
        return null;
    }

    /**
     * 上传视频
     * @param userId 用户id
     * @param originalFilename 原始文件名
     * @param fileSize 文件大小
     * @param arr 文件流
     */
    @Override
    public GraceJSONResult uploadVideo(String userId, String originalFilename, long fileSize, byte[] arr) {
        String videoName = "video_user/" + userId + "/"+ originalFilename+"_info/"+StringUtil.getCurrentTimeStr()+"_"+originalFilename;
        try {
            MinIOUtil.uploadFile(minIOConfig.getBucketName(),videoName,new ByteArrayInputStream(arr));
        } catch (Exception e) {
            GraceException.display(ResponseStatusEnum.VIDEO_UPLOAD_FAILD);
        }
        String videoPath = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + videoName;
        String coverName = videoName+"_cover.jpg" ;
        try {
            MinIOUtil.uploadFile(minIOConfig.getBucketName(),coverName,VideoUtil.getScreenshot(videoPath));
        } catch (Exception e) {
            GraceException.display(ResponseStatusEnum.VIDEO_COVER_UPLOAD_FAILD);
        }
        String coverPath = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + coverName;
        // 设置默认封面
        if(StringUtils.isBlank(coverPath)){
            coverPath = "https://img-blog.csdnimg.cn/e9ed66d572754951bc5b4173791d6fce.jpeg";
        }
        VlogUploadVO vlogUploadVO = new VlogUploadVO();
        vlogUploadVO.setVideoPath(videoPath);
        vlogUploadVO.setCoverPath(coverPath);
        return GraceJSONResult.ok(vlogUploadVO);
    }

}