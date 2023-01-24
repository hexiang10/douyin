package com.douyin.service.middleware.impl;

import com.douyin.common.enums.MessageEnum;
import com.douyin.common.properties.BaseProperties;
import com.douyin.common.utils.JsonUtils;
import com.douyin.config.middleware.RabbitMQConfig;
import com.douyin.framework.domain.comment.Comment;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.mo.MessageMO;
import com.douyin.service.comment.CommentService;
import com.douyin.service.middleware.MessageService;
import com.douyin.service.vlog.VlogService;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

@DubboService
public class MessageServiceImpl extends BaseProperties implements MessageService {

    @Autowired
    RabbitTemplate rabbitTemplate;

    @DubboReference
    VlogService vlogService;

    @DubboReference
    CommentService commentService;


    /**
     * 系统消息：点赞短视频
     *
     * @param userId   用户Id
     * @param vlogId   视频作者Id
     */
    @Override
    public void sentMyLikedVlogMessage(String userId, String vlogId) {
        Vlog vlog = vlogService.getById(vlogId);
        Map msgContent = new HashMap();
        msgContent.put("vlogId", vlogId);
        msgContent.put("vlogCover", vlog.getCover());
        MessageMO messageMO = new MessageMO();
        messageMO.setFromUserId(userId);
        messageMO.setToUserId(vlog.getVlogerId());
        messageMO.setMsgContent(msgContent);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_MSG,
                "sys.msg." + MessageEnum.LIKE_VLOG.enValue,
                JsonUtils.objectToJson(messageMO));
    }

    /**
     * 系统消息：点赞评论
     *
     * @param userId    用户Id
     * @param commentId 评论者Id
     */
    @Override
    public void sentLikeCommentMessage(String userId, String commentId) {
        // 系统消息：点赞评论
        Comment comment = commentService.getById(commentId);
        Vlog vlog = vlogService.getById(comment.getVlogId());
        Map msgContent = new HashMap();
        msgContent.put("vlogId", vlog.getId());
        msgContent.put("vlogCover", vlog.getCover());
        msgContent.put("commentId", commentId);
        MessageMO messageMO = new MessageMO();
        messageMO.setFromUserId(userId);
        messageMO.setToUserId(comment.getCommentUserId());
        messageMO.setMsgContent(msgContent);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_MSG,
                "sys.msg." + MessageEnum.LIKE_COMMENT.enValue,
                JsonUtils.objectToJson(messageMO));
    }

    /**
     * 系统消息：评论/回复
     *
     * @param comment 评论对象
     */
    @Override
    public void sentCommentMessage(Comment comment) {
        Vlog vlog = vlogService.getById(comment.getVlogId());
        Map msgContent = new HashMap();
        msgContent.put("vlogId", vlog.getId());
        msgContent.put("vlogCover", vlog.getCover());
        msgContent.put("commentId", comment.getId());
        msgContent.put("commentContent", comment.getContent());
        Integer type = MessageEnum.COMMENT_VLOG.type;
        String routeType = MessageEnum.COMMENT_VLOG.enValue;
        if (StringUtils.isNotBlank(comment.getFatherCommentId()) &&
                !comment.getFatherCommentId().equalsIgnoreCase("0") ) {
            type = MessageEnum.REPLY_YOU.type;
            routeType = MessageEnum.REPLY_YOU.enValue;
        }
        // MQ异步解耦
        MessageMO messageMO = new MessageMO();
        messageMO.setFromUserId(comment.getCommentUserId());
        messageMO.setToUserId(comment.getVlogerId());
        messageMO.setMsgContent(msgContent);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_MSG,
                "sys.msg." + routeType,
                JsonUtils.objectToJson(messageMO));
    }

    /**
     * 系统消息：关注
     *
     * @param myId     用户Id
     * @param vlogerId 被关注视频博主Id
     */
    @Override
    public void sentFollowMessage(String myId, String vlogerId) {
        MessageMO messageMO = new MessageMO();
        messageMO.setFromUserId(myId);
        messageMO.setToUserId(vlogerId);
        // 优化：使用mq异步解耦
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_MSG,
                "sys.msg." + MessageEnum.FOLLOW_YOU.enValue,
                JsonUtils.objectToJson(messageMO));
    }
}