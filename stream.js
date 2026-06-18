// import { error } from 'console';
// import  fs from 'fs';
// import pipe from 'stream'


// const ReadStream =  fs.createReadStream('./test.txt',(data,error)=>{
//     if (error)console.error('error',error)

//         console.log(data);
        
// })

// // const WriteStream  = fs.createWriteStream('./output.txt','utf-8',(error)=>{
// //     if(error)console.log(error);
    
// // })


// // // ReadStream.pipe(WriteStream)


// // ReadStream.on('data',(chunk)=>{
// //     console.log(chunk);
    
// // })

// // fs.unlink('./output.txt',(error)=>{
// //     if (error)console.log(error);
// //     console.log('file deleted');
    
// // })
// import express from 'express';

// const app = express();

// app.get('/', (req, res) => {
//   res.send('hello');
// });

// app.get('/stream',(req,res)=>{


//     res.writeHead(200,{
//    "Content-Type": "text/event-stream",
//         //  "Access-Control-Allow-Origin":"*",
//         //  "Connection":"keep-alive",
//         //  "Cache-Control":"no-cache, no-store, must-revalidate"
//     })

//     res.write(`hi body how you doing \n\n`)

//     const interval  = setInterval(() => {
//         const data = {
//             "num":Math.random(),
//             "time":Date.UTC(),
//             "message":"bitches"
//         }
//         res.write(`hiii ${JSON.stringify(data)} hiii \n\n`)
//     }, 2000);


//     req.on('close',()=>{
//         console.log('req finished');
//         clearInterval(interval)
        
//     })

//     // req.on('finish',()=>{
//     //     console.log("finished");
//     //     clearInterval(interval)
        
//     // })

// })

// app.listen(4000, () => {
//   console.log('server is running on 4000');
// });


// await sleep(2000);
// console.log("Done");

// function sleep(ms){
// return new Promise(resolve=>setTimeout(resolve,ms))



// }
// function wait(ms){
// return new Promise(resolve=>setTimeout(()=>{
//        resolve()
// },ms))
// }






// wait(1000)
//   .then(() => {
//     console.log("Hello");
//   });

  function delay(ms,word){
return new Promise(resolve=>setTimeout(()=>{
       resolve(word)
       
       
},ms))
}


delay(1000, "Hello")
  .then(console.log);




function createOrder(){
return new Promise((resolve,reject)=>{
  setTimeout(() => {

    console.log('order created');
    resolve()
    
    
  }, );
})
}

function checkInventory(){

  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
console.log('inventory checked');
resolve()
    })
  })
}

function payment(){
  console.log('payment');
  
}
function invoice(){
  console.log("invoice");
  

}

function main(){
createOrder().catch((err)=>{
  console.log(err);
  
}).then(checkInventory).catch((err)=>{
  console.log(err);
  
}).then(payment).then(invoice).catch((err)=>{
  console.log(err);
  
}).catch((err)=>{
  console.log(err);
  
})
  console.log("otger tasks");
  
}
main()