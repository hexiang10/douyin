package com.douyin.service.middleware.impl;

import com.douyin.common.enums.FileTypeEnum;
import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.exception.GraceException;
import com.douyin.common.utils.StringUtil;
import com.douyin.config.middleware.MinIOConfig;
import com.douyin.framework.domain.user.User;
import com.douyin.service.middleware.MinioService;
import com.douyin.utils.middleware.MinIOUtil;
import lombok.extern.slf4j.Slf4j;
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
        String filename = "SystemImg/errorImg.jpg";
        try {
            if(type == FileTypeEnum.BGIMG.type){
                filename = "BGImg/" + userId + "/"+ StringUtil.getCurrentTimeStr()+"_"+originalFilename;
            }
            if(type == FileTypeEnum.FACE.type){
                filename = "FaceImg/" + userId + "/"+ StringUtil.getCurrentTimeStr()+"_"+originalFilename;
            }
            //将字节转换为流
            InputStream inputStream=null;
            inputStream = new ByteArrayInputStream(arr);
            // 上传文件
            MinIOUtil.uploadFile(minIOConfig.getBucketName(),filename,inputStream);
        } catch (Exception e) {
            GraceException.display(ResponseStatusEnum.FILE_UPLOAD_FAILD);
        }
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
    }
}