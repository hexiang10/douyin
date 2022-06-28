package com.douyin.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.douyin.model.bo.VlogBo;
import com.douyin.model.domain.Vlog;
import com.douyin.model.vo.IndexVlogVO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 短视频表 服务类
 * </p>
 *
 * @author 何翔
 * @since 2022-05-08
 */
public interface IVlogService extends IService<Vlog> {

    /*
      创建视频对象信息，返回视频对象数据
     */
    void createVlog(VlogBo vlogBo);

    /*
      查询视频列表信息
     */
    List<IndexVlogVO> getIndexVlogList(String search,Integer page,Integer pageSize);

    /*
      根据视频主键查询视频详情信息
     */
    IndexVlogVO getVlogDetailById(String vlogId);

}
