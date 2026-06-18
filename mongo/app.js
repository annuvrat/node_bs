import { configDotenv } from "dotenv";
import exress from "express";
configDotenv()
import { db } from "./db.js";
import { User } from "./user.model.js";
import { success } from "zod";
const app = exress()
app.use(express.json()); // Parses JSON data
app.use(express.urlencoded({ extended: true }));


db()



app.post('/create',async (req,res)=>{
    const {name,email,password} = req.body;

    const user =  await  User.findOne({
        email:email.toLowerCase()
    }) 

    if (user){
        res.status(400).json({
            success:false,
            message:"user already exist"
        })

        const createUser =  await User.create({
            name,
            email:email.toLowerCase(),
            password
        })
    
    createUser.password= undefined;
res.status(201).json({
    success:true,
    message:"created",
    data:createUser
})
}
})

app.get('/user',async (req,res)=>{
    

    const user =  await User.f
})





app.listen(8000)



