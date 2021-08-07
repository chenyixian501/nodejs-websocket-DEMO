const ws = require('nodejs-websocket')
const PORT = 3000

let count = 0//记录聊天室总人数
let maxOnline = 0;
const server = ws.createServer(connect => {
    count++;
    maxOnline++;
    console.log('新用户链接，当前在线人数' + count);
    

    function broadcast(msg){
        server.connections.forEach(item => {
            item.send(msg);
        })
    }

    connect.on('text',data => {
        broadcast(data);
    })

    connect.on('close',data => {
        count--;
        console.log('存在用户断开链接,当前在线人数为' + count);
        console.log('最高访问人数达' + maxOnline + '人')
    })
    
    connect.on('error',data => {
        console.log('发生异常');
    })
})

server.listen(PORT,() =>{
    console.log('服务启动成功，监听端口3000');
})