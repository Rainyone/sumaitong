package com.larva.service;

import java.util.Map;

import org.apache.shiro.authz.SimpleAuthorizationInfo;

import com.larva.model.Account;
import com.larva.vo.Pager;
import com.larva.vo.PagerReqVO;
import com.larva.vo.ResultVO;
import com.larva.vo.TreeNode;
import com.larva.vo.UserChangePasswordVO;
import com.larva.vo.UserCreateVO;
import com.larva.vo.UserEditVO;

/**
 * @author Rainy Wang
 * @time 2016/8/14
 */
public interface IAccountService {

    Account getAccountByAccount(String account);

    SimpleAuthorizationInfo getAccountRolePermission(String accountId);
    
    Pager<Map<String,Object>> getPageUsers(PagerReqVO pagerReqVO,TreeNode tree);

    /*ResultVO selectAccount(int userId, int pageNow, int pageSize);*/

    ResultVO  saveUser(UserCreateVO createVO);
    
    ResultVO  editUser(UserEditVO editVO);

    ResultVO deleteUser(String[] userIds);

    ResultVO updateUserDep(String userId,String depId);

	ResultVO grantRoles(String userId, String[] roleArray);

	ResultVO changePassword(UserChangePasswordVO userChangePasswordVO);
}
