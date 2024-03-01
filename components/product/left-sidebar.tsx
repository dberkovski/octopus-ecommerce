"use server"
import React from 'react';
import LeftSidebarForm, {categoriesDataProps} from "@/components/product/left-sidebar-form";
import getProductCategories from "@/app/actions/getCategoriesProduct";
import LeftSidebarQuickSearch from "@/components/product/left-sidebar-quick-search";

const LeftSidebar: React.FC = async () => {
    const categoriesData = await getProductCategories()
    return (
        <div className="p-2 gap-y-4">
            <LeftSidebarQuickSearch/>
            <div className="border-b-4 border-black mt-4">
                <header className="text-lg font-bold">Kategoriler</header>
            </div>
            <LeftSidebarForm categoriesData={categoriesData}/>
        </div>
    );
};

export default LeftSidebar;