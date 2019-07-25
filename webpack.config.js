/*
* @Author: Jhin
* @Date:   2019-07-25 12:59:41
* @Last Modified by:   Jhin
* @Last Modified time: 2019-07-25 23:04:13
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 使用HtmlWebpackPlugin做html模板 模板可能有很多
// HtmlWebpackPlugin根据此方法来获取模板参数 
var getHtmlConfig = function (name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject : true,
        hash : true,
        chunks : ['common',name]
    };
};
// webpack config
var config = {
    // 入口文件
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    // 目标文件
    output: {
        path: './dist', // 存放路径
        publicPath : '/dist',//访问路径
        filename: 'js/[name].js'
    },
    // 外部依赖声明
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }, // 单独打包出CSS
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' } // 图片处理 图片过大就放到resource文件夹里
        ]
    },
    
    resolve : {
        // 别名
        alias : {
            // __dirname 绝对路径
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image'
        }
    }, 
    // 插件
    plugins : [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // css单独打包
        new ExtractTextPlugin("css/[name].css"),
        // html模板
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};
// webpack-dev-server 前端开发服务器 启动后在文件改变时自动刷新服务器
// 这样在谷歌浏览器里调试时就不用按crtl+R手动刷新啦
if('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;