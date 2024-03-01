"use client"
import Image from "next/image";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()
    router.push("/product")
    return (
        <div className="">

        </div>
    );
}
