"use client"
import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios, {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


const LoginForm: React.FC = () => {
    const router = useRouter()
    const schema = z.object({
        email: z.string().min(4, {message: "Mail degeri 4 karakterden fazla olmalı"}),

        password: z.string().min(6, {message: 'Şifre en az 6 karakter olmalı'}),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmitHandler = async (data: any) => {
        try {
            const responseLogin = await axios.post("/api/login", data)
            const {success} = await responseLogin.data;
            if (success) {

                toast.success(`Login has been completed successfully!`)
                setTimeout(() => {
                    router.push("/product");
                    router.refresh();
                }, 500)

            } else {
                toast.error(`Login failed.Network error`)
            }
        } catch (error:any) {
            console.log(error.response)
            toast.error(`${error.response.data}`)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <header className="text-2xl font-bold text-center">Welcome to Octopus!</header>
            <span className="text-sm text-gray-400">Manage your smart signage, watch your company grow.</span>
            <div className="mt-[5%] flex flex-col gap-y-2">
                <div className="flex flex-col">
                    <label className="text-sm font-semibold">E-Mail Adress*</label>
                    <input {...register('email')} required defaultValue={"kminchelle"}
                           className="mt-1 bg-gray-200 rounded-md text-sm p-2 focus:ring focus:outline-none focus:ring-green-400"
                           placeholder={"Enter your e-mail adress"}/>
                    {/*@ts-ignore*/}
                    {errors.email?.message && <p className="text-red-500 text-sm pt-2">{errors.email?.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-semibold">Password</label>
                    <input required type="password" {...register("password")} defaultValue={"0lelplR"}
                           className="mt-1 text-sm bg-gray-200 rounded-md p-2 focus:ring focus:outline-none focus:ring-green-400"
                           placeholder={"Enter your e-mail adress"}/>
                    {/*@ts-ignore*/}
                    {errors.password?.message && <p className="text-red-500 text-sm pt-2">{errors.password?.message}</p>}

                </div>
                <div className="flex flex-row">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500"/>
                    <label className="font-semibold text-sm ml-2">Remember me ?</label>
                </div>
                <button type="submit" className="bg-green-600 text-white p-1.5 rounded-md mt-4">Login</button>
            </div>
        </form>
    );
};

export default LoginForm;