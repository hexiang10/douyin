package com.douyin.controller.middleware;

import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.service.middleware.MsgService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 上传功能 前端控制器
 * </p>
 *
 * @author hexiang
 */

@RestController
@Tag(name = "消息业务模块",description = "MsgController")
@RequestMapping("/msg")
public class MsgController extends BaseProperties {


    @Autowired
    MsgService msgService;

    /**
     * 分页查询消息列表
     *
     * @param userId 接受方
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/list")
    public GraceJSONResult list(@RequestParam String userId,
                                @RequestParam Integer page,
                                @RequestParam Integer pageSize) {
        // mongodb从0开始分页，区别于数据库
        if(page==null) page = COMMON_START_PAGE_ZERO;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;

        return GraceJSONResult.ok(msgService.queryList(userId,page, pageSize));
    }


}