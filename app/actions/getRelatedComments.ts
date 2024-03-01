import axios from "axios";

export default async function getRelatedComments(commentId: number) {
    try {
        const responseAxios = await axios.get(`https://dummyjson.com/comments/${commentId}`)
        // const responseAxios = await axios.get(`https://dummyjson.com/comments/post/${commentId}`)
        // return responseAxios.data
        return {
            comments : [responseAxios.data],
            total : [responseAxios.data].length
        }
    } catch (err: any) {
        console.log(err.response.status)
        return null
    }
}
