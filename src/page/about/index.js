/*
* @Author: Jhin
* @Date:   2019-08-14 21:27:01
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-17 17:45:38
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'about'
        });
    },
    
};
$(function(){
    page.init();
});
