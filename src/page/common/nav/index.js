/*
* @Author: Jhin
* @Date:   2019-07-29 15:14:09
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-02 12:13:44
*/

// 导航条 逻辑：1 登录注册/欢迎退出的切换  2 购物车数量
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    // 绑定事件
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            // 成功就隐藏掉not-login,查找兄弟元素login并显示，修改子元素username的文本为username
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function(errMsg){
            // 错误 什么都不做
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            // res就是数量 直接返回
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
};
module.exports = nav.init();