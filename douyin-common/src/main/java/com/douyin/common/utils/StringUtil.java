package com.douyin.common.utils;

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
}