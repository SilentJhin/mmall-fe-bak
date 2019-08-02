/*
* @Author: Jhin
* @Date:   2019-08-01 14:39:15
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-01 21:20:07
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

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
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this; // _this是page对象
        // 用户注册时输入用户名后 光标离开文本框就判定用户名是否冲突
        // blur : 失去焦点时触发
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            // 如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            // 异步验证
            _user.checkUsername(username, function(){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });

        // 注册按钮点击事件绑定
        $('#submit').click(function(){
            _this.submit();
        });
        // 按下回车，也会提交
        $('.user-content').keyup(function(e){
            // 回车键keyCode是 13
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        // 封装用户名，密码表单值
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
            
        },
        // formValidate方法验证表单数据，结果赋值给validateResult
        validateResult = this.formValidate(formData);
        // 对validateResult进行判定 成功就提交 失败就错误提示
        if(validateResult.status){
            // 提交
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        // 验证失败
        }else{
            // 错误提示
            formError.show(validateResult.msg);
        }
    },
    // 验证上面封装的用户名，密码值
    formValidate : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        // Validate 是jQuery的一个验证表单的插件
        // 这里用的是我们封装在mm.js里的validate字段验证 
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6){
            result.msg = '密码不能小于六位';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = 'email格式不正确';
            return result;
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示答案不能为空';
            return result;
        }
        // 程序走到这 说明通过了验证 返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    } 
};
$(function(){
    page.init();
});