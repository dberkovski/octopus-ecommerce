import React from 'react';
import getProductDetail from "@/app/actions/getProductDetail";
import Image from "next/image";
import {FaCircle} from "react-icons/fa";
import {FaCheckCircle} from "react-icons/fa";
import ProductCommentsList from "@/components/product/product-comments-list";
import {ProductBottomBarProps} from "@/components/product/product-bottombar";
import ProductBottomBar from "@/components/product/product-bottombar";
import {IoChevronBackCircle} from "react-icons/io5";
import BackButton from "@/components/back-button";
import {Toaster} from "sonner";


interface ProductDetailPageProps {
    params: {
        productId: number
    },
    searchParams: {}
}


const ProductDetailPage = async ({params}: ProductDetailPageProps) => {
    const productId = params.productId
    const productData: ProductBottomBarProps = await getProductDetail(productId)

    const productPropertyList = [1, 2, 3]

    // @ts-ignore
    return (
        <div className="w-full h-full flex flex-col">
            {/*<h4>productData: {JSON.stringify(productData)}</h4>*/}
            <div className="p-10 w-full content-between bg-white h-full flex flex-row gap-x-6">
                <div className="flex flex-col w-[40%] min-w-60 items-center justify-start static gap-y-4">
                    <div className="bg-[#f2f2f2] flex w-full justify-center ">
                        <div className="bg-[#f2f2f2] min-w-48 w-full p-2 self-center ">
                            <Image className="object-contain h-96 w-full" alt="pic-main" width={500} height={500}
                                   src={productData.thumbnail}
                            />
                        </div>
                    </div>
                    <div className="w-full h-1/2 grid grid-cols-3 gap-x-2">
                        <Image className="object-contain h-24 w-36 mt-2 border border-black" alt="pic-main" width={500} height={500}
                               src={productData.thumbnail}/>
                        <Image className="object-contain h-24 w-36 mt-2" alt="pc2" width={500} height={500}
                               src={productData.images[0]}/>
                        <Image className="object-contain h-24 w-36 mt-2" alt="pc3" width={500} height={500}
                               src={productData.images ? productData.images[0] : ""}/>
                    </div>
                </div>
                <div className="w-full h-full relative">
                    <BackButton/>
                    <div className="flex flex-col gap-y-4">
                        <header className="text-2xl font-bold"> {productData.title}</header>
                        <span>{productData.description} </span>
                        <div className="w-full flex flex-col gap-y-1">
                            <header className="font-bold">Renk Seç</header>
                            <div className="flex flex-row w-full  gap-x-4">
                                <div
                                    className="bg-white flex flex-row items-center self-center min-w-36 border border-black p-2 ">
                                    <FaCircle className="ml-2 text-gray-200" size={16}/>
                                    <span className="ml-2">Silver</span>
                                </div>
                                <div
                                    className="bg-white flex flex-row justify-around items-center self-center min-w-36  p-2 shadow-md shadow-gray-400 rounded-sm">
                                    <div className="flex flex-row items-center">
                                        <FaCircle className="ml-2 text-black" size={16}/>
                                        <span className="ml-2">Black</span>
                                    </div>
                                    <FaCheckCircle className="text-octGreen" size={16}/>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2  w-1/3  gap-y-2 gap-x-4 p-2">
                            <div className="flex flex-col shadow-sm  shadow-gray-500 p-1">
                                <div className="flex flex-row items-center">
                                    <span>Ürün ozellik 1</span>
                                    <FaCheckCircle className="text-octGreen ml-4" size={16}/>
                                </div>
                                <span>
                                    Lorem isulum dolor ist amet
                                </span>
                            </div>
                            {
                                productPropertyList.map((index) => (
                                    <div key={index} className="flex flex-col border border-slate-400 p-1 opacity-50">
                                        <div className="flex flex-row items-center">
                                            <span>Ürün ozellik {index + 1}</span>
                                        </div>
                                        <span>
                               Lorem isulum dolor ist amet
                               </span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-full h-full">
                            <ProductCommentsList productId={productId}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*Bottom Bar*/}
            {/*@ts-ignore*/}
            <ProductBottomBar images={productData.images} description={productData.description}
                              price={productData.price}
                              id={productData.id} title={productData.title} thumbnail={productData.thumbnail}
                              rating={productData.rating}/>

        </div>
    );
};

export default ProductDetailPage;