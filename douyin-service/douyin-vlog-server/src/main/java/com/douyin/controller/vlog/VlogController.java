package com.douyin.controller.vlog;

import com.douyin.common.enums.YesOrNo;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.framework.domain.vlog.bo.VlogBo;
import com.douyin.service.vlog.VlogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * <p>
 * 短视频表 前端控制器
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
@RestController
@RequestMapping("/vlog")
@Tag(name = "短视频业务模块",description = "VlogController")
public class VlogController extends BaseProperties<Vlog> {

    @Autowired
    VlogService vlogService;

    /**
     * 新增视频信息
     *
     * @param vlogBo 视频信息
     */
    @PostMapping("/publish")
    public GraceJSONResult publish(@Valid @RequestBody VlogBo vlogBo){
        vlogService.createVlog(vlogBo);
        return GraceJSONResult.ok();
    }

    /**
     * 分页查询视频列表信息
     *
     * @param search 搜索视频条件，若无则分页查询所有
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/list")
    public GraceJSONResult getVlogList(@RequestParam(defaultValue = "") String search,
                                       @RequestParam Integer page,
                                       @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.getVlogList(search,page,pageSize));
    }

    /**
     * 查询单个视频详情
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @GetMapping("/detail")
    public GraceJSONResult getVlogDetail(@RequestParam(defaultValue = "") String userId,
                                         @RequestParam String vlogId){
        return GraceJSONResult.ok(vlogService.getVlogById(vlogId));
    }

    /**
     * 修改用户视频的状态为私密
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @PostMapping("/changeToPrivate")
    public GraceJSONResult changeToPrivate(@RequestParam String userId,
                                           @RequestParam String vlogId){
        vlogService.changeToPrivateOrPublic(userId,vlogId, YesOrNo.YES.type);
        return GraceJSONResult.ok();
    }

    /**
     * 修改用户视频的状态为公开
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @PostMapping("/changeToPublic")
    public GraceJSONResult changeToPublic(@RequestParam String userId,
                                          @RequestParam String vlogId){
        vlogService.changeToPrivateOrPublic(userId,vlogId, YesOrNo.NO.type);
        return GraceJSONResult.ok();
    }

    /**
     * 分页查询用户的公开视频
     *
     * @param userId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/myPublicList")
    public GraceJSONResult myPublicList(@RequestParam String userId,
                                        @RequestParam Integer page,
                                        @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.queryUserVlogList(userId,page,pageSize,YesOrNo.NO.type));
    }

    /**
     * 分页查询用户的私密视频
     *
     * @param userId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/myPrivateList")
    public GraceJSONResult myPrivateList(@RequestParam String userId,
                                        @RequestParam Integer page,
                                        @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.queryUserVlogList(userId,page,pageSize,YesOrNo.YES.type));
    }

}