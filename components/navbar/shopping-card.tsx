"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {AiOutlineShoppingCart} from "react-icons/ai";

import shallow from 'zustand/shallow'
import {useShoppingCard} from '@/lib/store/shoppingCardStore';
import MenuItem from "@/components/navbar/menu-item";
import {LogOutIcon} from "lucide-react";

const ShoppingCard = () => {
    const {cardData, fetch, total} = useShoppingCard()
    useEffect(() => {
        fetch()
    }, [])
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);


    return (
        <div className="flex flex-row items-center relative">
            <AiOutlineShoppingCart onClick={toggleOpen} size={24} className="text-gray-400"/>
            <span
                className="absolute bottom-[25%] left-[25%] scale-50 bg-red-500 text-white rounded-full p-2">{cardData.length}</span>
            <div>  {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md w-64 mr-2  bg-white overflow-auto right-0 top-12 text-sm z-50 ">
                    <div className="flex flex-col cursor-pointer p-4">
                        {cardData.length > 0 ? (
                            <>
                                <header className="font-semibold text-2xl p-4">Ürünler</header>
                                <div className="flex flex-col gap-y-2">
                                    {cardData.map((row: any) => <>
                                        <span>{row.title}</span>
                                        <hr/>
                                    </>)}
                                </div>
                                <div className="font-semibold mt-2">
                                    <span>Total:$ {total}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <span>Sepet Boş</span>
                            </>
                        )}

                    </div>
                </div>
            )}</div>

            {/*<h1>Books: {amount} </h1>*/}
            {/*/!*<h4>Title: {title} </h4>*!/*/}
            {/*<h4>cardData: {JSON.stringify(cardData)} </h4>*/}
            {/*<h4>loading: {loading} </h4>*/}
            {/*<h4>hasErrors: {hasErrors} </h4>*/}
            {/*<button className="bg-blue-500"*/}
            {/*    onClick={ () => updateAmount(10) }*/}
            {/*> Update Amount </button>*/}

            {/*<button type="button" className="bg-red-500 mr-4 ml-4"*/}
            {/*        onClick={fetch }*/}
            {/*> get data </button>*/}
        </div>
    );
};

export default ShoppingCard;