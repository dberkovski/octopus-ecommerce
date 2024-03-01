import React from 'react';
import Image from "next/image";
import UserMenu from "@/components/navbar/user-menu";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {UserType} from "@/app/types";
import ShoppingCard from "@/components/navbar/shopping-card";

const Navbar = async () => {
    const currentUser:UserType | null = await getCurrentUser()
    return (
        <div className="w-full bg-slate-100 p-4 h-16 flex flex-row justify-between">
            <Image width={170} height={35} src="/images/logo-with-text.svg" alt="navicon"/>
            <div className="flex flex-row gap-x-3 mr-4">
                <ShoppingCard/>
                <Image src={"/icons/icon_search.svg"} height={24} width={24} alt={"search_icon"}/>
                <Image src={"/icons/icon_error.svg"} height={24} width={24} alt={"error_icon"}/>
                <Image src={"/icons/icon_notification.svg"} height={24} width={24} alt={"icon_notification"}/>
                <UserMenu currentUser={currentUser}/>
            </div>
        </div>
    );
};

export default Navbar;