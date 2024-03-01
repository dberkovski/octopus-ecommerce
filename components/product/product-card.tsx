"use client"
import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useShoppingCard} from "@/lib/store/shoppingCardStore";


export interface ProductCardProps {
    id: number
    title: string
    description: string
    price: number
    rating: number
    thumbnail: string
}

const ProductCard: React.FC<ProductCardProps> = ({id, rating, price, description, title, thumbnail}) => {
    const router = useRouter()
    const onClickToDetailProduct = (id: number) => {
        router.push(`/product/${id}`)
    }
    const {updateCardData} = useShoppingCard()

    return (
        <div className="flex flex-col items-center ">
            {/*<Image className="object-cover" width="175" height="311"  style={{objectFit: 'cover'}} src={thumbnail} alt={"product card"}/>*/}
            <div className="flex flex-col h-full justify-center items-center cursor-pointer hover:scale-105 transition"
                 onClick={() => {
                     onClickToDetailProduct(id)
                 }}>
                <Image
                    style={{width: '310px', height: '175px', objectFit: 'cover', objectPosition: "center"}}
                    src={thumbnail}
                    alt={"product card"}
                    height={175}
                    width={310}
                    className="rounded-md "
                />
                <div className="flex flex-col h-full">
                    <header className="text-md font-semibold mt-4 ">{title}</header>
                    <div className="text-gray-900 mt-2 text-sm w-fit">{description}</div>
                    <div className="font-bold text-lg mt-2">${price}</div>
                    <div className="flex flex-row">
                        {rating}
                        <svg className="w-5 h-5 fill-current text-black"
                             viewBox="0 0 24 24">
                            <path
                                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                            />
                        </svg>
                        <svg className="w-5 h-5 fill-current text-black"
                             viewBox="0 0 24 24">
                            <path
                                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            {/*<button  onClick={ () => updateAmount(10) }  className="w-full bg-octGreen text-white rounded-md mt-4 p-2 hover:bg-green-700">Sepete Ekle*/}
            <button onClick={()=>{updateCardData(id)}}  className="w-full bg-octGreen text-white rounded-md mt-4 p-2 hover:bg-green-700">Sepete Ekle</button>
        </div>
    );
};

export default ProductCard;