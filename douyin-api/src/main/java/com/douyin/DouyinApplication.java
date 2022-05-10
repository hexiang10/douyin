package com.douyin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author: hexiang
 * @date: 2022/5/7
 * @description: douyin-app 项目启动类
 */

@SpringBootApplication
@MapperScan("com.douyin.dao.mapper")
public class DouyinApplication {
    public static void main(String[] args) {
        SpringApplication.run(DouyinApplication.class, args);
    }
}
