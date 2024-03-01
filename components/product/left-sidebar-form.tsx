"use client"
import React, {useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export interface categoriesDataProps {
    categoriesData: [string]
}

const LeftSidebarForm = ({categoriesData}:categoriesDataProps) => {

    // const schema = z.object({
    //     category: z.string().min(4, {message: "Mail degeri 4 karakterden fazla olmalı"}),
    // });
    const router = useRouter()
    const pathName = usePathname();
    const searchParams = useSearchParams()
    const per_page = searchParams.get('per_page') ?? 9
    const searchString = searchParams.get('searchString') ?? ''
    const category = searchParams.get('category') ?? ''


    let allSelectedCategories:any
    try {
        allSelectedCategories = category.split(',').map((item: any) => item.trim());
    } catch (error1) {
        allSelectedCategories = category
    }
    const [checkedCategories, setCheckedCategories] = useState(allSelectedCategories);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const onFormSubmit = async (data:any) => {
        const selectedValues = Object.entries(data)
            .filter(([key, value]) => value === true)
            .reduce((acc, [key]) => ({ ...acc, [key]: true }), {});
        const keyArray = Object.keys(selectedValues);
        const stringFormatCategories = keyArray.map(item => item.trim()).join(',');
        router.push(`${pathName}?page=1&per_page=${per_page}&searchString=${searchString}&category=${stringFormatCategories}`)
    }

    const handleCheckboxChange = (row:string) => {
        const updatedCategories = checkedCategories.includes(row)
            ? checkedCategories.filter((item:any) => item !== row)
            : [...checkedCategories, row];

        setCheckedCategories(updatedCategories);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col gap-y-2 mt-4">
                {categoriesData.map((row: string) => (<div key={row} className="flex flex-row gap-x-2">
                    {/*<span>row:{JSON.stringify(row)} - {JSON.stringify(row in allSelectedCategories)} {JSON.stringify(allSelectedCategories)}</span>*/}
                    {/*<span>checkedCategories: {JSON.stringify(checkedCategories)}</span>*/}
                    <input
                        {...register(`${row}`)}
                        type="checkbox"
                        checked={checkedCategories.some((item:any) => item === row)}
                        onChange={() => handleCheckboxChange(row)}
                        name={row}
                        className="w-4 h-4 self-center"/>
                    <label className="self-center">{row} </label>
                </div>))}
            </div>
            <button type="submit"
                    className="bg-slate-800 text-white text-center w-full p-2 rounded-lg mt-4">Filtrele
            </button>
        </form>
    );
};

export default LeftSidebarForm;