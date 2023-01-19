package com.douyin.framework.domain.fans;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * <p>
 * 粉丝表


 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@Data
@TableName("dy_fans")
public class Fans {

    private static final long serialVersionUID = 1L;

    @TableId("id")
    private String id;

    /**
     * 作家用户id
     */
    @TableField("vloger_id")
    private String vlogerId;

    /**
     * 粉丝用户id
     */
    @TableField("fan_id")
    private String fanId;

    /**
     * 粉丝是否是vloger的朋友，如果成为朋友，则本表的双方此字段都需要设置为1，如果有一人取关，则两边都需要设置为0
     */
    @TableField("is_fan_friend_of_mine")
    private Integer isFanFriendOfMine;


}