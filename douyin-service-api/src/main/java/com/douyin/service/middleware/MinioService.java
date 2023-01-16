package com.douyin.service.middleware;

import com.douyin.common.results.GraceJSONResult;
import com.douyin.framework.domain.user.User;

/**
 * <p>
 * minio 服务类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
public interface MinioService  {

    /**
     * 上传图片信息
     * @param userId 用户id
     * @param type 类型
     * @param originalFilename 源文件名
     * @param fileSize 文件大小
     * @param arr 文件流
     */
    public User uploadImg(String userId, Integer type, String originalFilename, long fileSize, byte[] arr);

    /**
     * 上传视频
     * @param userId 用户id
     * @param originalFilename 原始文件名
     * @param fileSize 文件大小
     * @param arr 文件流
     */
    public GraceJSONResult uploadVideo(String userId, String originalFilename, long fileSize, byte[] arr);


}