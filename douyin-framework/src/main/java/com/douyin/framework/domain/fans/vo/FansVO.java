package com.douyin.framework.domain.fans.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FansVO implements Serializable {
    private String fanId;
    private String nickname;
    private String face;
    private boolean isFriend = false;
}