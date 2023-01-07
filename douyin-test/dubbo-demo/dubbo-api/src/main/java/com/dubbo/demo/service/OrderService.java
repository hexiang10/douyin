package com.dubbo.demo.service;


import com.dubbo.demo.domain.Order;

public interface OrderService {

    Order queryOrderById(Long orderId);
}