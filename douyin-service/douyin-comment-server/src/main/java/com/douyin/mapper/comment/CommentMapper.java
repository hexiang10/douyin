package com.douyin.mapper.comment;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.douyin.framework.domain.comment.Comment;
import com.douyin.framework.domain.comment.vo.CommentVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

/**
 * <p>
 * 评论表 Mapper 接口
 * </p>
 *
 * @author hexiang
 * @since 2023-01-20
 */
@Mapper
public interface CommentMapper extends BaseMapper<Comment> {

    /**
     * 分页查询用户朋友的视频
     * @param paramMap 查询条件集合
     */
    public IPage<CommentVO> getCommentList(IPage<CommentVO> page, @Param("paramMap") Map<String, Object> paramMap);


}