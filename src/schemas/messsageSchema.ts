import {z} from 'zod';

export const messageSchema = z.object({
    content:z.string().min(10, {message:"COntent must be atleast of 10 character"})
    .max(300, "Content mustnot exceedmore than 300 character")
})