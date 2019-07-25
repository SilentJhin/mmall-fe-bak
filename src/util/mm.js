/*
* @Author: Jhin
* @Date:   2019-07-25 21:29:53
* @Last Modified by:   Jhin
* @Last Modified time: 2019-07-25 22:10:12
*/

var _mm = {
    request : function(param) {
        var _this = this;
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success : function(res){
                // 0 成功
                if(0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 10 未登录
                else if(10 === res.status) {
                    _this.doLogin;
                }
                // 请求数据错误
                else if(1 === res.status) {
                    typeof param.success === 'function' && param.error(res.msg);
                }
            },
            error : function(err){
                typeof param.error === 'function' && param.error(res.msg);
            }
        });
    },
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;