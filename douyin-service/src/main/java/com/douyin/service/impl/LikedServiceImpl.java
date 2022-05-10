package com.douyin.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.dao.mapper.LikedMapper;
import com.douyin.model.domain.Liked;
import com.douyin.service.ILikedService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 点赞短视频关联表
 服务实现类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Service
public class LikedServiceImpl extends ServiceImpl<LikedMapper, Liked> implements ILikedService {

}
