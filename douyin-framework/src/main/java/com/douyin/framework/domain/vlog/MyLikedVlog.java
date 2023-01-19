package com.douyin.framework.domain.vlog;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * <p>
 * 点赞短视频关联表

 * </p>
 *
 * @author hexiang
 * @since 2023-01-18
 */
@Data
@TableName("dy_my_liked_vlog")
public class MyLikedVlog{

    private static final long serialVersionUID = 1L;

    @TableId("id")
    private String id;

    /**
     * 用户id
     */
    @TableField("user_id")
    private String userId;

    /**
     * 喜欢的短视频id
     */
    @TableField("vlog_id")
    private String vlogId;


}