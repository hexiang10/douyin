package com.douyin.framework.domain.user.vo;

import com.douyin.framework.domain.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 用户表
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class UserVo extends User {

    private static final long serialVersionUID = 1L;

    /**
     * 用户token，传递给前端
     */
    private String userToken;
    /**
     * 抖音号能否被修改：1：默认，可以修改；0，无法修改
     */
    private Integer canImoocNumBeUpdated;
    /**
     * 用户关注博主的总数量
     */
    private Integer myFollowsCounts=0;
    /**
     * 用户的粉丝总数
     */
    private Integer myFansCounts=0;
    /**
     * 所有喜欢用户的总数
     */
    private Integer totalLikeMeCounts=0;


}