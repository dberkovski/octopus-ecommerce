"use client"
import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const LeftSidebarQuickSearch = () => {
    const pathName = usePathname();
    const router = useRouter()

    const searchParams = useSearchParams()
    const per_page = searchParams.get('per_page') ?? 9
    const searchString = searchParams.get('searchString') ?? ''
    const category = searchParams.get('category') ?? ''

    const onSearch = (stringSearchVal: string) => {
        if (stringSearchVal.length == 0) {
            router.push(`${pathName}?page=1&per_page=${per_page}`)
        }
        router.push(`${pathName}?page=1&per_page=${per_page}&searchString=${stringSearchVal}&category=${category}`)
    };

    return (
        <input type="text" style={{
            backgroundImage: "url('/icons/icon_search.svg')",
            backgroundPosition: "7.5px 7.5px",
            backgroundRepeat: "no-repeat",
            paddingLeft: 42,
        }} className="pl-8 pr-4 rounded-md p-2 focus:outline-none focus:ring-green-400 focus:ring"
               placeholder="Quick Search" onKeyUp={(e: { target: { value: string; }; }) => {
            setTimeout(() => {
                onSearch(e.target.value)
            }, 750)
        }}
               defaultValue={searchString}
        />
    );
};

export default LeftSidebarQuickSearch;