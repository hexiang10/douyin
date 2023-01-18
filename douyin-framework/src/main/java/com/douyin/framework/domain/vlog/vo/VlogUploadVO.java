package com.douyin.framework.domain.vlog.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class VlogUploadVO implements Serializable {

    // 视频路径
    private String videoPath;
    // 封面路径
    private String coverPath;

}