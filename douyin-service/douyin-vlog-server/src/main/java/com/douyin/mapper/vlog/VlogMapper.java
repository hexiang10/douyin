package com.douyin.mapper.vlog;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.framework.domain.vlog.vo.VlogIndexVO;
import com.douyin.framework.domain.vlog.vo.VlogMyLikedVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 短视频表 Mapper 接口
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
@Mapper
public interface VlogMapper extends BaseMapper<Vlog> {
    /**
     * 分页查询视频信息展示在列表
     * @param paramMap 查询条件集合
     */
    public IPage<VlogIndexVO> getVlogList(IPage<VlogIndexVO> page,@Param("paramMap") Map<String, Object> paramMap);

    /**
     * 根据视频Id查询对应视频详情
     * @param paramMap 查询条件
     */
    public List<VlogIndexVO> getVlogById(@Param("paramMap") Map<String, Object> paramMap);

    /**
     * 分页查询用户喜欢的视频
     * @param paramMap 查询条件集合
     */
    public IPage<VlogMyLikedVO> getMyLikedVlogList(IPage<VlogMyLikedVO> page, @Param("paramMap") Map<String, Object> paramMap);

    /**
     * 分页查询用户关注用户的视频
     * @param paramMap 查询条件集合
     */
    public IPage<VlogIndexVO> getMyFollowVlogList(IPage<VlogIndexVO> page,@Param("paramMap") Map<String, Object> paramMap);

    /**
     * 分页查询用户朋友的视频
     * @param paramMap 查询条件集合
     */
    public IPage<VlogIndexVO> getMyFriendVlogList(IPage<VlogIndexVO> page,@Param("paramMap") Map<String, Object> paramMap);


}