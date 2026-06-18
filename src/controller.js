import { db } from "./db.js";
import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient();
export const createUser = async (req,res) => {
const {name,email,password} = req.body

await prisma.user.create({
    data: {
        name,
        email,
        password
    }
})

}




