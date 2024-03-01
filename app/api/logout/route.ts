// pages/api/clearCookies.ts

import {NextApiResponse} from 'next';
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request, res: NextApiResponse) {
    cookies().delete("token")
    return NextResponse.json({status:200})
}
