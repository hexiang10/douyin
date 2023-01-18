package com.douyin.framework.utils;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.douyin.common.results.PagedGridResult;

public class IPageUtil {

    /**
     * 对分页结果进行包装
     * @param list 分页对象
     * @param page 当前页
     */
    public static PagedGridResult setterPagedGrid(IPage<?> list,
                                                  Integer page) {
        PagedGridResult gridResult = new PagedGridResult();
        gridResult.setRows(list.getRecords());
        gridResult.setPage(page);
        gridResult.setRecords(list.getTotal());
        gridResult.setTotal(list.getPages());
        return gridResult;
    }


}