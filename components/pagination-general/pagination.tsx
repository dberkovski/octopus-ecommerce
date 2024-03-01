'use client'

import {FC, useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

type urlInfos = {
    urlTillQuestionMark: string
}

import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {ChevronFirst, ChevronLast} from "lucide-react";


interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
    totalCount: number
    end: number
    start: number,
    prevAndNextUrlInfos: urlInfos
}

type pageInfosType = {
    before: number,
    current: number,
    after: number
}
const PaginationControls: FC<PaginationControlsProps> = (
    {
        hasNextPage,
        hasPrevPage,
        totalCount,
        end,
        prevAndNextUrlInfos
    }
) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? 1
    const per_page = searchParams.get('per_page') ?? 9
    const searchString = searchParams.get('searchString') ?? ''
    const category = searchParams.get('category') ?? ''


    const [prevPageUrl, setPrevPageUrl] = useState("/")
    const [nextPageUrl, setNextPageUrl] = useState("/")

    useEffect(() => {
        if (prevAndNextUrlInfos !== undefined && hasPrevPage) {
            if (searchString !== "" || searchString == undefined) {
                setPrevPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page) - 1}&per_page=${per_page}&searchString=${searchString}&category=${category}`)
            } else {
                setPrevPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page) - 1}&per_page=${per_page}&category=${category}`)
            }
        } else {
            if (searchString !== "" || searchString == undefined) {
                setPrevPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page)}&per_page=${per_page}&searchString=${searchString}&category=${category}`)
            } else {
                setPrevPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page)}&per_page=${per_page}&category=${category}`)
            }
        }
        if (prevAndNextUrlInfos !== undefined && hasNextPage) {
            if (searchString !== "" || searchString == undefined) {
                setNextPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page) + 1}&per_page=${per_page}&searchString=${searchString}&category=${category}`)
            } else {
                setNextPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page) + 1}&per_page=${per_page}&category=${category}`)
            }
        } else {
            if (searchString !== "" || searchString == undefined) {
                setNextPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page)}&per_page=${per_page}&searchString=${searchString}&category=${category}`)
            } else {
                setNextPageUrl(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page)}&per_page=${per_page}&category=${category}`)
            }
        }
    }, [prevAndNextUrlInfos, hasNextPage, hasPrevPage, per_page, page])

    const totalPageCount = Math.ceil(totalCount / Number(per_page))
    const prevHandler = () => {
        if (prevAndNextUrlInfos !== undefined) {
            if (hasPrevPage) {
                router.push(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page) - 1}&per_page=${per_page}&category=${category}`)
            }
        }
    }
    const nextHandler = () => {
        if (prevAndNextUrlInfos !== undefined) {
            if (hasNextPage) {
                router.push(`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(page) + 1}&per_page=${per_page}&category=${category}`)
            }
        }
    }

    const plusAndMinusCurrentPages = (): pageInfosType => {
        let pageRange: pageInfosType = {
            before: 0,
            current: 0,
            after: 0,
        };
        // @ts-ignore
        if (Number(page) - 3 > 0 && totalPageCount > Number(page + 3)) {
            pageRange = {
                before: Number(page) - 3,
                current: Number(page),
                after: Number(page) + 3,
            };
        }
        // @ts-ignore
        if (Number(page) - 3 > 0 && totalPageCount < Number(page + 3)) {
            pageRange = {
                before: Number(page) - 3,
                current: Number(page),
                after: Number(page) + 3 > totalPageCount ? totalPageCount : Number(page) + 3
            };
        }
        // @ts-ignore
        if (Number(page) - 3 === 0 && totalPageCount < Number(page + 3)) {
            pageRange = {
                before: 1,
                current: Number(page),
                after: Number(page) + 3 > totalPageCount ? totalPageCount : Number(page) + 3,
            };
        }

        if (Number(page) - 3 < 0) {

            let diff = Math.abs(Number(page) - 3)
            pageRange = {
                before: Math.abs(Number(page) - diff),
                current: Number(page),
                after: Number(page) + 3 > totalPageCount ? totalPageCount : Number(page) + 3,
            };
        }

        return pageRange;
    };



    const DynamicPagination = () => {
        let pageInfos = plusAndMinusCurrentPages();
        const {before, current, after} = pageInfos;

        const pages = [];
        for (let i = before; i <= after; i++) {
            pages.push(
                <>
                    <div className="hidden sm:block">
                        {searchString !== "" || searchString !== undefined ?
                            <PaginationLink className={`${i === current ? "bg-octGreen text-white" : "border border-gray-300 bg-white"}`}
                                            href={`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(i)}&per_page=${per_page}&searchString=${searchString}&category=${category}`}>{i}</PaginationLink> :
                            <PaginationLink className={`${i === current ? "bg-octGreen text-white" : ""}`}
                                            href={`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(i)}&per_page=${per_page}&category=${category}`}>{i}</PaginationLink>}
                    </div>
                </>
            );
        }
        return (
            <>
                {pages}
            </>
        );
    };
    return (
        <div className='flex gap-2 flex-col items-center overflow-auto'>
            <div>
                {end > totalCount ? `${totalCount}/${totalCount}` : `${end}/${totalCount}`}
            </div>

            <div className="bg-gray-200 w-full rounded-md py-1.5 mb-4 ">
                <Pagination>
                    <PaginationContent className="overflow-auto">
                        {searchString !== undefined || searchString !== "" ? <PaginationLink className="bg-white "
                                                                                             href={`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(1)}&per_page=${per_page}&searchString=${searchString}`}><ChevronFirst
                            className="w-4 h-4"/></PaginationLink> : <PaginationLink className="bg-white "
                                                                                     href={`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(1)}&per_page=${per_page}`}><ChevronFirst
                            className="w-4 h-4"/></PaginationLink>}
                        <PaginationPrevious href={prevPageUrl} isActive={hasPrevPage} onClick={prevHandler}/>
                        <DynamicPagination/>
                        <PaginationNext href={nextPageUrl} className="disable" isActive={hasNextPage}
                                        onClick={nextHandler}/>

                        {searchString !== undefined || searchString !== "" ? <PaginationLink className="bg-white "
                                                                                             href={`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(totalPageCount)}&per_page=${per_page}&searchString=${searchString}`}><ChevronLast
                            className="w-4 h-4"/></PaginationLink> : <PaginationLink className="bg-white "
                                                                                     href={`${prevAndNextUrlInfos.urlTillQuestionMark}?page=${Number(totalPageCount)}&per_page=${per_page}`}><ChevronLast
                            className="w-4 h-4"/></PaginationLink>}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
export default PaginationControls