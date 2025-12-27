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

export default function Account() {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [loading, setLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [time, setTime] = useState<number>(0);
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  useEffect(() => {
    let user: any = localStorage.getItem("userVerificationRegistration");
    if (!user) {
      router.push("/account");
    } else {
      user = JSON?.parse(user);
      setDetail(user);
    }
  }, [router]);

  useEffect(() => {
    if (time <= 0) return; // Stop when it reaches 0

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [time]);

  const onResendOTP = async () => {
    setLoading(true);
    try {
      await axios.post(
        CONFIG.base_url_api + `/sendmail/verification/registration`,
        {
          from: "tokotitoh2024@gmail.com",
          to: detail?.email,
        },
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      setLoading(false);
      setTime(60);
      Swal.fire({
        icon: "success",
        text: "Kode OTP Berhasil Dikirim, Silahkan Periksa Email Anda!",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      const result = await axios.post(
        CONFIG.base_url_api + `/user/verification/registration`,
        { ...payload, id: detail?.id, email: detail?.email },
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      setLoading(false);
      Swal.fire({
        icon: "success",
        text: "Verifikasi Berhasil",
      });
      setPayload({});
      localStorage.removeItem("userVerificationRegistration")
      router.push("/account");
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message,
      });
    }
  };

  return (
    <div className="pb-20 flex flex-col justify-center items-center">
      <div className="flex-col flex justify-center items-center mt-10 w-full lg:w-1/4">
        <Image
          alt="logo"
          src={"/images/tokotitoh.png"}
          layout="relative"
          width={250}
          height={250}
          className="w-[150px] h-[150px]"
        />
        <div className="mt-2 w-full px-8">
          <h2 className="text-center text-xl font-semibold">
            Verifikasi Pendaftaran
          </h2>
          <Input
            label=""
            placeholder="Masukkan Kode OTP"
            type={"number"}
            name="otp"
            onChange={handleChange}
            defaultValue={payload?.otp}
          />
          <div className="flex justify-end items-end">
            <button
              className={`text-xs ${time == 0 ? 'text-blue-700' : 'text-red-500'}`}
              onClick={() => {
                onResendOTP();
              }}
              disabled={time > 0}
            >
              {time == 0
                ? "Kirim Ulang Kode OTP"
                : `Tunggu ${time} detik untuk kirim ulang OTP`}
            </button>
          </div>
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? "Menmverifikasi..." : "Verifikasi"}
          </Button>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
