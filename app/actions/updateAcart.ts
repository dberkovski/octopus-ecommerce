import axios from "axios";

export default async function updateACart(productId: number) {
    try {
        const responseAxios = await axios.put(`https://dummyjson.com/carts/${productId}`, {
            merge: true,
            products: [
                {
                    id: productId,
                    quantity: 1,
                },
            ]
        })
        return responseAxios.data
    } catch (err: any) {
        console.log(err.response.status)
        return null
    }
}