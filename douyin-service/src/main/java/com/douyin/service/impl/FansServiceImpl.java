package com.douyin.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.douyin.common.enums.YesOrNo;
import com.douyin.common.idworker.Sid;
import com.douyin.dao.mapper.FansMapper;
import com.douyin.model.domain.Fans;
import com.douyin.service.IFansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    FansMapper fansMapper;

    @Autowired
    private Sid sid;

    @Override
    @Transactional
    public void doFollow(String myId, String VlogerId) {
        /*
        * @Author: 何翔
        * @Description: 粉丝关注
        * @DateTime: 2022/7/6 1:05
        * @Params: [myId, VlogerId]
        * @Return void
        */
        Fans fans = new Fans();
        fans.setId(sid.nextShort());
        fans.setFanId(myId);
        fans.setVlogerId(VlogerId);
        // 判断对方是否关注我，如果关注我，那么双方都要护卫朋友
        Fans vloger = queryFansRelationship(VlogerId, myId);
        if(vloger!=null){
            fans.setIsFanFriendOfMine(YesOrNo.YES.type);
            vloger.setIsFanFriendOfMine(YesOrNo.YES.type);
            fansMapper.updateById(vloger);
        }else {
            fans.setIsFanFriendOfMine(YesOrNo.NO.type);
        }
        fansMapper.insert(fans);

    }

    public Fans queryFansRelationship(String fanId, String vlogerId){
        QueryWrapper<Fans> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("vlogerId",vlogerId).eq("fanId",fanId);
        return fansMapper.selectOne(queryWrapper);

    }
}
