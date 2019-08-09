/*
* @Author: Jhin
* @Date:   2019-08-07 18:28:44
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-09 20:50:34
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 没有商品id就返回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 缩略图片预览 鼠标移动到缩略图 大图就显示缩略图
        $(document).on('mouseenter', '.p-img-item', function(){
            // 获取光标上的缩略图地址
            var imageUrl = $(this).find('.p-img').attr('src');
            // 把大图的img.src地址设为缩略图地址
            $('.main-img').attr('src', imageUrl);
        });
        // 数量加减号
        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                // input 输入框
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                // 数量最大值是产品库存
                maxCount = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId : _this.data.productId,
                count : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情数据 
    loadDetail : function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存res
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">商品未找到</p>');
        });
    },
    // 产品信息中的subImages是由逗号分割组成的字符串 渲染之前需要把字符串转为数组
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})