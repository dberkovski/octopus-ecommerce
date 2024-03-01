"use client"
import React, {ReactNode} from 'react';
import {IconType} from "react-icons";

interface MenuItemProps {
    onClick: () => void;
    label: string
    icon?: ReactNode
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label, icon}) => {
    return (
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold flex flex-row ">
            {label}
            {icon}
        </div>
    );
};

export default MenuItem;