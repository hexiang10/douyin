package com.douyin.controller.fans;

import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.service.fans.FansService;
import com.douyin.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 粉丝表前端控制器
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@RestController
@Slf4j
@RequestMapping("/fans")
@Tag(name = "粉丝业务模块",description = "FansController")
public class FansController extends BaseProperties {

    @Autowired
    FansService fansService;

    @DubboReference
    UserService userService;

    /**
     * 关注用户
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @PostMapping("/follow")
    public GraceJSONResult follow(@RequestParam String myId, @RequestParam String vlogerId){

        // 判断两个id不能为空
        if(StringUtils.isBlank(myId)||StringUtils.isBlank(vlogerId)){
            return GraceJSONResult.errorCustom(ResponseStatusEnum.FAILED);
        }

        // 判断两个id对应的用户是否存在
        if(userService.getUser(vlogerId)==null||userService.getUser(myId) ==null){
            return GraceJSONResult.errorMsg("关注用户不存在");
        }

        // 判断当前用户，不能关注自己
        if(myId.equalsIgnoreCase(vlogerId)){
            return GraceJSONResult.errorMsg("不能自己关注自己~");
        }
        // 关注用户
        fansService.doFollow(myId, vlogerId);

        // 博主的粉丝+1，我的关注+1
        redis.increment(REDIS_MY_FANS_COUNTS+":"+vlogerId,1  );
        redis.increment(REDIS_MY_FOLLOWS_COUNTS+":"+myId,1  );

        // 我和博主的关联关系，依赖redis，不要存入数据库，避免db的性能瓶颈
        redis.set(REDIS_FANS_AND_VLOGGER_RELATIONSHIP+":"+myId+":"+vlogerId,"1");

        return GraceJSONResult.ok();
    }


    /**
     * 取消关注
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @PostMapping("/cancel")
    public GraceJSONResult cancel(@RequestParam String myId, @RequestParam String vlogerId){

        // 取消关注
        fansService.doCancel(myId, vlogerId);

        // 博主的粉丝-1，我的关注-1
        redis.decrement(REDIS_MY_FANS_COUNTS+":"+vlogerId,1  );
        redis.decrement(REDIS_MY_FOLLOWS_COUNTS+":"+myId,1  );

        // 我和博主的关联关系，依赖redis，不要存入数据库，避免db的性能瓶颈
        redis.del(REDIS_FANS_AND_VLOGGER_RELATIONSHIP+":"+myId+":"+vlogerId);

        return GraceJSONResult.ok();
    }

    /**
     * 查询用户是否关注博主
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @GetMapping("/queryDoIFollowVloger")
    public GraceJSONResult queryDoIFollowVloger(@RequestParam String myId, @RequestParam String vlogerId){

        String s = redis.get(REDIS_FANS_AND_VLOGGER_RELATIONSHIP + ":" + myId + ":" + vlogerId);
        // 数据库查询
        //fansService.queryDoIFollowVloger(myId, vlogerId);
        return GraceJSONResult.ok(StringUtils.isNotBlank(s));
    }


    /**
     * 分页查询用户关注博主
     *
     * @param myId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/queryMyFollows")
    public GraceJSONResult queryMyFollows(@RequestParam String myId,
                                          @RequestParam Integer page,
                                          @RequestParam Integer pageSize){
        return GraceJSONResult.ok(fansService.queryMyFollows(myId, page, pageSize));
    }

    /**
     * 分页查询用户粉丝
     *
     * @param myId 用户Id
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/queryMyFans")
    public GraceJSONResult queryMyFans(@RequestParam String myId,
                                          @RequestParam Integer page,
                                          @RequestParam Integer pageSize){
        return GraceJSONResult.ok(fansService.queryMyFans(myId, page, pageSize));
    }

    /*
     * <判断粉丝是否是我的朋友（互粉互关）>
     *
     * 普通做法：
     * 多表关联+嵌套关联查询，这样会违反多表关联的规范，不可取，高并发下回出现性能问题
     *
     * 常规做法：
     * 1. 避免过多的表关联查询，先查询我的粉丝列表，获得fansList
     * 2. 判断粉丝关注我，并且我也关注粉丝 -> 循环fansList，获得每一个粉丝，再去数据库查询我是否关注他
     * 3. 如果我也关注他（粉丝），说明，我俩互为朋友关系（互关互粉），则标记flag为true，否则false
     *
     * 高端做法：
     * 1. 关注/取关的时候，关联关系保存在redis中，不要依赖数据库
     * 2. 数据库查询后，直接循环查询redis，避免第二次循环查询数据库的尴尬局面
     */

}