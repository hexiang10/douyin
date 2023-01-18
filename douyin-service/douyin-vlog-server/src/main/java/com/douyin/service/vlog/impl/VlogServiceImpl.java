package com.douyin.service.vlog.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.results.PagedGridResult;
import com.douyin.common.utils.idworker.Sid;
import com.douyin.framework.domain.vlog.Vlog;
import com.douyin.framework.domain.vlog.bo.VlogBo;
import com.douyin.framework.domain.vlog.vo.VlogIndexVO;
import com.douyin.framework.utils.IPageUtil;
import com.douyin.mapper.vlog.VlogMapper;
import com.douyin.service.vlog.VlogService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 短视频表 服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2023-01-17
 */
@Service
public class VlogServiceImpl extends ServiceImpl<VlogMapper, Vlog> implements VlogService {

    @Autowired
    VlogMapper vlogMapper;

    @Autowired
    Sid sid;

    /**
     * 新增volg视频信息
     *
     * @param vlogBo 视频信息对象
     */
    @Override
    @Transactional
    public void createVlog(VlogBo vlogBo) {
        String vlogId = sid.nextShort();
        Vlog vlog = new Vlog();
        BeanUtils.copyProperties(vlogBo,vlog);
        vlog.setId(vlogId);
        vlog.setCommentsCounts(0);
        vlog.setLikeCounts(0);
        vlog.setIsPrivate(YesOrNo.NO.type);
        if(StringUtils.isBlank(vlog.getCover())){
            vlog.setCover("https://img-blog.csdnimg.cn/e9ed66d572754951bc5b4173791d6fce.jpeg");
        }
        if(StringUtils.isBlank(vlog.getTitle())){
            vlog.setTitle("我发布了一条新视频，快来看看吧~");
        }
        vlogMapper.insert(vlog);
    }

    /**
     * 查询首页或搜索的Vlog列表
     *
     * @param search 搜索条件，可以为空
     */
    @Override
    public PagedGridResult getVlogList(String search, Integer page, Integer pageSize) {
        Map<String,Object> paramMap = new HashMap<>();
        if (StringUtils.isNotEmpty(search)) {
            paramMap.put("search", search);
        }
        IPage<VlogIndexVO> vlogPageList = vlogMapper.getVlogList(PageDTO.of(page, pageSize), paramMap);
        return IPageUtil.setterPagedGrid(vlogPageList, page);
    }

    /**
     * 根据视频Id查询对应视频详情
     *
     * @param vlogId 视频Id
     */
    @Override
    public VlogIndexVO getVlogById(String vlogId) {
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("vlogId", vlogId);
        List<VlogIndexVO> vlog = vlogMapper.getVlogById(paramMap);
        if(vlog!=null&&vlog.size()>0){
            return vlog.get(0);
        }

        return null;
    }

    /**
     * 更改视频私密状态
     *
     * @param userId  用户Id
     * @param vlogId  视频Id
     * @param yesOrNo 私密与否
     */
    @Override
    @Transactional
    public void changeToPrivateOrPublic(String userId, String vlogId, Integer yesOrNo) {
        LambdaQueryWrapper<Vlog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Vlog::getVlogerId,userId)
               .eq(Vlog::getId,vlogId);
        Vlog vlog = new Vlog();
        //vlog.setId(vlogId);
        vlog.setIsPrivate(yesOrNo);
        vlogMapper.update(vlog,wrapper);

    }

    /**
     * 查询用户公开/私密的视频列表
     *
     * @param userId   用户Id
     * @param page     当前页
     * @param pageSize 页数大小
     * @param yesOrNo  视频私密类型
     */
    @Override
    public PagedGridResult queryUserVlogList(String userId, Integer page, Integer pageSize, Integer yesOrNo) {
        LambdaQueryWrapper<Vlog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Vlog::getVlogerId,userId)
                .eq(Vlog::getIsPrivate,yesOrNo)
                .orderByDesc(Vlog::getCreatedTime);
        Page<Vlog> vlogPage = vlogMapper.selectPage(new Page<>(page,pageSize), wrapper);
        return IPageUtil.setterPagedGrid(vlogPage, page);
    }
}