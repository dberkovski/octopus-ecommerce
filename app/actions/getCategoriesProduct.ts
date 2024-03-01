import axios from "axios";

export default async function getProductCategories() {
    try {
        const responseAxios = await axios.get(`https://dummyjson.com/products/categories`)
        return responseAxios.data
    } catch (err: any) {
        console.log(err.response.status)
        return null
    }
}
