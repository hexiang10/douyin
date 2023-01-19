package com.douyin.framework.domain.vlog.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VlogerVO implements Serializable {
    private String vlogerId;
    private String nickname;
    private String face;
    private boolean isFollowed = true;
}