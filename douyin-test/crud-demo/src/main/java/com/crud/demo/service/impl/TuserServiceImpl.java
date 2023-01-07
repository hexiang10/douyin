package com.crud.demo.service.impl;

import cn.hutool.core.lang.UUID;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.crud.demo.domain.Tuser;
import com.crud.demo.mapper.TuserMapper;
import com.crud.demo.service.TuserService;
import com.douyin.common.results.R;
import com.crud.demo.domain.vo.TuserVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <p>
 *  用户服务实现类
 * </p>
 *
 * @author hexiang
 * @since 2022-12-31
 */
@Service
public class TuserServiceImpl extends ServiceImpl<TuserMapper, Tuser> implements TuserService {

    @Autowired
    TuserMapper tuserMapper;

    /**
     * 分页查询
     *
     * @param current 当前页
     * @param limit 一页显示的数据量
     * @param tuserVo 查询对象Vo
     */
    @Override
    public R<Page<Tuser>> findByPage(long current, long limit, TuserVo tuserVo) {
        // 开启分页
        Page<Tuser> pageParam = new Page<>(current,limit);
        // 无条件分页查询所有用户
        if(tuserVo ==null)
            return R.ok(tuserMapper.selectPage(pageParam,null));
        // 条件分页查询所有用户
        String uid = tuserVo.getUid();
        String username = tuserVo.getUsername();
        String phone = tuserVo.getPhone();
        String sex = tuserVo.getSex();
        String state = tuserVo.getState();
        String createTime = tuserVo.getCreateTime();
        String endTime = tuserVo.getEndTime();
        LambdaQueryWrapper<Tuser> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.isNotBlank(uid))
            wrapper.eq(Tuser::getUid,uid);
        if (StringUtils.isNotBlank(username))
            wrapper.eq(Tuser::getUsername,username);
        if (StringUtils.isNotBlank(phone))
            wrapper.eq(Tuser::getPhone,phone);
        if (StringUtils.isNotBlank(sex))
            wrapper.eq(Tuser::getSex,sex);
        if (StringUtils.isNotBlank(state))
            wrapper.eq(Tuser::getState,state);
        if (StringUtils.isNotBlank(createTime))
            wrapper.ge(Tuser::getBirthday,createTime);
        if (StringUtils.isNotBlank(endTime))
            wrapper.le(Tuser::getBirthday,endTime);
        // 返回数据
        return R.ok(tuserMapper.selectPage(pageParam, wrapper));
    }

    /**
     * 新增用户信息补充
     *
     * @param tuser 用户对象
     */
    @Override
    public int insert(Tuser tuser) {
        String uid = "dy" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + UUID.randomUUID().toString().substring(0, 8);
        tuser.setUid(uid);
        if(StringUtils.isNotBlank(tuser.getUsername())){
            LambdaQueryWrapper<Tuser> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(Tuser::getUsername,tuser.getUsername());
            Tuser tuserTemp = tuserMapper.selectOne(wrapper);
            // 用户名不可用，返回
            if(tuserTemp!=null){
                return 0;
            }
        }else {
            tuser.setUsername(uid);
        }
        if(StringUtils.isBlank(tuser.getAvatar())){
            tuser.setAvatar("'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'");
        }
        if(StringUtils.isBlank(tuser.getProfile())){
            tuser.setProfile("暂无简介");
        }
        return tuserMapper.insert(tuser);
    }
}