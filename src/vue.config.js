module.exports={
    publicPath:"./",//配置根路径
    assetsRoot: path.resolve(__dirname,"../dist"),
    outputDir: 'dist',//构建输出目录
    assetsDir: 'assets', //静态资源目录(js\css\img)
    lintOnSave: false, //是否开启eslint
    devServer:{
        open: false,  //是否自动在浏览器打开
        host: '127.0.0.1' , //真机测试 0.0.0.0
        port: 8081, //配置端口号
        https: false, //是否配置https
        hotOnly: false, //是否热更新
        proxy:{ //配置跨域
            '/api':{
                target:'http//127.0.0.1:5000/api/',
                ws:true,
                changOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}
 