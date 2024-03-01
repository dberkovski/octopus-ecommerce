import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(
    request: Request
) {
    const productList = await axios.get("https://dummyjson.com/products")
    console.log("asd-",productList.data)
    return NextResponse.json()
}