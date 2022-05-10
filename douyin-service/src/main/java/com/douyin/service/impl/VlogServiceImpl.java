package com.douyin.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.dao.mapper.VlogMapper;
import com.douyin.model.domain.Vlog;
import com.douyin.service.IVlogService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 短视频表 服务实现类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
@Service
public class VlogServiceImpl extends ServiceImpl<VlogMapper, Vlog> implements IVlogService {

}
