package com.larva.dao.impl;

import org.springframework.stereotype.Repository;

import com.larva.dao.ILoginLogDao;
import com.larva.model.LoginLog;
import com.mini.core.PageResult;
import com.mini.core.dao.MiniDao;

@Repository("loginLogDao")
public class LoginLogDaoImpl extends MiniDao implements ILoginLogDao {

    /**
     * 查询登录日志
     * @param pageNow
     * @param count
     * @return
     */
    @Override
    public PageResult<LoginLog> query(int pageNow, int count) {
        return this.paginateResult("SELECT * FROM login_log ORDER BY login_time DESC", pageNow, count, LoginLog.class);
    }

	@Override
	public int insertLoginLog(LoginLog loginLog) {
		return this.insert(loginLog);
	}
}
