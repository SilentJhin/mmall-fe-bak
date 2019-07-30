/*
* @Author: Jhin
* @Date:   2019-07-29 15:48:09
* @Last Modified by:   Jhin
* @Last Modified time: 2019-07-29 16:17:16
*/
var _mm = require('util/mm.js');
var _user = {
    // 检查登录信息 成功:resolve  失败:reject
    checkLogin : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 登出 成功:resolve  失败:reject
    logout : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
}

module.exports = _user;