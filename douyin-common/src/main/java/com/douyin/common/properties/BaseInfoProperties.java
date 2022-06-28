package com.douyin.common.properties;


import com.douyin.common.result.PagedGridResult;
import com.douyin.common.utils.RedisUtil;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author: 何翔
 * @date: 2022/5/10
 * @description: 基础控制器
 */

public class BaseInfoProperties {
    @Autowired
    public RedisUtil redisUtil;

    public static final Integer COMMON_START_PAGE = 1;
    public static final Integer COMMON_PAGE_SIZE = 10;

    public static final String MOBILE_SMSCODE = "mobile:smscode";
    public static final String REDIS_USER_TOKEN = "redis_user_token";
    public static final String REDIS_USER_INFO = "redis_user_info";
    // 我的关注总数
    public static final String REDIS_MY_FOLLOWS_COUNTS = "redis_my_follows_counts";
    // 我的粉丝总数
    public static final String REDIS_MY_FANS_COUNTS = "redis_my_fans_counts";
    // 视频和发布者获赞数
    public static final String REDIS_VLOG_BE_LIKED_COUNTS = "redis_vlog_be_liked_counts";
    public static final String REDIS_VLOGER_BE_LIKED_COUNTS = "redis_vloger_be_liked_counts";

    public PagedGridResult setterPagedGrid(List<?> list,
                                           Integer page) {
        /*
        * @Author: 何翔
        * @Description: 对分页结果进行包装
        * @DateTime: 2022/6/20 0:39
        * @Params: [list, page]
        * @Return com.douyin.common.result.PagedGridResult
        */
        PageInfo<?> pageList = new PageInfo<>(list);
        PagedGridResult gridResult = new PagedGridResult();
        gridResult.setRows(list);
        gridResult.setPage(page);
        gridResult.setRecords(pageList.getTotal());
        gridResult.setTotal(pageList.getPages());
        return gridResult;
    }
}
