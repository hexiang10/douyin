package com.douyin.service.impl;



import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.dao.mapper.CommentMapper;
import com.douyin.model.domain.Comment;
import com.douyin.service.ICommentService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 评论表 服务实现类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements ICommentService {

}
