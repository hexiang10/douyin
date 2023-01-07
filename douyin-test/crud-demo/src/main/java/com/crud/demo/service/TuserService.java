package com.crud.demo.service;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.crud.demo.domain.Tuser;
import com.douyin.common.results.R;
import com.crud.demo.domain.vo.TuserVo;

/**
 * <p>
 *  测试用户服务类
 * </p>
 *
 * @author hexiang
 * @since 2022-12-31
 */
public interface TuserService extends IService<Tuser> {

    /**
     * 分页查询
     */
    public R<Page<Tuser>> findByPage(long current, long limit, TuserVo tuserVo) ;

    /**
     * 新增用户信息补充
     */
    public int insert(Tuser tuser) ;

}