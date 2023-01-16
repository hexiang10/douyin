package com.douyin.framework.handler;


import com.douyin.common.enums.ResponseStatusEnum;
import com.douyin.common.exception.MyCustomException;
import com.douyin.common.results.GraceJSONResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 统一异常拦截处理
 * 可以针对异常的类型进行捕获，然后返回json信息到前端
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * @author: 何翔
     * @description: 自定义异常处理
     * @param e 自定义异常
     * @return com.douyin.common.results.GraceJSONResult
     */
    @ExceptionHandler(MyCustomException.class)
    @ResponseBody
    public GraceJSONResult returnMyException(MyCustomException e) {
        //e.printStackTrace();
        return GraceJSONResult.exception(e.getResponseStatusEnum());
    }

    /**
     * @author: 何翔
     * @description: 方法参数校验异常处理
     * @param e 方法参数校验异常
     * @return com.douyin.common.results.GraceJSONResult
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public GraceJSONResult returnMethodArgumentNotValid(MethodArgumentNotValidException e) {
        return GraceJSONResult.errorMap(getErrors(e.getBindingResult()));
    }

    /**
     * @author: 何翔
     * @Description: 文件上传异常处理
     * @param  e 文件上传异常
     * @return com.douyin.common.results.GraceJSONResult
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    @ResponseBody
    public GraceJSONResult returnMaxUploadSize(MaxUploadSizeExceededException e) {
        e.printStackTrace();
        return GraceJSONResult.errorCustom(ResponseStatusEnum.FILE_MAX_SIZE_1G_ERROR);
    }

    public Map<String, Object> getErrors(BindingResult bindingResult ) {
        Map<String, Object> map = new HashMap<>();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            map.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return map;
    }
}