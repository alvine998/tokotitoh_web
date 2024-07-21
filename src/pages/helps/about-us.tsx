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
            <button onClick={() => { router.push("/") }} className="flex gap-2 items-center mt-4 font-bold ml-2">
                <ArrowLeftCircle /> Beranda
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
                    <h2 className="font-bold text-center text-lg">Tentang Kami</h2>
                    <p className="mt-3 text-justify">
                        Tokotitoh adalah merupakan layanan online untuk masyarakat khususnya
                        pengguna di Indonesia dalam transaksi jual beli barang atau jasa.
                        Tototitoh berusaha sebaik mungkin membangun transaksi di antara para
                        pengguna untuk lebih saling menguntungkan cepat aman dan jujur.
                        Ssebagai website dan aplikasi online Tokotitoh berharap para
                        pengguna dapat menggunakan dan menikmati layanan kami sebaik
                        mungkin.
                    </p>
                </div>
            </div>
        </div>
    );
}
