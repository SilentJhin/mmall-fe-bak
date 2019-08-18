/*
* @Author: Jhin
* @Date:   2019-07-25 12:59:41
* @Last Modified by:   Jhin
* @Last Modified time: 2019-08-17 14:22:32
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// console.log(WEBPACK_ENV);

// 使用HtmlWebpackPlugin做html模板 模板可能有很多
// HtmlWebpackPlugin根据此方法来获取模板参数 
var getHtmlConfig = function (name, title) {
    return {
        // 原始模板
        template : './src/view/' + name + '.html',
        // 目标文件位置 以output下的Path作为路径
        filename : 'view/' + name + '.html',
        favicon : './favicon.ico',
        title : title,
        inject : true,
        hash : true,
        // 把entry中的common 和 name 作为模板 
        // 模板也有通用模块common
        chunks : ['common',name]
    };
};

// webpack config
var config = {
    // 入口文件
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'list' : ['./src/page/list/index.js'],
        'detail' : ['./src/page/detail/index.js'],
        'cart' : ['./src/page/cart/index.js'],
        'order-confirm' : ['./src/page/order-confirm/index.js'],
        'order-list' : ['./src/page/order-list/index.js'],
        'order-detail' : ['./src/page/order-detail/index.js'],
        'payment' : ['./src/page/payment/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
        'result' : ['./src/page/result/index.js'],
        'about' : ['./src/page/about/index.js'],
    },
    // 目标文件
    output: {
        // 存放路径
        path : __dirname + '/dist/',
        // 访问路径
        publicPath : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        filename : 'js/[name].js'
    },
    // 外部依赖声明
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            // 检测到以css结尾的文件用loader: 
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }, // 单独打包出CSS
            // 图片处理 图片过大就放到resource文件夹里
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' }, 
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    resolve : {
        // 别名
        alias : {
            // __dirname变量 当前根目录
            node_modules : __dirname + '/node_modules',
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),

        // new CleanWebpackPlugin(),
    ],
    // 解决charles拿不到localhost的包
    // devServer: {
    //     port: 8088,
    //     inline: true,
    //     proxy : {
    //         '**/*.do' : {
    //             target: 'http://test.happymmall.com',
    //             changeOrigin : true
    //         }
    //     }
    // },
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    },
};
// webpack-dev-server 前端开发服务器 启动后在文件改变时自动刷新服务器
// 这样在谷歌浏览器里调试时就不用手动刷新
// if('dev' === WEBPACK_ENV) {
//     config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
// }

module.exports = config;