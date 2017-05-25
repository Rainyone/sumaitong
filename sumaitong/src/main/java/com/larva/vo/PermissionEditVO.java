package com.larva.vo;

import javax.validation.constraints.NotNull;

/**
 * Created by sxjun on 15-8-31.
 */
public class PermissionEditVO {
    @NotNull(message = "权限id不能为空")
    private String id;
    @NotNull(message = "父级权限不能为空")
    private String parentId;
    @NotNull(message = "权限名字不能为空")
    private String name;
    @NotNull(message = "权限键值不能为空")
    private String key;
    @NotNull(message = "权限排序不能为空")
    private Integer order;

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
