"use client"

import React, {useCallback, useState} from 'react';
import Image from "next/image";
import {UserType} from "@/app/types";
import MenuItem from "@/components/navbar/menu-item";
import {LogOutIcon} from "lucide-react";
import axios from "axios";

interface UserMenuProps {
    currentUser?: UserType | null
}

import {useRouter} from "next/navigation";

const UserMenu:React.FC<UserMenuProps> =  ({currentUser}) => {
    const router = useRouter()
    // const currentUser = await getCurrentUser()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    const onLogout = async () => {
        try {
            const response = await axios.get('/api/logout');
            if (response.status === 200) {
                router.push("/login")
            }
        } catch (error:any) {
            console.error('Logout and clear cookie error :', error.message);
        }
    }
    return (
        <div className="flex flex-row">
            {/*<span className="mr-4">{JSON.stringify(currentUser)}</span>*/}
            {currentUser !== null ? <>
                <Image alt="user-image" src={currentUser?.image ? currentUser?.image :"" } width={35} height={20} className="items-center self-center bg-green-200
                 p-1.5 text-green-600 font-bold rounded-full"/>
                <div className="self-center flex-row flex ml-2 cursor-pointer rounded-md transition" onClick={toggleOpen}>
                    {currentUser?.firstName} {currentUser?.lastName}
                    <Image className="ml-1 " src={"/icons/icon_arrow-down.svg"} height={20} width={20}
                           alt={"arrow"} />
                </div>
            </> : <>
                <div className="items-center self-center bg-green-200
                 p-1.5 text-green-600 font-bold rounded-full">SG
                </div>
                <div className="self-center flex-row flex ml-2">
                    Selin Gülce
                    <Image className="ml-1" src={"/icons/icon_arrow-down.svg"} height={20} width={20}
                           alt={"arrow"} onClick={toggleOpen}/>
                </div>
            </>}

            {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md w-[40vw] md:w-[15%] mr-2  bg-white overflow-auto right-0 top-12 text-sm z-50">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={()=>{}} label="My Profile"/>
                                <hr/>
                                <MenuItem onClick={onLogout} label="Logout" icon={<LogOutIcon className="ml-2"/>}/>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={()=>{}} label="login"/>
                                <MenuItem onClick={()=>{}} label="Sign Up"/>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};
export default UserMenu;