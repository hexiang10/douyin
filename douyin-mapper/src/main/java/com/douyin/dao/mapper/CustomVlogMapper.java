package com.douyin.dao.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.douyin.model.domain.Vlog;
import com.douyin.model.vo.IndexVlogVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 短视频表 Mapper 接口
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */

@Repository
public interface CustomVlogMapper extends BaseMapper<Vlog> {

    List<IndexVlogVO> getIndexVlogList(@Param("paramMap")Map<String,Object> map);

    List<IndexVlogVO> getVlogDetailById(@Param("paramMap")Map<String,Object> map);

}
