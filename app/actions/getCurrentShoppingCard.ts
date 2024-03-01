import axios from "axios";

export default async function getCurrentShoppingCard(productId:number) {
    try {
        const responseAxios = await axios.get(`https://dummyjson.com/carts/${productId}`)
        return responseAxios.data
    } catch (err: any) {
        console.log(err.response.status)
        return null
    }
}
