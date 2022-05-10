package com.douyin.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.dao.mapper.FansMapper;
import com.douyin.model.domain.Fans;
import com.douyin.service.IFansService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 粉丝表

 服务实现类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Service
public class FansServiceImpl extends ServiceImpl<FansMapper, Fans> implements IFansService {

}
