
import z from "zod";

export async function createuser(req,res,next) {

const validationSchema = z.object({
    name:z.string().min(3),
    role:z.string().min(2)
    
})

    const {name,role} =  req.body;

    try{
    if (validationSchema.parse(req.body)){
       return res.status(401).json({message:"name is required"})
    }
    if (!validationSchema.role){
        return res.status(401).json({message:"role is required"})
     }

     const user =  await createuser(name,role)

    if (!user){
        res.status(404).json({message:"user not found"})

    }
    
    res.status(200).json({message:"user created successfully",user})
    }
    catch(error){
        res.status(500).json({message:"internal server error"})
        console.log("message error",error);

        next(error)
        
    }

    


}