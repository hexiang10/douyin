package com.douyin.mapper.vlog;

import com.douyin.framework.domain.vlog.MyLikedVlog;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 点赞短视频关联表
 Mapper 接口
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@Mapper
public interface MyLikedVlogMapper extends BaseMapper<MyLikedVlog> {

}
