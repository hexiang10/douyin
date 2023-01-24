package com.douyin.controller.comment;

import com.douyin.common.properties.BaseProperties;
import com.douyin.common.results.GraceJSONResult;
import com.douyin.framework.domain.comment.bo.CommentBO;
import com.douyin.service.comment.CommentService;
import com.douyin.service.middleware.MessageService;
import com.douyin.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * <p>
 * 评论表 前端控制器
 * </p>
 *
 * @author hexiang
 * @since 2023-01-20
 */
@RestController
@Slf4j
@RequestMapping("/comment")
@Tag(name = "评论业务模块",description = "CommentController")
public class CommentController extends BaseProperties {

    @Autowired
    CommentService commentService;

    @DubboReference
    UserService userService;

    @DubboReference
    MessageService messageService;

    /**
     * 发表评论
     *
     * @param commentBO 评论数据层对象
     */
    @PostMapping("/create")
    public GraceJSONResult createComment(@Valid @RequestBody CommentBO commentBO){
        if(!commentBO.getFatherCommentId().equalsIgnoreCase("0")&&commentService.getById(commentBO.getFatherCommentId())==null){
            return GraceJSONResult.errorMsg("评论对象内容不存在");
        }
        // 判断两个id对应的用户是否存在
        if(userService.getUser(commentBO.getCommentUserId())==null||userService.getUser(commentBO.getVlogerId()) ==null){
            return GraceJSONResult.errorMsg("评论用户不存在");
        }
        return GraceJSONResult.ok(commentService.createComment(commentBO));
    }

    /**
     * 获取评论条数
     *
     * @param vlogId 作者id
     */
    @GetMapping("/counts")
    public GraceJSONResult counts(@RequestParam String vlogId){
        String countsStr = redis.get(REDIS_VLOG_COMMENT_COUNTS + ":" + vlogId);
        if(StringUtils.isBlank(countsStr)){
            countsStr = "0";
        }
        return GraceJSONResult.ok(Integer.valueOf(countsStr));
    }

    /**
     * 分页查询视频评论
     *
     * @param vlogId   视频Id
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @GetMapping("/list")
    public GraceJSONResult list(@RequestParam String vlogId,
                                @RequestParam(defaultValue = "") String userId,
                                @RequestParam Integer page,
                                @RequestParam Integer pageSize){
        return GraceJSONResult.ok(commentService.getCommentList(vlogId, userId, page, pageSize));
    }

    /**
     * 删除视频下的某条评论
     *
     * @param commentUserId 评论用户
     * @param commentId     被评论者
     * @param vlogId        评论视频
     */
    @DeleteMapping("/delete")
    public GraceJSONResult delete(@RequestParam String commentUserId,
                                  @RequestParam String commentId,
                                  @RequestParam String vlogId){
        commentService.deleteComment(commentUserId, commentId, vlogId);
        return GraceJSONResult.ok();
    }

    /**
     * 点赞评论
     *
     * @param userId 用户Id
     * @param commentId 评论者Id
     */
    @PostMapping("/like")
    public GraceJSONResult like(@RequestParam String userId,
                                @RequestParam String commentId){
        // 注意bigkey问题
        redis.incrementHash(REDIS_VLOG_COMMENT_LIKED_COUNTS,commentId,1);
        redis.setHashValue(REDIS_USER_LIKE_COMMENT,userId+":"+commentId,"1");

        // 系统消息：点赞评论 —— V1
        //Map msgContent = new HashMap();
        //Comment comment = commentService.getById(commentId);
        //Vlog vlog = vlogService.getById(comment.getVlogId());
        //msgContent.put("commentId",commentId);
        //msgContent.put("vlogId", vlog.getId());
        //msgContent.put("vlogCover", vlog.getCover());
        //msgService.createMsg(userId,
        //        comment.getCommentUserId(),
        //        MessageTypeEnum.LIKE_COMMENT.type, msgContent);

        // 系统消息：点赞评论 ——V2
        //Comment comment = commentService.getById(commentId);
        //Vlog vlog = vlogService.getById(comment.getVlogId());
        //Map msgContent = new HashMap();
        //msgContent.put("vlogId", vlog.getId());
        //msgContent.put("vlogCover", vlog.getCover());
        //msgContent.put("commentId", commentId);
//        msgService.createMsg(userId,
//                            comment.getCommentUserId(),
//                            MessageEnum.LIKE_COMMENT.type,
//                            msgContent);

        // MQ异步解耦
        //MessageMO messageMO = new MessageMO();
        //messageMO.setFromUserId(userId);
        //messageMO.setToUserId(comment.getCommentUserId());
        //messageMO.setMsgContent(msgContent);
        //rabbitTemplate.convertAndSend(
        //        RabbitMQConfig.EXCHANGE_MSG,
        //        "sys.msg." + MessageEnum.LIKE_COMMENT.enValue,
        //        JsonUtils.objectToJson(messageMO));

        messageService.sentLikeCommentMessage(userId,commentId);

        return GraceJSONResult.ok();
    }

    /**
     * 取消点赞评论
     *
     * @param userId 用户Id
     * @param commentId 评论者Id
     */
    @PostMapping("/unlike")
    public GraceJSONResult unlike(@RequestParam String userId,
                                @RequestParam String commentId){
        // 注意bigkey问题
        redis.decrementHash(REDIS_VLOG_COMMENT_LIKED_COUNTS,commentId,1);
        redis.hdel(REDIS_USER_LIKE_COMMENT,userId+":"+commentId);
        return GraceJSONResult.ok();
    }

}