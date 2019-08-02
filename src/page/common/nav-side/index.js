/*
* @Author: Jhin
* @Date:   2019-07-30 12:49:45
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-02 21:08:47
*/
// 侧边导航 逻辑：渲染
require('./index.css');
var _mm = require('util/mm.js');
// 引入hogan渲染模板
var templateIndex = require('./index.string');
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href : './user-center.html'},
            {name : 'order-list', desc : '我的订单', href : './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href : './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href : './about.html'}
        ]
    },
    init : function(option){
        // 合并option
        $.extend(this.option, option);
        this.renderNav();
    },
    // 渲染导航菜单
    renderNav : function(){
        // 计算active数据
        for(var i = 0, iLength = this.option.navList.length;i < iLength; i++){
            if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        };
        // 渲染List数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // html放入容器
        $('.nav-side').html(navHtml);
    }
};
module.exports = navSide;