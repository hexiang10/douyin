package com.crud.demo.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.crud.demo.domain.Tuser;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author hexiang
 * @since 2022-12-31
 */
@Mapper
public interface TuserMapper extends BaseMapper<Tuser> {

}