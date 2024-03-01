import React from "react";
import Navbar from "@/components/navbar/navbar";
import {Toaster} from "sonner";


const ProductLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="h-full bg-gray-200 flex flex-col">
            <Toaster richColors position={"top-center"}/>
            {/*<main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-2xl mx-auto">*/}
            <Navbar/>
            {children}
        </main>
    )
}
export default ProductLayout