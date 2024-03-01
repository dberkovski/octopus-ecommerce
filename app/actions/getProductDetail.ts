import axios from "axios";

export default async function getProductDetail(productId: number) {
    try {
        const responseAxios = await axios.get(`https://dummyjson.com/products/${productId}`)
        return responseAxios.data
    } catch (err: any) {
        console.log(err.response.status)
        return null
    }
}
