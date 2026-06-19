
// process.nextTick runs before the event loop continues — not "after I/O". It runs after the current operation completes, before the event loop moves to the next phase. Even before I/O callbacks. That's why it's dangerous — recursive nextTick calls can starve the event loop.
// setTimeout(fn, 0) vs setImmediate — the real interview trap. When called in the main module, their order is non-deterministic. But when called inside an I/O callback, setImmediate always runs before setTimeout. That's the nuance they're testing.
// Practical use cases — you skipped these:

// process.nextTick — error propagation in async APIs, ensuring a callback runs after current execution but before any I/O
// setImmediate — breaking up CPU-heavy tasks without blocking I/O
// setTimeout — actual time-based delays
import express from 'express';
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