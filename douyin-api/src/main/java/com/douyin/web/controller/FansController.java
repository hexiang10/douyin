package com.douyin.web.controller;


import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.result.GraceJSONResult;
import com.douyin.service.IFansService;
import com.douyin.service.IUsersService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 粉丝表

 前端控制器
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@RestController
@Api(tags = "粉丝业务模块")
@RequestMapping("/fans")
public class FansController {

    @Autowired
    private IFansService fansService;

    @Autowired
    private IUsersService usersService;

    @ApiOperation("关注用户")
    @PostMapping("/follow")
    public GraceJSONResult follow (@RequestParam String vlogerId,
                                   @RequestParam String myId){
        //判断两个id不能为空
        if(StringUtils.isBlank(myId)|| StringUtils.isBlank(vlogerId)){
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SYSTEM_ERROR);
        }

        //判断当前用户，自己不能关注自己
        if(vlogerId.equalsIgnoreCase(myId))
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SYSTEM_RESPONSE_NO_INFO);

        //判断两个id对应的用户是否存在
        if(usersService.getById(vlogerId)==null||usersService.getById(myId)==null)
            return GraceJSONResult.errorCustom(ResponseStatusEnum.SYSTEM_RESPONSE_NO_INFO);

        fansService.doFollow(myId,vlogerId);
        return GraceJSONResult.ok();
    }
}
