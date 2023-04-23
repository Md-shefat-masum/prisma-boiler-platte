const express = require('express');
const server = express();
const port = 5000;

server.get('/',(req,res)=>{
    res.send('welcom to prisma-express')
})

server.listen(port,()=>{
    console.log('server running on http://127.0.0.1:'+port);
})