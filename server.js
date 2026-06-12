import http  from 'node:http'
import { WebSocketServer } from 'ws'
import fs from 'node:fs/promises'
import path from 'node:path'

const httpServer =  http.createServer(async function (req,res) {
    const indexFile = await fs.readFile(path.resolve('./index.html'),'utf-8')
    res.setHeader('Content-Type','text/html')
    return res.end(indexFile)
})
const wsServer =  new WebSocketServer({server:httpServer})

wsServer.on('connection',(webscoket)=>{
    console.log("webscoket connection ...");

webscoket.on('message',(data)=>{
    console.log('websocket message recieved',data.toString());

webscoket.send(data.toString())
  
})
    

});

    
const PORT  = process.env.PORT ?? 3000
httpServer.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})