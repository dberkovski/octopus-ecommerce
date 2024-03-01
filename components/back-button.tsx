"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {IoChevronBackCircle} from "react-icons/io5";

const BackButton = () => {
    const router = useRouter()
    const onBack = () => {
        router.back()
    }
    return (
        <button onClick={onBack}
                className="absolute flex flex-row items-center rounded-md text-white bg-octGreen p-2 top-[1%] left-[95%]">Geri <IoChevronBackCircle
            className="ml-2" size={24}/>
        </button>
    );
};

export default BackButton;