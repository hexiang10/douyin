package com.dubbo.demo.service.impl;

import com.dubbo.demo.domain.Order;
import com.dubbo.demo.mapper.OrderMapper;
import com.dubbo.demo.service.OrderService;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;

@DubboService
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public Order queryOrderById(Long orderId) {
        // 1.查询订单
        return orderMapper.findById(orderId);
    }
}