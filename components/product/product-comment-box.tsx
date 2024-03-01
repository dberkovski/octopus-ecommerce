import React from 'react';
import FilledStar from "@/public/icons/star-filled.svg"
import UnFilledStar from "@/public/icons/star-filled.svg"

export interface ProductCommentBoxProps {
    id: number,
    body: string
    user: {
        id: number,
        username: string
    },
    postId: number
}

const ProductCommentBox: React.FC<ProductCommentBoxProps> = async ({id, user, postId, body}) => {
    return (
        <div className="flex flex-col w-full" key={id}>
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <span className="font-bold">{user.username}</span>
                    <div className="flex flex-row ml-2">
                        <FilledStar/>
                        <FilledStar/>
                        <FilledStar/>
                        <FilledStar/>
                        <UnFilledStar className="opacity-50"/>
                    </div>
                </div>
                <div className="flex-col text-sm">
                    {body}
                    {/*<span className="text-octGreen font-bold"> Daha Fazla goster</span>*/}
                </div>
            </div>
        </div>
    );
};

export default ProductCommentBox;