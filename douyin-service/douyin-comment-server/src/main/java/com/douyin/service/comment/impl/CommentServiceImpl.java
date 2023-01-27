package com.douyin.service.comment.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.results.PagedGridResult;
import com.douyin.common.utils.RedisUtil;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.framework.domain.comment.Comment;
import com.douyin.framework.domain.comment.bo.CommentBO;
import com.douyin.framework.domain.comment.vo.CommentVO;
import com.douyin.framework.utils.IPageUtil;
import com.douyin.mapper.comment.CommentMapper;
import com.douyin.service.comment.CommentService;
import com.douyin.service.middleware.MessageService;
import com.douyin.service.vlog.VlogService;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 评论表 服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-20
 */
@DubboService
@RefreshScope
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    Sid sid;

    @Autowired
    RedisUtil redis;

    @DubboReference
    MessageService messageService;

    @DubboReference
    VlogService vlogService;

    @Value("${douyin.vlogCommentCounts}")
    Integer vlogCommentCounts;

    // 短视频的评论总数
    public static final String REDIS_VLOG_COMMENT_COUNTS = "redis_vlog_comment_counts";
    // 短视频的评论喜欢数量
    public static final String REDIS_VLOG_COMMENT_LIKED_COUNTS = "redis_vlog_comment_liked_counts";
    // 用户点赞评论
    public static final String REDIS_USER_LIKE_COMMENT = "redis_user_like_comment";

    /**
     * 发表评论
     *
     * @param commentBO 评论数据层对象
     */
    @Override
    public CommentVO createComment(CommentBO commentBO) {

        Comment comment = new Comment();
        comment.setId(sid.nextShort());
        comment.setVlogId(commentBO.getVlogId());
        comment.setVlogerId(commentBO.getVlogerId());
        comment.setCommentUserId(commentBO.getCommentUserId());
        comment.setFatherCommentId(commentBO.getFatherCommentId());
        comment.setContent(commentBO.getContent());
        comment.setLikeCounts(0);
        comment.setCreatedTime(new Date());
        commentMapper.insert(comment);
        // 评论总数的累加
        redis.increment(REDIS_VLOG_COMMENT_COUNTS+":"+commentBO.getVlogId(), 1);

        // 留言后的最新评论需要返回给前端进行展示
        CommentVO commentVO = new CommentVO();
        BeanUtils.copyProperties(comment,commentVO);

        // 系统消息：评论/回复 —— V1
        //Integer type = MessageTypeEnum.COMMENT_VLOG.type;
        //if(StringUtils.isNotBlank(commentBO.getFatherCommentId())&& !commentBO.getFatherCommentId().equalsIgnoreCase("0")){
        //    type = MessageTypeEnum.REPLY_YOU.type;
        //}
        //Map msgContent = new HashMap();
        //Vlog vlog = vlogService.getById(commentBO.getVlogId());
        //msgContent.put("commentId",comment.getId());
        //msgContent.put("commentContent",commentBO.getContent());
        //msgContent.put("vlogId", commentBO.getVlogId());
        //msgContent.put("vlogCover", vlog.getCover());
        //msgService.createMsg(commentBO.getCommentUserId(),
        //        commentBO.getVlogerId(),
        //        type,msgContent);

        // 系统消息：评论/回复 —— V2
        //Vlog vlog = vlogService.getById(commentBO.getVlogId());
        //Map msgContent = new HashMap();
        //msgContent.put("vlogId", vlog.getId());
        //msgContent.put("vlogCover", vlog.getCover());
        //msgContent.put("commentId", comment.getId());
        //msgContent.put("commentContent", commentBO.getContent());
        //Integer type = MessageEnum.COMMENT_VLOG.type;
        //String routeType = MessageEnum.COMMENT_VLOG.enValue;
        //if (StringUtils.isNotBlank(commentBO.getFatherCommentId()) &&
        //        !commentBO.getFatherCommentId().equalsIgnoreCase("0") ) {
        //    type = MessageEnum.REPLY_YOU.type;
        //    routeType = MessageEnum.REPLY_YOU.enValue;
        //}

//        msgService.createMsg(commentBO.getCommentUserId(),
//                commentBO.getVlogerId(),
//                type,
//                msgContent);

        // MQ异步解耦
        //MessageMO messageMO = new MessageMO();
        //messageMO.setFromUserId(commentBO.getCommentUserId());
        //messageMO.setToUserId(commentBO.getVlogerId());
        //messageMO.setMsgContent(msgContent);
        //rabbitTemplate.convertAndSend(
        //        RabbitMQConfig.EXCHANGE_MSG,
        //        "sys.msg." + routeType,
        //        JsonUtils.objectToJson(messageMO));

        messageService.sentCommentMessage(comment);

        // 评论完毕，获得当前redis中的总数
        // 判断数量是否满足阈值，若超过，则触发入库
        String countsStr = redis.get(REDIS_VLOG_COMMENT_COUNTS + ":" + commentBO.getVlogId());
        Integer counts = 0;
        if (StringUtils.isNotBlank(countsStr)) {
            counts = Integer.valueOf(countsStr);
            if (counts % vlogCommentCounts == 0 && counts != 0) {
                vlogService.flushCounts(commentBO.getVlogId(), counts, 1);
            }
        }

        return commentVO;
    }

    /**
     * 分页查询视频评论
     * @param vlogId   视频Id
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     */
    @Override
    public PagedGridResult getCommentList(String vlogId, String userId, Integer page, Integer pageSize) {
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("vlogId", vlogId);
        IPage<CommentVO> commentPageList = commentMapper.getCommentList(PageDTO.of(page, pageSize), paramMap);
        List<CommentVO> commentVOList = commentPageList.getRecords();
        for (CommentVO commentVO : commentVOList) {
            // 当前短视频的某个评论的点赞总数
            String countsStr = redis.hget(REDIS_VLOG_COMMENT_LIKED_COUNTS, commentVO.getCommentId());
            if(StringUtils.isNotBlank(countsStr)){
                commentVO.setLikeCounts(Integer.valueOf(countsStr));
            }
            // 判断当前用户是否点赞过该评论
            countsStr = redis.hget(REDIS_USER_LIKE_COMMENT,userId+":"+commentVO.getCommentId());
            if(StringUtils.isNotBlank(countsStr)&&countsStr.equalsIgnoreCase("1")){
                commentVO.setIsLike(YesOrNo.YES.type);
            }
        }
        return IPageUtil.setterPagedGrid(commentPageList,page);
    }

    /**
     * 删除视频下的某条评论
     *
     * @param commentUserId 评论用户
     * @param commentId     被评论者
     * @param vlogId        评论视频
     */
    @Override
    public void deleteComment(String commentUserId, String commentId, String vlogId) {
        LambdaQueryWrapper<Comment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Comment::getCommentUserId,commentUserId).eq(Comment::getId,commentId);
        commentMapper.delete(wrapper);
        // 评论总数的累减
        redis.decrement(REDIS_VLOG_COMMENT_COUNTS+":"+vlogId, 1);
    }
}
