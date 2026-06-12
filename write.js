

import fs from 'node:fs'



async function Write() {
    


const writeStream =  awafs.appendFile('./text.txt',"hellp bithcesss");
// writeStream.write('Line 1\n');
// writeStream.write('Line 2\n');

writeStream.end();

writeStream.on('finish',()=>{
    const Readstream =  fs.createReadStream('./text.txt','utf-8',)
Readstream.on('data',(chunk)=>console.log(chunk));
})



}

Write()