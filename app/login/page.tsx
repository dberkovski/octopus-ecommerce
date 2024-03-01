import React from 'react';
import Image from "next/image"

import LoginForm from "@/components/login/LoginForm";
import {Toaster} from "sonner"

const LoginPage = () => {
    return (
        <>
            <Toaster richColors position={"top-center"}/>
            <div className="h-full flex flex-row">
                <div className="bg-slate-100 w-[58%]">
                    <div className="p-10 flex flex-col">
                        <Image width={175} height={46} src="/images/oct-nav-icon.svg" alt="navicon"/>
                        <div className="mt-50 mt-[10%] items-center justify-center flex flex-col">
                            <Image src="/images/login-image.svg" width={300} height={35} alt="login-content-image"/>
                            <div className="mt-[5%] flex flex-col">
                                <header className="text-2xl font-bold">
                                    Let Free Your Creativity with Our Intuitive <br/>Content Creator
                                </header>
                                <span className="text-sm mt-3">
                            No design degree is required! Effortlessly craft and design stunning and captivating content
                            using our user-friendly creative editor. With our drag-and-drop technology, anyone can
                            create amazing marketing materials in.
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-[42%] flex flex-col self-center">
                    <div className="p-[20%]">
                        <LoginForm/>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LoginPage;