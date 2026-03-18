import BottomTabs from "@/components/BottomTabs";
import Button from "@/components/Button";
import { CONFIG } from "@/config";
import axios from "axios";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function LoginOtp() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [detail, setDetail] = useState<any>();
  const [time, setTime] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let user: any = localStorage.getItem("userLoginOtp");
    if (!user || user === "undefined") {
      router.push("/account/login");
    } else {
      try {
        user = JSON?.parse(user);
        setDetail(user);
      } catch (e) {
        console.error("Failed to parse userLoginOtp", e);
        localStorage.removeItem("userLoginOtp");
        router.push("/account/login");
      }
    }
  }, [router]);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text");
    if (!/^\d+$/.test(data)) return;

    const pasteData = data.slice(0, 6).split("");
    const newOtp = [...otp];
    pasteData.forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);

    // Focus last character or the next empty one
    const nextIndex = Math.min(pasteData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onResendOTP = async () => {
    if (!detail?.email && !detail?.phone) return;
    setLoading(true);
    try {
      await axios.post(
        CONFIG.base_url_api + `/otp/resend`,
        {
          email: detail?.email || detail?.phone,
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
        text: "Kode OTP Berhasil Dikirim, Silahkan Periksa Email Atau Pesan Anda!",
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message || "Gagal mengirim ulang OTP",
      });
    }
  };

  const onSubmit = async () => {
    const combinedOtp = otp.join("");
    if (combinedOtp.length < 4) return;
    setLoading(true);
    try {
      const result = await axios.post(
        CONFIG.base_url_api + `/otp/verify`,
        { otp: combinedOtp, email: detail?.email || detail?.phone },
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      setLoading(false);
      
      const userData = result?.data?.user || detail;
      localStorage.setItem("usertokotitoh", JSON.stringify(userData));
      setCookie("account", JSON.stringify(userData), {
        secure: true,
      });
      localStorage.removeItem("userLoginOtp");
      
      Swal.fire({
        icon: "success",
        text: `Verifikasi Berhasil, Selamat Datang ${userData?.name}`,
      });
      
      router.push("/account");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message || "OTP yang dimasukkan salah",
      });
    }
  };

  return (
    <div className="pb-20 flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="flex-col flex justify-center items-center w-full lg:w-1/3 bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
        <Image
          alt="logo"
          src={"/images/tokotitoh.png"}
          width={180}
          height={180}
          className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] mb-6"
        />
        <div className="w-full">
          <h2 className="text-center text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Verifikasi OTP
          </h2>
          <p className="text-center text-sm lg:text-base text-gray-500 mb-8 px-4">
            Masukkan 6 digit kode OTP yang telah dikirim ke{" "}
            <span className="font-semibold text-gray-700 block">
              {detail?.email || detail?.phone}
            </span>
          </p>
          
          <div className="space-y-6">
            <div className="flex justify-between gap-2 lg:gap-3" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full h-12 lg:h-14 text-center text-xl lg:text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                />
              ))}
            </div>
            
            <div className="flex justify-center items-center">
              <button
                className={`text-sm font-medium transition-colors ${
                  time === 0 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-gray-400 cursor-not-allowed'
                }`}
                onClick={onResendOTP}
                disabled={time > 0 || loading}
              >
                {time === 0
                  ? "Kirim Ulang Kode OTP"
                  : `Kirim Ulang dalam ${time} detik`}
              </button>
            </div>

            <Button 
              onClick={onSubmit} 
              disabled={loading || otp.join("").length < 4}
              className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi...</span>
                </div>
              ) : (
                "Verifikasi"
              )}
            </Button>
            
            <button
              onClick={() => router.push("/account/login")}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-4"
            >
              Kembali ke Login
            </button>
          </div>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
