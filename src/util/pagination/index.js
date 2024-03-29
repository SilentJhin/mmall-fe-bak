/*
* @Author: Jhin
* @Date:   2019-08-07 21:16:05
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-09 11:30:57
*/
require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container : null,
        pageNum : 1,
        pageRange : 3,
        onSelectPage : null
    };
    // 点击事件处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // active,disabled 按钮不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否是合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有一页
    if(this.option.pages <=1){
        return;
    }
    // 渲染分页
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html
Pagination.prototype.getPaginationHtml = function(){
    var html = '',
        option = this.option,
        pageArray = [],
        // 分页显示开始和结束页数
        start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
    // 上一页
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        // 没有前一页，上一页disabled
        disabled : !this.option.hasPreviousPage
    });
    // 数字按钮
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        // 没有前一页，上一页disabled
        disabled : !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray : pageArray,
        pageNum : option.pageNum,
        pages : option.pages
    });
    return html;
};

module.exports = Pagination;