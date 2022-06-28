package com.douyin.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.idworker.Sid;
import com.douyin.dao.mapper.CustomVlogMapper;
import com.douyin.dao.mapper.VlogMapper;
import com.douyin.model.bo.VlogBo;
import com.douyin.model.domain.Vlog;
import com.douyin.model.vo.IndexVlogVO;
import com.douyin.service.IVlogService;
import com.github.pagehelper.PageHelper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private Sid sid;

    @Autowired
    private VlogMapper vlogMapper;

    @Autowired
    private CustomVlogMapper customVlogMapper;

    @Override
    @Transactional
    public void createVlog(VlogBo vlogBo) {
        /*
        * @Author: 何翔
        * @Description: 创建视频对象信息，返回视频对象数据
        * @DateTime: 2022/6/16 0:02
        * @Params: [vlogBo]
        * @Return com.douyin.model.domain.Vlog
        */
        String sid = this.sid.nextShort();
        Vlog vlog = new Vlog();
        BeanUtils.copyProperties(vlogBo,vlog);
        vlog.setId(sid);
        vlog.setLikeCounts(0);
        vlog.setCommentsCounts(0);
        vlog.setIsPrivate(YesOrNo.NO.type);
        vlog.setCreatedTime(new Date());
        vlog.setUpdatedTime(new Date());
        vlogMapper.insert(vlog);
    }

    @Override
    public List<IndexVlogVO> getIndexVlogList(String search,Integer page,Integer pageSize) {
        /*
        * @Author: 何翔
        * @Description: 分页查询视频信息，展示在首页
        * @DateTime: 2022/6/20 1:02
        * @Params: [search, page, pageSize]
        * @Return java.util.List<com.douyin.model.vo.IndexVlogVO>
        */
        PageHelper.startPage(page,pageSize);
        Map<String, Object> map = new HashMap<>();
        if(StringUtils.isNotBlank(search)){
            map.put("search",search);
        }

        return customVlogMapper.getIndexVlogList(map);
    }

    @Override
    public IndexVlogVO getVlogDetailById(String vlogId) {
        /*
        * @Author: 何翔
        * @Description: 根据视频主键查询视频详情信息
        * @DateTime: 2022/6/20 1:02
        * @Params: [vlogId]
        * @Return com.douyin.model.vo.IndexVlogVO
        */
        Map<String, Object> map = new HashMap<>();
        map.put("vlogId",vlogId);
        List<IndexVlogVO> vlogDetailList = customVlogMapper.getVlogDetailById(map);
        if(vlogDetailList!=null&&vlogDetailList.size()>0&&!vlogDetailList.isEmpty()){
            return vlogDetailList.get(0);
        }
        return null;
    }
}
