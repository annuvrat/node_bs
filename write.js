

import e from 'express';
import fs from 'node:fs'
import path from 'node:path';



async function Write() {
    


fs.appendFile('./text.txt',"hellp bithcesss",(err)=>{
    if (err){ console.log(err); }
});
// writeStream.write('Line 1\n');
// writeStream.write('Line 2\n');

// writeStream.end();

// writeStream.on('finish',()=>{
    const Readstream =  fs.createReadStream('./text.txt','utf-8',)
Readstream.on('data',(chunk)=>console.log(chunk));
// })



}

Write() 


path.join(__dirname,'text.txt')

// fs.unlink('./text.txt',(err)=>{
//     if(err) console.log(err);
//     else console.log('file deleted');
// })