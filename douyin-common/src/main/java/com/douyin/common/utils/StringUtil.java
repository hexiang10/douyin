package com.douyin.common.utils;

import cn.hutool.core.lang.UUID;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Title: 字符串 工具类
 * @author hexiang
 */

public class StringUtil {

    /**
     * 判断是否为正确的手机号
     * @param mobile 手机号
     * @return isPhoneNumber
     */
     public static boolean isPhoneNumber(String mobile){
         return mobile.matches("^[1][3,4,5,7,8,9][0-9]{9}$");
     }

    /**
     * 生成自定义UUid
     *
     * @param prefix 前缀
     * @param length 长度
     * @return 自定义UUid
     */
     public static String getCustomUUid(String prefix, int length){
         if(length>16) length = 16;
         return  prefix + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + UUID.randomUUID().toString().substring(0, length);

     }

    /**
     * 生成当前时间搓字符
     */
    public static String getCurrentTimeStr(){

        return  new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

    }
}