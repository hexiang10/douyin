package com.douyin.mapper.fans;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.douyin.framework.domain.fans.Fans;
import com.douyin.framework.domain.fans.vo.FansVO;
import com.douyin.framework.domain.vlog.vo.VlogerVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

/**
 * <p>
 * 粉丝表

 Mapper 接口
 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@Mapper
public interface FansMapper extends BaseMapper<Fans> {

    /**
     * 分页查询用户关注博主
     * @param paramMap 查询条件
     */
    public IPage<VlogerVO> queryMyFollows(IPage<VlogerVO> page, @Param("paramMap") Map<String, Object> paramMap);

    /**
     * 分页查询用户粉丝
     * @param paramMap 查询条件
     */
    public IPage<FansVO> queryMyFans(IPage<FansVO> page, @Param("paramMap") Map<String, Object> paramMap);

}