/*
* @Author: Jhin
* @Date:   2019-08-14 12:35:40
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-14 12:49:45
*/

var _mm = require('util/mm.js');
var _payment = {
    // 获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/pay.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    },
    // 查询订单状态
    getPaymentStatus : function(orderNumber, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    },
}

module.exports = _payment;