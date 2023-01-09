package com.douyin.mapper.user;

import com.douyin.framework.domain.user.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 用户表 Mapper 接口
 * </p>
 *
 * @author hexiang
 * @since 2023-01-07
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
