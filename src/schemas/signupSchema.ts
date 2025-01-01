import {z}  from 'zod';


export const usernameValidation = z
.string()
.min(4, "Username must be atleast 4 character long")
.max(16, "Username can be atmost 16 character long")
.regex(/^[a-zA-Z0-9_]+$/, "Username shouldnot contain any special character")



export const signupSchema = z.object({

    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8, {message:"Password must be atleast 8 characters"}),
    


})