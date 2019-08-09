/*
* @Author: Jhin
* @Date:   2019-07-25 12:53:25
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-07 17:40:14
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./index.string');
var _mm = require('util/mm.js');

$(function() {
    // 渲染banner html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化 banner
    var $slider = $('.banner').unslider({
        dots: true,
    });
    // 事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});

 
 