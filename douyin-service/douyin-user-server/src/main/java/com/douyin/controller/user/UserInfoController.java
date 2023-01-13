package com.douyin.controller.user;

import com.douyin.common.enums.FileTypeEnum;
import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.enums.UserInfoModifyType;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.framework.domain.user.User;
import com.douyin.framework.domain.user.vo.UserVo;
import com.douyin.service.middleware.MinioService;
import com.douyin.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * <p>
 * 用户信息表 前端控制器
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
@RestController
@Slf4j
@RequestMapping("/user/info")
@Tag(name = "UserInfoController",description = "用户信息模块")
public class UserInfoController extends BaseProperties<User> {

    @Autowired
    UserService userService;

    @DubboReference
    MinioService minioService;

    /**
     * 根据主键查询用户基本信息
     *
     * @param userId 用户Id
     */
    @GetMapping("/query")
    public GraceJSONResult query(@RequestParam String userId){
        // 从缓存获取
        User redisCacheObject = redisCache.getObject(REDIS_USER_INFO + ":" + userId);
        // 缓存内没有则从数据库获取
        if(redisCacheObject ==null){
            redisCacheObject = userService.getUser(userId);
            redisCache.setObject(REDIS_USER_INFO + ":" + userId, redisCacheObject);
        }
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(redisCacheObject,userVo);

        // 用户关注博主的总数量
        String myFollowsCountsStr = redis.get(REDIS_MY_FOLLOWS_COUNTS + ":" + userId);
        // 用户的粉丝总数
        String myFansCountsStr = redis.get(REDIS_MY_FANS_COUNTS + ":" + userId);
        //用户获赞总数，视频+评论（点赞/喜欢）总和
        String likedVlogCountsStr = redis.get(REDIS_VLOG_BE_LIKED_COUNTS + ":" + userId);
        String likedVlogerCountsStr = redis.get(REDIS_VLOGER_BE_LIKED_COUNTS + ":" + userId);

        Integer myFollowsCounts=0;
        Integer myFansCounts=0;
        Integer likedVlogCounts=0;
        Integer likedVlogerCounts=0;
        Integer totalLikeMeCounts=0;

        if(StringUtils.isNotBlank(myFollowsCountsStr)){
            myFollowsCounts = Integer.valueOf(myFollowsCountsStr);
        }
        if(StringUtils.isNotBlank(myFansCountsStr)){
            myFansCounts = Integer.valueOf(myFollowsCountsStr);
        }
        if(StringUtils.isNotBlank(likedVlogCountsStr)){
            likedVlogCounts = Integer.valueOf(likedVlogCountsStr);
        }
        if(StringUtils.isNotBlank(likedVlogerCountsStr)){
            likedVlogerCounts = Integer.valueOf(likedVlogerCountsStr);
        }
        totalLikeMeCounts = likedVlogCounts + likedVlogerCounts;

        userVo.setMyFollowsCounts(myFollowsCounts);
        userVo.setMyFansCounts(myFansCounts);
        userVo.setTotalLikeMeCounts(totalLikeMeCounts);

        return GraceJSONResult.ok(userVo);
    }

    /**
     * 更新用户信息
     *
     * @param userUpdateBo 用户更新数据层对象
     * @param type 更新信息类型
     */
    @PostMapping("/modify")
    public GraceJSONResult modify(@RequestBody User userUpdateBo, @RequestParam Integer type){
        UserInfoModifyType.checkUserInfoTypeIsRight(type);
        User user = userService.updateUserInfo(userUpdateBo, type);
        // 更新缓存
        redisCache.setObject(REDIS_USER_INFO + ":" + user.getId(),user);
        return GraceJSONResult.ok(user);
    }

    /**
     * 修改头像或背景图片
     *
     * @param userId 用户Id
     * @param type 修改类型
     * @param file 图片文件
     */
    @PostMapping("/modifyImage")
    public GraceJSONResult modifyImage(@RequestParam String userId,
                                       @RequestParam Integer type,
                                       MultipartFile file) {
        if(type != FileTypeEnum.BGIMG.type && type != FileTypeEnum.FACE.type){
            return GraceJSONResult.errorCustom(ResponseStatusEnum.FILE_UPLOAD_FAILD);
        }
        // 因为dubbo中不能传递MultipartFile，所以需要转为字节后传过去再转回来
        byte[] arr=null;
        // 获取文件名
        String originalFilename = file.getOriginalFilename();
        // 获取图片大小
        long fileSize = file.getSize();
        try {
            arr = file.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        User userUpdateBo = minioService.uploadImg(userId, type, originalFilename,fileSize,arr);
        // 修改图片地址到数据库
        User user = userService.updateUserInfo(userUpdateBo);
        // 更新缓存
        redisCache.setObject(REDIS_USER_INFO + ":" + user.getId(),user);
        return GraceJSONResult.ok(user);
    }

}