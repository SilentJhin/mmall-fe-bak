/*
* @Author: Jhin
* @Date:   2019-07-29 16:21:38
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-09 20:50:23
*/
var _mm = require('util/mm.js');
var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/add.do'),
            data : productInfo,
            success : resolve,
            error : reject
        });
    },
}

module.exports = _cart;