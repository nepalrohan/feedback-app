import {z} from 'zod';

export const acceeptMEssageSchema = z.object({
    acceptMessage:z.boolean()
})