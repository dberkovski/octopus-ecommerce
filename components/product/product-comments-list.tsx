import React from 'react';
import ProductCommentBox, {ProductCommentBoxProps} from "@/components/product/product-comment-box";
import getRelatedComments from "@/app/actions/getRelatedComments";

interface ProductCommentListProps {
    productId: number
}

const ProductCommentsList: React.FC<ProductCommentListProps> = async ({productId}) => {
    // @ts-ignore
    const {comments, total} = await getRelatedComments(productId)

    return (
        <div className="h-full flex flex-col max-h-48 overflow-auto">
            <header className="font-bold ">Ürüm Yorumları</header>
            <div className="flex flex-col gap-y-2 ">
                {comments.map((row: ProductCommentBoxProps) => (
                    <ProductCommentBox id={row.id} body={row.body} user={row.user} postId={row.postId}/>))}
            </div>

        </div>
    );
};

export default ProductCommentsList;