"use client"
import React, {useEffect, useState} from 'react';
import LeftSidebar from "@/components/product/left-sidebar";
import axios from "axios";
import GreenSpinner from "@/components/green-spinner";
import ProductCard, {ProductCardProps} from "@/components/product/product-card";
import {useSearchParams} from 'next/navigation'
import PaginationControls from "@/components/pagination-general/pagination";

const ProductList = () => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? 1
    const per_page = searchParams.get('per_page') ?? 9
    const searchString = searchParams.get('searchString') ?? ''
    const category = searchParams.get('category') ?? ''
    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page)

    // let totalCount: number = 100;

    const prevAndNextUrlInfosData = {urlTillQuestionMark: `/product`}


    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const responseProduct = await axios.get(`/api/product-list?page=${page}&per_page=${per_page}&searchString=${searchString}&category=${category}`);
                const responseData = responseProduct.data
                setData(responseData.products);
                setTotalCount(responseData.total);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, [page, searchString,category]);

    return (
        <>
            {!isLoading ? (<div className="w-full items-center justify-center h-full">
                <header className="font-bold text-lg"> {totalCount} ürün listeleniyor</header>
                {data.length > 0 ? (
                    <div className="flex flex-col p-10 h-full gap-y-6">
                        <div className="h-full container z-10">
                            <div className="grid grid-cols-3 content-between  gap-y-4 gap-x-6 item h-full">
                                {data.map((row: ProductCardProps) => (
                                    <ProductCard id={row.id} key={row.id} title={row?.title}
                                                 description={row.description}
                                                 price={row.price} rating={row.rating} thumbnail={row.thumbnail}/>))}
                            </div>
                        </div>
                        <div className="w-full  flex justify-center">
                            <PaginationControls
                                hasNextPage={end < totalCount}
                                hasPrevPage={start > 0}
                                totalCount={totalCount}
                                end={end}
                                start={start}
                                prevAndNextUrlInfos={prevAndNextUrlInfosData}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center self-center mt-[25%] opacity-90 w-full">
                        {/*<GreenSpinner/>*/}
                        <header className="font-semibold">Ürün bulunamadı</header>
                    </div>
                )}

            </div>) : (
                <div className="flex justify-center items-center self-center mt-[25%] opacity-90 w-full"><GreenSpinner/>
                </div>)}

        </>
    );
};

export default ProductList;
