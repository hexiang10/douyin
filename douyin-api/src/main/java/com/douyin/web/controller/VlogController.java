package com.douyin.web.controller;


import com.douyin.common.enums.YesOrNo;
import com.douyin.common.properties.BaseInfoProperties;
import com.douyin.common.result.GraceJSONResult;
import com.douyin.common.result.PagedGridResult;
import com.douyin.model.bo.VlogBo;
import com.douyin.model.domain.Vlog;
import com.douyin.model.vo.IndexVlogVO;
import com.douyin.service.IVlogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * <p>
 * 短视频表 前端控制器
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@RestController
@RequestMapping("/vlog")
@Api(tags = "短视频业务模块")
public class VlogController extends BaseInfoProperties {

    @Autowired
    private IVlogService vlogService;

    @ApiOperation("上传发布视频")
    @PostMapping("publish")
    public GraceJSONResult publish(@RequestBody VlogBo vlogBo){
        // TODO 校验vlogBo
        // 保存上传视频的信息
        vlogService.createVlog(vlogBo);
        return GraceJSONResult.ok();
    }

    @ApiOperation("查询视频列表")
    @GetMapping("indexList")
    public GraceJSONResult publish(@RequestParam(defaultValue = "")String search,
                                   @RequestParam Integer page,
                                   @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        // 获取视频列表信息
        List<IndexVlogVO> vlogList = vlogService.getIndexVlogList(search,page,pageSize);
        PagedGridResult pagedGridResult = setterPagedGrid(vlogList, page);
        return GraceJSONResult.ok(pagedGridResult);
    }

    @ApiOperation("查询视频详情")
    @GetMapping("detail")
    public GraceJSONResult detail(@RequestParam(defaultValue = "") String userId,
                                  @RequestParam String vlogId){
        // 获取视频详情信息
        IndexVlogVO vlogVO = vlogService.getVlogDetailById(vlogId);
        return GraceJSONResult.ok(vlogVO);
    }

    @ApiOperation("设置作品为私密")
    @GetMapping("changeToPrivate")
    public GraceJSONResult changeToPrivate(@RequestParam(defaultValue = "") String userId,
                                           @RequestParam String vlogId){
        // 将作品设置为私密
        vlogService.changeToPrivateOrPublic(vlogId,userId, YesOrNo.YES.type);
        return GraceJSONResult.ok();
    }

    @ApiOperation("设置作品为公开")
    @GetMapping("changeToPublic")
    public GraceJSONResult changeToPublic(@RequestParam(defaultValue = "") String userId,
                                           @RequestParam String vlogId){
        // 将作品设置为公开
        vlogService.changeToPrivateOrPublic(vlogId,userId, YesOrNo.NO.type);
        return GraceJSONResult.ok();
    }

    @ApiOperation("查询公开作品")
    @GetMapping("myPublicList")
    public GraceJSONResult myPublicList(@RequestParam String userId,
                                   @RequestParam Integer page,
                                   @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        // 获取公开视频列表信息
        List<Vlog> vlogList = vlogService.queryMyVlogList(userId,page,pageSize,YesOrNo.NO.type);
        PagedGridResult pagedGridResult = setterPagedGrid(vlogList, page);
        return GraceJSONResult.ok(pagedGridResult);
    }

    @ApiOperation("查询私密作品")
    @GetMapping("myPrivateList")
    public GraceJSONResult myPrivateList(@RequestParam String userId,
                                   @RequestParam Integer page,
                                   @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        // 获取私密视频列表信息
        List<Vlog> vlogList = vlogService.queryMyVlogList(userId,page,pageSize,YesOrNo.YES.type);
        PagedGridResult pagedGridResult = setterPagedGrid(vlogList, page);
        return GraceJSONResult.ok(pagedGridResult);
    }

}
