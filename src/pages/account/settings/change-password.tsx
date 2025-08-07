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
  ArrowLeft,
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

export default function ChangePasswordPage() {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    let user: any = getCookie("account");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  const onSubmit = async () => {
    try {
      if (payload?.password !== payload?.confirm_password) {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          text: "Password tidak sama!",
        });
        return;
      }
      const result = await axios.patch(
        CONFIG.base_url_api + `/user`,
        { ...payload, id: user?.id, email: user?.email },
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
        text: "Berhasil memperbarui password!",
      });
      setPayload({});
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
    <div className="pb-20 flex flex-col">
      <div className="flex justify-between items-center pt-4 px-4">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
          className="flex gap-2 font-bold"
        >
          <ArrowLeft className="w-5" />
          Kembali
        </button>
      </div>
      <div className="flex-col flex justify-center items-center mt-2 w-full lg:w-1/4">
        <div className="mt-2 w-full px-8">
          <h2 className="text-center text-xl font-semibold">Ubah Password</h2>
          <Input
            label=""
            placeholder="Password Baru"
            type={show ? "text" : "password"}
            name="password"
            onChange={handleChange}
            defaultValue={payload?.password}
          />
          <Input
            label=""
            placeholder="Konfirmasi Password Baru"
            name="confirm_password"
            type={show ? "text" : "password"}
            onChange={handleChange}
            defaultValue={payload?.confirm_password}
          />
          <div className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              onChange={(e) => setShow(e.target.checked)}
              defaultChecked={show}
            />
            <span className="text-xs">Tampilkan password</span>
          </div>
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? "Mengganti..." : "Ubah Password"}
          </Button>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
