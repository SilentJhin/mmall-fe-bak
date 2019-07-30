/*
* @Author: Jhin
* @Date:   2019-07-30 17:35:02
* @Last Modified by:   Jhin
* @Last Modified time: 2019-07-30 18:05:56
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
// 结果页逻辑： 根据type选择显示不同的元素
$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})
