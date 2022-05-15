package com.douyin.common.exceptions;


import com.douyin.common.result.GraceJSONResult;
import com.douyin.common.result.ResponseStatusEnum;
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
public class GraceExceptionHandler {

    @ExceptionHandler(MyCustomException.class)
    @ResponseBody
    public GraceJSONResult returnMyException(MyCustomException e) {
        /*
        * @Author: 何翔
        * @Description: 自定义异常处理
        * @DateTime: 2022/5/11 0:12
        * @Params: [e]
        * @Return com.douyin.common.result.GraceJSONResult
        */
        e.printStackTrace();
        return GraceJSONResult.exception(e.getResponseStatusEnum());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public GraceJSONResult returnMethodArgumentNotValid(MethodArgumentNotValidException e) {
        /*
        * @Author: 何翔
        * @Description: 方法参数校验异常处理
        * @DateTime: 2022/5/11 0:12
        * @Params: [e]
        * @Return com.douyin.common.result.GraceJSONResult
        */
        BindingResult result = e.getBindingResult();
        return GraceJSONResult.errorMap(getErrors(result));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    @ResponseBody
    public GraceJSONResult returnMaxUploadSize(MaxUploadSizeExceededException e) {
        /*
        * @Author: 何翔
        * @Description: 文件上传异常处理
        * @DateTime: 2022/5/15 21:09
        * @Params: [e]
        * @Return com.douyin.common.result.GraceJSONResult
        */
        //e.printStackTrace();
        return GraceJSONResult.errorCustom(ResponseStatusEnum.FILE_MAX_SIZE_2MB_ERROR);
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
