'use client'


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import {useEffect, useState} from 'react';
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";

const Page  =() =>{
  const { toast } = useToast();
  const router = useRouter();







//zod imploemenataion 

const form = useForm<z.infer<typeof signInSchema>>({
  resolver:zodResolver(signInSchema),
  defaultValues:{
    
    identifier:"",
    password:"",
  }
});






const onSubmit = async (data:z.infer<typeof signInSchema>) =>{


  const result = await signIn('credentials', {
    redirect:false,
    identifier:data.identifier,
    password:data.password
  })

  if(result?.error){
    toast({
      title:"Login failed",
      description:"Incorrect username or password",
      variant:"destructive"
    })
  }

  if(result?.url){
    router.replace('/dashboard')
  }
}

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div  className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
    <div className='text-center'>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Welcome to Khufiya Message</h1>
<p className='mb-4'>Sign in to start your anonymous adventure</p>
    </div>



    {/* //fomr */}
<Form {...form}>

<form onSubmit = {form.handleSubmit(onSubmit)}  
className='space-y-6'
>




<FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email/Username" 
                {...field}
              
                 />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Password" 
                {...field}
               
                 />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'  >
      Sign In
        </Button>
</form>

</Form>

<div className="text-center mt-4">
  <p>
    Already a member?{ ' '}
    <Link href='/sign-in' className='text-blue-500 hover:text-blue-800'>Sign in</Link>
  </p>

  
</div>

      </div>

    </div>
  )
}

export default Page;
