import React from 'react';
import Image from "next/image";

interface ProductCardProps {

}
const ProdcutCard = () => {
    return (
        <div className="flex flex-col">
            <Image width={175} height={311} src={"/asda"} alt={"product card"}/>
        </div>
    );
};

export default ProdcutCard;