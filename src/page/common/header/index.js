/*
* @Author: Jhin
* @Date:   2019-07-29 17:25:52
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-17 12:01:41
*/

// header逻辑：
// 1 在搜索框输入完信息后点击搜索按钮进入list页后 搜索框里的内容是刚才的信息而不是空
//  需要url参数进行回填:使用onload在组建加载时使用util.mm工具获取参数并赋值
// 2 搜索的提交 把keyword作为参数跳转到List页 两种方式：点击搜索按钮或者按回车
require('./index.css');
var _mm = require('util/mm.js');
var header = {
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            // #search-input:搜索框ID
            $('#search-input').val(keyword);
        };
    },
    // 绑定事件
    bindEvent : function(){
        var _this = this;
        // 点击搜索按钮后就搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 按回车后搜索提交
        $('#search-input').keyup(function(e){
            // 回车键keyCode 为 13
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    // 搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 提交时keyword有值就正常跳转到list页面，没有值就跳转到home页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
    }
};

header.init();