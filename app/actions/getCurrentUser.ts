import {cookies} from "next/headers";
import axios from "axios";

export default async function getCurrentUser() {
    // try {
    const cookiesData = cookies().get("token")
    const currentTokenVal: any = cookiesData?.value
    const headersValWithToken = `Bearer ${currentTokenVal}`
    try {
        const responseAxios = await axios.get("https://dummyjson.com/auth/me", {
            headers: {
                Authorization: headersValWithToken,
            },
        })
        const dataUser = await responseAxios.data
        return  {"firstName": dataUser.firstName, "lastName": dataUser.lastName, "image": dataUser.image}
    } catch (err: any) {
        console.log(err.response.status)
        return null
    }
}
