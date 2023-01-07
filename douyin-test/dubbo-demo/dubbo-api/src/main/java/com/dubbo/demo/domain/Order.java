package com.dubbo.demo.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class Order implements Serializable {
    private Long id;
    private Long price;
    private String name;
    private Integer num;
    private Long userId;
    private User user;
}