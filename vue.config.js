module.exports = {
    devServer : {
        proxy : {
            '/api' : {
                target : "http://70.50.169.63:8080/",
                changeOrigin : true,
                pathRewrite : {
                    '^/api' : ''
                }
            }
        }
    }
}