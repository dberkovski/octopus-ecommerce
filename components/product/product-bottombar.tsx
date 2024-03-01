"use client"
import React from 'react';
import updateACart from "@/app/actions/updateAcart";
import {toast} from "sonner";
import {useShoppingCard} from "@/lib/store/shoppingCardStore";

export interface ProductBottomBarProps {
    id: number,
    title: string,
    description: string,
    price: number,
    images: [
        string
    ],
    thumbnail: string,
    rating: number,
}

const ProductBottomBar: React.FC<ProductBottomBarProps> = ({
                                                               title,
                                                               description,
                                                               price,
                                                               id
                                                           }) => {

    const {updateCardData} = useShoppingCard()
    return (
        <div className="flex flex-row  justify-between border-t border-slate-300 bg-white ">
            <div className="p-4 whitespace-nowrap font-bold border-r border-slate-300 items-center flex">Sipariş Özeti
            </div>
            <div className="text-md w-full justify-between flex flex-row p-2 items-center">
                <div className="flex flex-col">
                    <header className="font-bold ">{title}</header>
                    <div className="font-light text-gray-400">{description}</div>
                </div>
                <div className="flex flex-row justify-center items-center h-full gap-x-4 mr-4">
                    <div className="font-bold text-xl">${price}</div>
                    <button onClick={() => {
                        updateCardData(id)
                    }}
                            className="w-full bg-octGreen text-white text-sm rounded-md p-2 hover:bg-green-700 px-6">Sepete
                        Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductBottomBar;