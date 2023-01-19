package com.douyin.controller.vlog;

import com.douyin.common.enums.YesOrNo;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.framework.domain.vlog.bo.VlogBo;
import com.douyin.service.vlog.MyLikedVlogService;
import com.douyin.service.vlog.VlogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@Tag(name = "短视频业务模块",description = "VlogController")
public class VlogController extends BaseProperties<Vlog> {

    @Autowired
    VlogService vlogService;

    @Autowired
    MyLikedVlogService myLikedVlogService;

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
    public GraceJSONResult getVlogList(@RequestParam(defaultValue = "") String userId,
                                       @RequestParam(defaultValue = "") String search,
                                       @RequestParam Integer page,
                                       @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.getVlogList(userId,search,page,pageSize));
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
        return GraceJSONResult.ok(vlogService.getVlogById(userId,vlogId));
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

    /**
     * 分页查询用户赞过的视频
     *
     * @param userId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/myLikedList")
    public GraceJSONResult myLikedList(@RequestParam String userId,
                                         @RequestParam Integer page,
                                         @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.getMyLikedVlogList(userId,page,pageSize));
    }

    /**
     * 分页查询用户关注博主的视频
     *
     * @param  myId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/followList")
    public GraceJSONResult followList(@RequestParam String myId,
                                       @RequestParam Integer page,
                                       @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.getMyFollowVlogList(myId,page,pageSize));
    }

    /**
     * 分页查询用户朋友的视频
     *
     * @param  myId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/friendList")
    public GraceJSONResult friendList(@RequestParam String myId,
                                      @RequestParam Integer page,
                                      @RequestParam Integer pageSize){
        if(page==null) page = COMMON_START_PAGE;
        if(pageSize==null) pageSize = COMMON_PAGE_SIZE;
        return GraceJSONResult.ok(vlogService.getMyFriendVlogList(myId,page,pageSize));
    }

    /**
     * 用户点赞/喜欢视频
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @PostMapping("/like")
    public GraceJSONResult like(@RequestParam String userId,
                                @RequestParam String vlogerId,
                                @RequestParam String vlogId){

        // 用户点赞的视频，关联关系保存到数据库
        myLikedVlogService.userLikeVlog(userId,vlogId);

        // 点赞后，视频和视频发布者的获赞都会+1
        redis.increment(REDIS_VLOGER_BE_LIKED_COUNTS+":"+vlogerId,1);
        redis.increment(REDIS_VLOG_BE_LIKED_COUNTS+":"+vlogId,1);

        // 用户点赞的视频，需要在redis中保存关联关系
        redis.set(REDIS_USER_LIKE_VLOG+":"+userId+":"+vlogId,"1");

        return GraceJSONResult.ok();
    }

    /**
     * 用户取消点赞/喜欢视频
     *
     * @param userId 用户Id
     * @param vlogId 视频Id
     */
    @PostMapping("/unlike")
    public GraceJSONResult unlike(@RequestParam String userId,
                                @RequestParam String vlogerId,
                                @RequestParam String vlogId){

        // 用户点赞的视频，关联关系保存到数据库
        myLikedVlogService.userUnLikeVlog(userId,vlogId);

        // 取消点赞后，视频和视频发布者的获赞都会-1
        redis.decrement(REDIS_VLOGER_BE_LIKED_COUNTS+":"+vlogerId,1);
        redis.decrement(REDIS_VLOG_BE_LIKED_COUNTS+":"+vlogId,1);

        // 用户取消点赞的视频，需要在redis中保存关联关系
        redis.del(REDIS_USER_LIKE_VLOG+":"+userId+":"+vlogId);

        return GraceJSONResult.ok();
    }

    /**
     * 获取视频点赞总数
     *
     * @param vlogId 视频Id
     */
    @PostMapping("/totalLikedCounts")
    public GraceJSONResult totalLikedCounts(@RequestParam String vlogId){
        return GraceJSONResult.ok(vlogService.getVlogBeLikedCounts(vlogId));
    }

}