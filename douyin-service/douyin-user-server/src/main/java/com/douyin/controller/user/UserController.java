package com.douyin.controller.user;

import com.douyin.common.enums.FileTypeEnum;
import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.enums.UserInfoModifyType;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.framework.domain.user.User;
import com.douyin.framework.domain.user.bo.RegistLoginBo;
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

import javax.validation.Valid;
import java.io.IOException;
import java.util.UUID;

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
@RequestMapping("/user")
@Tag(name = "用户业务模块",description = "UserController")
public class UserController extends BaseProperties<User> {

    @Autowired
    UserService userService;

    @DubboReference
    MinioService minioService;

    /**
     * 实现用户手机号一键登录/注册
     *
     * @param registLoginBo 注册登录对象
     */
    @PostMapping("/login")
    public GraceJSONResult login(@Valid @RequestBody RegistLoginBo registLoginBo) {
        // TODO 用户名密码登录业务待拓展
        String mobile = registLoginBo.getMobile();
        String code = registLoginBo.getSmsCode();
        // 从redis获取验证码进行校验是否匹配
        String smsCode = redis.get(MOBILE_SMSCODE+":"+mobile);
        if (StringUtils.isBlank(smsCode)||!smsCode.equalsIgnoreCase(code)) {
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SMS_CODE_ERROR);
        }
        // 查询数据库，判断用户是否存在
        User user = userService.queryMobileIsExist(mobile);
        // 如果用户为空，表示没有注册过，则为null，需要注册信息入库
        if(user==null){
            user= userService.createUser(mobile);
        }
        // 如果用户不为空，则保存用户会话信息和用户信息
        String uToken = UUID.randomUUID().toString();
        redis.set(REDIS_USER_TOKEN + ":"+ user.getId(),uToken,24*60*60*7);
        redisCache.setObject(REDIS_USER_INFO+":"+user.getId(),user);
        // 用户登录注册成功以后，删除redis中的短信验证码
        redis.del(MOBILE_SMSCODE+":"+mobile);
        // 返回用户信息，包含token令牌
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(user,userVo);
        userVo.setUserToken(uToken);
        return GraceJSONResult.ok(userVo);
    }

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

        if(StringUtils.isNotBlank(myFollowsCountsStr)){
            userVo.setMyFollowsCounts(Integer.valueOf(myFollowsCountsStr));
        }
        if(StringUtils.isNotBlank(myFansCountsStr)){
            userVo.setMyFansCounts(Integer.valueOf(myFollowsCountsStr));
        }
        if(StringUtils.isNotBlank(likedVlogCountsStr)){
            userVo.setTotalLikeMeCounts(userVo.getTotalLikeMeCounts()+Integer.parseInt(likedVlogCountsStr));
        }
        if(StringUtils.isNotBlank(likedVlogerCountsStr)){
            userVo.setTotalLikeMeCounts(userVo.getTotalLikeMeCounts()+Integer.parseInt(likedVlogerCountsStr));
        }

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
        if(userUpdateBo!=null) {
            // 修改图片地址到数据库
            User user = userService.updateUserInfo(userUpdateBo);
            // 更新缓存
            redisCache.setObject(REDIS_USER_INFO + ":" + user.getId(),user);
            return GraceJSONResult.ok(user);
        }else {
            return GraceJSONResult.errorCustom(ResponseStatusEnum.FILE_UPLOAD_FAILD);
        }

    }

}