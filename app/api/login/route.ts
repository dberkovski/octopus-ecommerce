import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        body["username"] = body["email"]
        delete body["email"]
        try {
            const responseAxios = await axios.post("https://dummyjson.com/auth/login", JSON.stringify(body), {headers: {'Content-Type': 'application/json'}})
            const response = NextResponse.json(
                {success: true},
                {status: 200, headers: {"content-type": "application/json"}}
            );

            response.cookies.set({
                name: "token",
                value: responseAxios.data.token,
                path: "/",
            });
            return response

        } catch (error:any) {
            if (error.response.status === 400) {
                return new NextResponse("Wrong username or password", {status: error.response.status});
            }
            return new NextResponse("Internal Error based dummyjson.com", {status: 500});
        }
    }
    catch (error) {
        console.log("LOGIN ERROR - ", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}