package com.dubbo.demo.mapper;


import com.dubbo.demo.domain.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface UserMapper {
    
    @Select("select * from test_dubbo_user where id = #{id}")
    User findById(@Param("id") Long id);
}