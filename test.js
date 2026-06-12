import { EventEmitter } from "events";
import { Transform } from "stream";

import  fs from 'node:fs'
// import { json } from "express/lib/response";


// const emmitor =  new EventEmitter()


// const upperCaseTransform =  new Transform({
//     transform(chunk,encoding,callback){

//         const uppercase =  chunk.toString().toUpperCase()
//         this.push(uppercase)
//         callback()
//     }
// })


// const Readstream =  fs.createReadStream('./chat.txt','utf-8')
// const writestream =  fs.createWriteStream('./output.txt')


// Readstream.on('error',(err)=>{
//     console.error("error occured",err)
// })
// upperCaseTransform.on('error',(err)=>{
//     console.error("error occured",err)
// })
// writestream.on('error',(err)=>{
//     console.error("error occured",err)
// })


// writestream.on('finish',()=>{
//     console.log("file written successfully")
// })

// Readstream.on('end',()=>{
//     console.log('completed ');
//     emmitor.emit('end', 'processing completed')
    
// })

// emmitor.on('end',(message) => {
//     console.log('event emmited',message);
    
// })



// Readstream.pipe(upperCaseTransform).pipe(writestream)



// setInterval(()=>{
//     const data = {
//         time:new Date().toLocaleTimeString(),
//         message: `server push at ${Date.now()}`,
//         random: Math.random()

//     } 

//     console.log(JSON.stringify(data))
    
// },2000)


async function read(){

const data=  fs.readFile('./chat.txt','utf-8',(err,data)=>{
    if (err) {
         throw err;
        

    }
    console.log(data);
    
})
// console.log(data)

}

read()


// const Readstream =  fs.createReadStream('./chat.txt','utf-8')

// Readstream.on('data',(data)=>console.log(data));
// Readstream.on('error',(err)=>console.log(err));
// Readstream.on('end',()=>console.log('completed'));
























// import zlib  from 'node:zlib'
// // import os from os
// // import path from path
// import fs, { write } from 'node:fs'

// const Readstream =  fs.createReadStream('./chat.txt',"utf-8")
// const writeStream = fs.createWriteStream('./output.txt')

// const gzip = zlib.createGzip()  


// Readstream.on('error',(err)=>{
//     console.error("error occured",err)
// })
// gzip.on('error',(err)=>{
//     console.error("error occured",err)
// })
// writeStream.on('error',(err)=>{
//     console.error("error occured",err)
// })
// writeStream.on('finish',()=>{
//     console.log("file written successfully")
// })


// Readstream.pipe(gzip).pipe(writeStream)


// // console.log(os.cpus().length)


// // async function 