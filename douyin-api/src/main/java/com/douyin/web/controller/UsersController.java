package com.douyin.web.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.douyin.common.config.MinIOConfig;
import com.douyin.common.enums.FileTypeEnum;
import com.douyin.common.enums.UserInfoModifyType;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.exceptions.GraceException;
import com.douyin.common.properties.BaseInfoProperties;
import com.douyin.common.result.GraceJSONResult;
import com.douyin.common.result.ResponseStatusEnum;
import com.douyin.common.utils.MinIOUtil;
import com.douyin.model.bo.UpdatedUserBo;
import com.douyin.model.domain.Users;
import com.douyin.model.vo.UsersVo;
import com.douyin.service.IUsersService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

/**
 * <p>
 * 用户信息接口模块 前端控制器
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Slf4j
@RestController
@RequestMapping("/userInfo")
@Api(tags = "用户信息接口模块")
public class UsersController extends BaseInfoProperties {

    @Autowired
    private IUsersService userService;

    @Autowired
    private MinIOConfig minIOConfig;

    @ApiOperation("查询用户信息")
    @GetMapping("/query")
    public Object queryUserInfo(@RequestParam String userId) {
        // 返回用户信息和token
        Users user = userService.getById(userId);
        UsersVo usersVo = new UsersVo();
        BeanUtils.copyProperties(user, usersVo);
        // 用户关注博主的总数量
        String myFollowsCounts = redisUtil.get(REDIS_MY_FOLLOWS_COUNTS + ":" + userId);
        // 用户的粉丝总数
        String myFansCounts = redisUtil.get(REDIS_MY_FANS_COUNTS + ":" + userId);
        // 用户获赞总数（视频+评论或者是点赞+喜欢总和都行）
        String likedVlogCounts = redisUtil.get(REDIS_VLOG_BE_LIKED_COUNTS + ":" + userId);
        String likedVlogerCounts = redisUtil.get(REDIS_VLOGER_BE_LIKED_COUNTS + ":" + userId);

        // 判断数量信息是否有误
        if(StringUtils.isNotBlank(myFollowsCounts)){
            usersVo.setMyFollowsCounts(Integer.parseInt(myFollowsCounts));
        }
        if(StringUtils.isNotBlank(myFansCounts)){
            usersVo.setMyFansCounts(Integer.parseInt(myFansCounts));
        }
        if(StringUtils.isNotBlank(likedVlogCounts)&&StringUtils.isNotBlank(likedVlogerCounts)){
            usersVo.setTotalLikeMeCounts(Integer.parseInt(likedVlogCounts)+Integer.parseInt(likedVlogerCounts));
        }
        log.info("用户信息：{}", usersVo);
        return GraceJSONResult.ok(usersVo);
    }


    @ApiOperation("修改用户信息")
    @PostMapping("/modifyUserInfo")
    @Transactional
    public GraceJSONResult updateUserInfo(@RequestBody UpdatedUserBo updatedUserBo, @RequestParam Integer type) {

        UserInfoModifyType.checkUserInfoTypeIsRight(type);
        QueryWrapper<Users> queryWrapper = new QueryWrapper<>();

        // 查询用户昵称是否存在
        if(Objects.equals(type, UserInfoModifyType.NICKNAME.type)){
            queryWrapper.eq("nickname", updatedUserBo.getNickname());
            Users users = userService.getOne(queryWrapper);
            if(users != null){
                GraceException.display(ResponseStatusEnum.USER_INFO_UPDATED_NICKNAME_EXIST_ERROR);
            }
        }

        // 查询用户抖音ID是否存在
        if(Objects.equals(type, UserInfoModifyType.DOUYINNUM.type)){
            queryWrapper.eq("douyin_num", updatedUserBo.getDouyinNum());
            Users users = userService.getOne(queryWrapper);
            if(users != null){
                GraceException.display(ResponseStatusEnum.USER_INFO_UPDATED_DOUYINNUM_EXIST_ERROR);
            }
            users = userService.getById(updatedUserBo.getId());
            if(Objects.equals(users.getCanDouyinNumBeUpdated(), YesOrNo.NO.type)){
                GraceException.display(ResponseStatusEnum.USER_INFO_CANT_UPDATED_DOUYINNUM_ERROR);
            }
            updatedUserBo.setCanDouyinNumBeUpdated(YesOrNo.NO.type);
        }
        Users user = new Users();
        BeanUtils.copyProperties(updatedUserBo, user);
        if(userService.updateById(user)){
            return GraceJSONResult.ok(userService.getById(user.getId()));
        }
        return GraceJSONResult.errorMsg("用户信息修改失败！");
    }

    @ApiOperation(value = "修改头像或背景", notes = "修改头像或背景")
    @PostMapping("/modifyImage")
    @Transactional
    public Object modifyImage(@RequestParam String userId,
                              @RequestParam Integer type,
                              MultipartFile file) throws Exception {
        // 判断修改的图片类型
        if(!Objects.equals(type, FileTypeEnum.BGIMG.type) && !Objects.equals(type, FileTypeEnum.FACE.type)){
            return GraceJSONResult.errorCustom(ResponseStatusEnum.FILE_UPLOAD_FAILD);
        }
        UpdatedUserBo updatedUserBo = new UpdatedUserBo();
        updatedUserBo.setId(userId);
        // 上传文件
        MinIOUtil.uploadFile(minIOConfig.getBucketName(),file.getOriginalFilename(),file.getInputStream());
        String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + file.getOriginalFilename();
        if(Objects.equals(type, FileTypeEnum.BGIMG.type)){
            updatedUserBo.setBgImg(imgUrl);
        }else {
            updatedUserBo.setFace(imgUrl);
        }
        Users user = new Users();
        BeanUtils.copyProperties(updatedUserBo, user);
        // 更新数据库信息
        if(userService.updateById(user)){
            return GraceJSONResult.ok(userService.getById(user.getId()));
        }
        return GraceJSONResult.errorMsg("信息修改失败！");
    }

}
