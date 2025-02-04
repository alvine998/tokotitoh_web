import BottomTabs from "@/components/BottomTabs";
import Button from "@/components/Button";
import HeaderHome from "@/components/headers/HeaderHome";
import Input from "@/components/Input";
import LoginForm from "@/components/LoginForm";
import Modal, { useModal } from "@/components/Modal";
import { CONFIG } from "@/config";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
    ArrowLeftCircle,
    CarFrontIcon,
    CarIcon,
    ChevronLeftIcon,
    InfoIcon,
    LucideHome,
    PlusCircleIcon,
    UserCircleIcon,
    UserIcon,
    XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AboutUs() {
    const router = useRouter();

    return (
        <div className="pb-20 flex flex-col">
            <button onClick={() => { router.push("/account") }} className="flex gap-2 items-center mt-4 font-bold ml-2 text-lg">
                <ArrowLeftCircle /> Kembali
            </button>
            <div className="flex-col flex justify-center items-center mt-10 w-full">
                <Image
                    alt="logo"
                    src={"/images/tokotitoh.png"}
                    layout="relative"
                    width={250}
                    height={250}
                    className="w-[150px] h-[150px]"
                />
                <div className="mt-5 w-full px-8">
                    <h2 className="font-bold text-center text-2xl">Hubungi Kami</h2>
                    <p className="mt-3 text-justify text-lg">
                        Jika Anda menemukan kendala dalam penggunaan aplikasi kami. Silahkan hubungi customer service kami melalui :<br/><br/>
                        Email: <strong>cs@tokotitoh.co.id</strong><br/>
                        Whatsapp: <strong>(+62) 852-1302-6262</strong><br/><br/>
                        Kritik, saran, dan masukan Anda sangat berharga bagi kami.
                    </p>
                </div>
            </div>
        </div>
    );
}
