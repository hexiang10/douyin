package com.douyin.common.exceptions;


import com.douyin.common.result.ResponseStatusEnum;

/**
 * 优雅的处理异常，统一封装
 */
public class GraceException {

    public static void display(ResponseStatusEnum responseStatusEnum) {
        throw new MyCustomException(responseStatusEnum);
    }

}
