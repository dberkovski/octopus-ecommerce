"use client"

import React, {useState} from 'react';
import Image from "next/image";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {UserType} from "@/app/types";

interface UserMenuProps {
    currentUser?: UserType | null
}
const UserMenu:React.FC<UserMenuProps> =  ({currentUser}) => {
    // const currentUser = await getCurrentUser()
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className="flex flex-row">
            {/*<span className="mr-4">{JSON.stringify(currentUser)}</span>*/}
            {currentUser !== null ? <>
                <Image alt="user-image" src={currentUser?.image} width={35} height={20} className="items-center self-center bg-green-200
                 p-1.5 text-green-600 font-bold rounded-full"/>
                <div className="self-center flex-row flex ml-2">
                    {currentUser?.firstName} {currentUser?.lastName}
                    <Image className="ml-1" src={"/icons/icon_arrow-down.svg"} height={20} width={20}
                           alt={"arrow"}/>
                </div>
            </> : <>
                <div className="items-center self-center bg-green-200
                 p-1.5 text-green-600 font-bold rounded-full">SG
                </div>
                <div className="self-center flex-row flex ml-2">
                    Selin Gülce
                    <Image className="ml-1" src={"/icons/icon_arrow-down.svg"} height={20} width={20}
                           alt={"arrow"}/>
                </div>
            </>}
        </div>
    );
};
export default UserMenu;