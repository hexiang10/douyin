package com.douyin.common.exception;


import com.douyin.common.enums.ResponseStatusEnum;

/**
 * 优雅处理异常，统一封装
 */
public class GraceException {

    public static void display(ResponseStatusEnum responseStatusEnum) {
        throw new MyCustomException(responseStatusEnum);
    }

}