/*
* @Author: Jhin
* @Date:   2019-08-11 12:50:52
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-14 11:55:35
*/

var _mm = require('util/mm.js');
var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/create.do'),
            data : orderInfo,
            success : resolve,
            error : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/list.do'),
            data : listParam,
            success : resolve,
            error : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/detail.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _order;