module.exports = {
    prod : { // 代理配置表,可以配置特定的请求代理到对应的API接口
        proxyTable : {
            '*.json' : {
                target : 'http://admin.fwtai.com/', // 接口的域名
                secure : false, // 如果是https接口,需要配置这个参数为true
                changeOrigin : true // 如果接口跨域,需要进行这个参数配置为true
            },
            '/api/**' : {
                target : 'http://192.168.3.108:701/',
                secure : false,
                changeOrigin : true
            }
        }
    },
    dev : {
        proxyTable : {

        }
    }
};