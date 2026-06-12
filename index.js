import express from 'express'

import fs from 'fs'
import { Readline } from 'readline/promises'
const app = express()
import readline from 'readline'


app.get('/events',  (req,res)=>{
    res.writeHead(200,{
        "Content-Type": "text/event-stream",
         "Access-Control-Allow-Origin":"*",
         "Connection":"keep-alive",
         "Cache-Control":"no-cache, no-store, must-revalidate"
          
    })
    res.write(`data: incoming connection\n\n`)

    // const interval= setInterval(()=>{
    //     const data ={
    //         time:new Date().toLocaleTimeString(),
    //         message: `server push at ${Date.now()}`,
    //         random: Math.random()

    //     }

    //     res.write(`data: ${JSON.stringify(data)}\n\n`)
    // },2000)



    const data =  readline.createInterface({input:fs.createReadStream('./text.txt','utf-8'),
        crlfDelay:Infinity
    })

    data.on('line',(chunk)=>{
        res.write(`data:${JSON.stringify({message:chunk})}\n\n`)
    })

    data.on('close',()=>{
        console.log('end')
        res.write(`data: ${JSON.stringify({message:'file streaming done'})}\n\n`)
        res.end()
    })

       data.on('error', (err) => {
        console.error('File read error:', err)
        res.write(`data: ${JSON.stringify({ error: 'File read error' })}\n\n`)
        res.end()
    })
        req.on('close',()=>{
            // clearInterval(interval)

            console.log('connection closed');
            data.close()
            res.end()
            
        })
})










app.listen(3000,()=>{
    console.log('server running on port 3000');
    
})