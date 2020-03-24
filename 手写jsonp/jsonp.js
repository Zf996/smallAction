// 导入 http 内置模块
const http = require('http')
// 这个核心模块，能够帮助我们解析 URL 地址，从而拿到一个 pathname query
const urlModule = require('url')

// 创建一个 http 服务器
const server = http.createServer();
// 监听 http 服务器的 request 请求
server.on('request', function (req, res) {
    // write your code here....


    // const url = req.url
    const {
        pathname: url,
        query
    } = urlModule.parse(req.url, true)

    if (url === "/say") {
        // 拼接一个合法的JS 脚本，这里拼接的是一个方法的调用
        // var scriptStr = "show()"  //这里不要写死

        var data = {
            name: '小明',
            age: 20,
            gender: '纯爷们'
        }
        console.log(query.wd);
        var scriptStr = `${query.cb}(${JSON.stringify(data)})`
        console.log(scriptStr)
        // res.end 发送给 客户端，客户端去把这个 字符串，当做JS代码去解析执行
        res.end(scriptStr)
    } else {
        res.end('404')
    }
})

// 指定端口号并启动服务器监听
server.listen(3000, function () {
    console.log('server listen at http://127.0.0.1:3000')
})
