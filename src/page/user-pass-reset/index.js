/*
* @Author: Jhin
* @Date:   2019-08-02 12:16:27
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-02 16:18:46
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 忘记密码的重置密码逻辑：
// 首先加载页面1（一个函数显示输入用户名框，把这个函数放在onload里）；用户输入用户名并点击下一步后调用service里方法获取用户提示密码问题，并加载页面2（隐藏一些错误提示和用户名框，显示获取的用户提示密码问题和输入密码提示问题答案框），用户在输入答案后点击下一步调用service里方法checkAnswer进行验证，确认正确后返回有有效时间的Token，显示页面3，用户在输入新密码并点击按钮提交后调用resetPassword验证Token，没问题就持久化新密码


// 表单里错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 处理逻辑

var page = {
    data : {
        username : '',
        question : '',
        answer : '',
        token : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this; // _this是page对象
        // 1 输入用户名下一步的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else {
                formError.show("请输入用户名");
            }
        });
        // 2 输入密码提示问题答案的点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 密码提示问题存在
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer
                }, function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 
            else {
                formError.show("请输入密码提示问题答案");
            }
        });
        // 3 输入新密码的点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 密码提示问题存在
            if(password && password.length >= 6){
                _user.resetPassword({
                    username : _this.data.username,
                    passpordNew : password,
                    forgetToken : _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 
            else {
                formError.show("请输入至少六位的新密码");
            }
        });
    },
    // 1 加载用户名
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 2 加载输入密码提示问题答案
    loadStepQuestion : function(){
        // 隐藏错误信息（如果有的话）和第一步,显示第二步,放入问题
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
                .find('.question').text(this.data.question);
    },
    // 3 加载输入密码
    loadStepPassword : function(){
        // 隐藏错误信息（如果有的话）和第二步,显示第三步
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};
$(function(){
    page.init();
});