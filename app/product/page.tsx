import React from 'react';
import ProductList from "@/components/product/product-list";
import LeftSidebar from "@/components/product/left-sidebar";

const Product = async () => {
    return (
        <div className="h-full bg-gray-200">
            <div  className={`flex flex-row p-4 bg-gray-200 gap-x-4`}>
                <LeftSidebar/>
                <ProductList/>
            </div>

        </div>
    );
};

export default Product;