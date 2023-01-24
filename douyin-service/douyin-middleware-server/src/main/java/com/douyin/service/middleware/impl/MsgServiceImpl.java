package com.douyin.service.middleware.impl;

import com.douyin.common.enums.MessageTypeEnum;
import com.douyin.common.properties.BaseProperties;
import com.douyin.framework.domain.user.User;
import com.douyin.mo.MessageMO;
import com.douyin.repository.message.MessageRepository;
import com.douyin.service.middleware.MsgService;
import com.douyin.service.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@DubboService
public class MsgServiceImpl extends BaseProperties implements MsgService {

    @Autowired
    MessageRepository messageRepository;

    @DubboReference
    UserService userService;

    /**
     * 创建消息
     *
     * @param fromUserId 从哪个用户来
     * @param toUserId   发送给哪个用户
     * @param type       消息类型
     * @param msgContent 消息内容
     */
    @Override
    public void createMsg(String fromUserId, String toUserId, Integer type, Map msgContent) {

        User fromUser = userService.getUser(fromUserId);

        MessageMO messageMO = new MessageMO();
        messageMO.setFromUserId(fromUserId);
        messageMO.setFromNickname(fromUser.getNickname());
        messageMO.setFromFace(fromUser.getFace());
        messageMO.setToUserId(toUserId);
        messageMO.setMsgType(type);
        messageMO.setCreateTime(new Date());
        if(msgContent!=null){
            messageMO.setMsgContent(msgContent);
        }
        messageRepository.save(messageMO);
    }

    /**
     * 分页查询消息列表
     *
     * @param toUserId 接受方
     * @param page 当前页
     * @param pageSize 页数大小
     */
    @Override
    public List<MessageMO> queryList(String toUserId, Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC,"createTime");
        List<MessageMO> messageMOList = messageRepository.findAllByToUserIdEqualsOrderByCreateTimeDesc(toUserId, pageable);
        for (MessageMO messageMO : messageMOList) {
            // 如果类型是关注消息，则需要查询我之前有没有关注过他，用于在前端标记“互粉”，“互关”
            if(messageMO.getMsgType()!=null&&messageMO.getMsgType()== MessageTypeEnum.FOLLOW_YOU.type){
                Map msgContent = messageMO.getMsgContent();
                if(msgContent==null){
                    msgContent = new HashMap();
                }
                String relationship = redis.get(REDIS_FANS_AND_VLOGGER_RELATIONSHIP + ":" + messageMO.getToUserId() + ":" + messageMO.getFromUserId());
                if(StringUtils.isNotBlank(relationship)&&relationship.equalsIgnoreCase("1")){
                    msgContent.put("isFriend",true);
                }else{
                    msgContent.put("isFriend",false);
                }
                messageMO.setMsgContent(msgContent);
            }
        }
        return messageMOList;
    }
}