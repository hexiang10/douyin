package com.dubbo.demo.controller;

import com.dubbo.demo.domain.Order;
import com.dubbo.demo.domain.User;
import com.dubbo.demo.service.OrderService;
import com.dubbo.demo.service.UserService;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @DubboReference
    UserService userService;

    @GetMapping("{orderId}")
    public Order queryOrderByUserId(@PathVariable("orderId") Long orderId) {
        // 1、根据id查询订单
        Order order = orderService.queryOrderById(orderId);
        // 2、获取订单的用户id
        Long userId = order.getUserId();
        // 3、根据用户id，调用dubbo服务查询用户
        User user = userService.queryById(userId);
        order.setUser(user);
        return order;
    }
}