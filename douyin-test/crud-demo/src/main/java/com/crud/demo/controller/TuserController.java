package com.crud.demo.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.crud.demo.domain.Tuser;
import com.crud.demo.service.TuserService;
import com.douyin.common.results.R;
import com.crud.demo.domain.vo.TuserVo;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  用户管理测试控制器
 * </p>
 *
 * @author hexiang
 */
@RestController
@RequestMapping("/mapper/user")
@Tag(name = "测试用户管理",description = "用户管理测试")
public class TuserController {

    @Autowired
    private TuserService tuserService;

    /**
     * 查询所有用户
     */
    @GetMapping("/list")
    public R<List<Tuser>> list() {
        return R.ok("获取数据成功", tuserService.list());
    }

    /**
     * 分页查询用户
     *
     * @param current 当前页码
     * @param limit 一页显示的数据量
     * @param tuserVo 用户视图对象
     */
    @PostMapping("/page/{current}/{limit}")
    public R<Page<Tuser>> findByPage(@PathVariable("current") long current,
                                     @PathVariable("limit") long limit,
                                     @RequestBody(required = false) TuserVo tuserVo) {
        return tuserService.findByPage(current,limit, tuserVo);
    }

    /**
     * 查询单个用户
     *
     * @param id 用户ID
     */
    @GetMapping("/{id}")
    public R<Tuser> findById(@PathVariable Long id) {
        Tuser tuser = tuserService.getById(id);
        if(tuser!=null)
            return R.ok(tuser);
        else
            return R.fail("未查询到此用户");
    }

    /**
     * 新增用户信息
     */
    @PostMapping("/add")
    public R<Void> add(@RequestBody Tuser tuser) {
        int result = tuserService.insert(tuser);
        if(result>0)
            return R.ok();
        else if(result==0)
            return R.fail("用户名称不可用");
        else
            return R.fail();
    }

    /**
     * 修改用户信息
     */
    @PutMapping("/update")
    public R<Void> update(@RequestBody Tuser tuser) {
        if(tuserService.updateById(tuser))
            return R.ok();
        else
            return R.fail();
    }

    /**
     * 删除单个用户
     *
     * @param id 用户id
     */
    @DeleteMapping("/remove/{id}")
    public R<Void> remove(@PathVariable Long id) {
        if(tuserService.removeById(id))
            return R.ok();
        else
            return R.fail();
    }

    /**
     * 批量删除用户
     *
     * @param ids 用户id集合
     */
    @DeleteMapping("/delete")
    public R<Void> delete(@RequestBody List<Long> ids) {
        if(tuserService.removeByIds(ids))
            return R.ok();
        else
            return R.fail();
    }


}