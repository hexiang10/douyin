package com.dubbo.demo.mapper;


import com.dubbo.demo.domain.Order;
import org.apache.ibatis.annotations.Select;

public interface OrderMapper {

    @Select("select * from test_dubbo_order where id = #{id}")
    Order findById(Long id);
}