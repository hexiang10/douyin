package com.douyin.service.middleware;

import com.douyin.mo.MessageMO;

import java.util.List;
import java.util.Map;

public interface MsgService {


    /**
     * 创建消息
     * @param fromUserId 从哪个用户来
     * @param toUserId 发送给哪个用户
     * @param type 消息类型
     * @param msgContent 消息内容
     */
    public void createMsg(String fromUserId,
                          String toUserId,
                          Integer type,
                          Map msgContent);

    /**
     * 查询消息列表
     */
    public List<MessageMO> queryList(String toUserId,
                                     Integer page,
                                     Integer pageSize);

}