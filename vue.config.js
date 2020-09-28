const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// var px2rem = require('postcss-plugin-px2rem');
// var postcss_nested = require('postcss-nested');
require('./src/utils/generateRouter.js');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const cdn = {
    // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
    js: [
        '//unpkg.com/vue@2.6.10/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
        '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
        '//unpkg.com/axios@0.19.0/dist/axios.min.js',
        '//unpkg.com/element-ui@2.10.1/lib/index.js'
    ]
};
// const fs = require('fs');
// let dirls = fs.readdirSync(`${process.cwd()}/src/page`);
let html_plugins = [];
// dirls.map((data) => {
//     let stat = fs.statSync(`${process.cwd()}/src/page/${data}`);
//     if (stat && stat.isDirectory()) {
//         html_plugins.push(`html-${data}`);
//     }
// });
//postcss插件
// let postcssPlugins = [
//     px2rem({
//         rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
//         // unitPrecision: 5, //允许REM单位增长到的十进制数字。
//         //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
//         // propBlackList: [], //黑名单
//         exclude: process.env.isMobile == 'true' ? /(node_module)/ : /(node_module|src)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
//         // selectorBlackList: [], //要忽略并保留为px的选择器
//         // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
//         // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
//         mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
//         minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
//     }),
//     postcss_nested()
// ];
module.exports = {
    //多页面设计
    // pages: _pages,
    //node_module显式依赖babel
    transpileDependencies: [],
    //生产环境关闭sourcemap
    productionSourceMap: !IS_PROD,
    chainWebpack: (config) => {
        config.module
            .rule('eslint')
            .use('eslint-loader')
            .loader('eslint-loader')
            .tap((options) => {
                // 修改它的选项...
                options.fix = true;
                return options;
            });
        config.resolve.alias.set('@', resolve('src'));

        html_plugins.map((name) => {
            config.plugin(name).tap((args) => {
                args[0].cdn = cdn;
                return args;
            });
        });
    },
    //webpack config
    configureWebpack: (config) => {
        config.externals = {
            // vue: 'Vue',
            // 'element-ui': 'ELEMENT',
            // 'vue-router': 'VueRouter',
            // vuex: 'Vuex',
            // axios: 'axios'
        };
    },
    //css配置
    css: {
        loaderOptions: {
            //postcss 配置
            // postcss: {
            //     plugins: postcssPlugins
            // }
        }
    }
};
