/*
* @Author: Jhin
* @Date:   2019-07-29 16:21:38
* @Last Modified by:   Jhin
* @Last Modified time: 2019-07-30 13:46:46
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
    }
}

module.exports = _cart;