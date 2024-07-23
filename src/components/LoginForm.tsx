import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { CONFIG } from "@/config";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { normalizePhoneNumber } from "@/utils";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { provider } from "@/config/firebase";

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<string>(
    router.query?.type == "reset" ? "reset" : "login"
  );
  const [payload, setPayload] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const loginByGoogle = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      const payloads = {
        ...user
      }

      const result2 = await axios.post(
        CONFIG.base_url_api + `/user/login/by/google`,
        payloads,
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
        text: "Selamat Datang " + result2?.data?.user?.name,
      });
      setPayload({});
      localStorage.setItem("usertokotitoh", JSON.stringify(result2?.data?.user));
      setCookie("account", JSON.stringify(result2?.data?.user), {
        secure: true,
      });
      router.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (type == "login") {
        const result = await axios.post(
          CONFIG.base_url_api + `/user/login`,
          payload,
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
          text: "Selamat Datang " + result?.data?.user?.name,
        });
        setPayload({});
        localStorage.setItem(
          "usertokotitoh",
          JSON.stringify(result?.data?.user)
        );
        setCookie("account", JSON.stringify(result?.data?.user), {
          secure: true,
        });
        router.reload();
      }
      if (type == "register") {
        if (payload?.password !== payload?.password_confirm) {
          return Swal.fire({
            icon: "warning",
            text: "Password tidak sesuai",
          });
        }
        const result = await axios.post(
          CONFIG.base_url_api + `/user`,
          {
            ...payload,
            role: "customer",
            phone: normalizePhoneNumber(payload?.phone),
          },
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
          text: "Pendaftaran Berhasil",
        });
        setPayload({});
        setType("login");
      }
      if (type == "forget") {
        const result = await axios.post(
          CONFIG.base_url_api + `/sendmail`,
          {
            from: "tokotitoh2024@gmail.com",
            to: payload?.email,
          },
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
          text: "Kami telah mengirimkan kode OTP ke email kamu!",
        });
        setPayload({});
        localStorage.setItem("userReset", JSON.stringify(result?.data?.items));
        router.push("/account/verification");
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text:
          error?.response?.data?.error_message ||
          error?.response?.data?.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/4">
      {type == "login" ? (
        <div className="flex-col flex justify-center items-center mt-20">
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
              Login Tokotitoh
            </h2>
            <Input
              label=""
              placeholder="Email / No Telepon"
              name="identity"
              onChange={handleChange}
              defaultValue={""}
            />
            <Input
              label=""
              placeholder="Password"
              name="password"
              type={show ? "text" : "password"}
              defaultValue={""}
              onChange={handleChange}
            />
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  onChange={(e) => setShow(e.target.checked)}
                  defaultChecked={show}
                />
                <span className="text-xs">Tampilkan password</span>
              </div>
              <button
                className="text-xs text-blue-700"
                onClick={() => {
                  setType("forget");
                }}
              >
                Lupa Password
              </button>
            </div>
            <Button onClick={onSubmit} disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
            <p className="text-center">Atau</p>
            <Button
              color="warning"
              type="button"
              onClick={() => setType("register")}
            >
              Daftar
            </Button>
            <Button
              onClick={loginByGoogle}
              className={"mt-5 flex gap-2 justify-center items-center"}
              color="white"
              disabled={loading}
            >
              <Image
                src={"/icons/google.png"}
                alt="icon"
                layout="relative"
                width={25}
                height={25}
                className="w-5 h-5"
              />
              {loading ? "Memproses..." : "Login Dengan Google"}
            </Button>
          </div>
        </div>
      ) : type == "register" ? (
        <div className="flex-col flex justify-center items-center mt-10">
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
              Daftar Tokotitoh
            </h2>
            <Input
              label=""
              placeholder="Nama"
              name="name"
              onChange={handleChange}
            />
            <Input
              label=""
              placeholder="No Telepon"
              name="phone"
              onChange={handleChange}
              type="number"
              maxLength={13}
            />
            <Input
              label=""
              placeholder="Email"
              name="email"
              onChange={handleChange}
              type="email"
            />
            <Input
              label=""
              placeholder="Password"
              name="password"
              type={show ? "text" : "password"}
              onChange={handleChange}
            />
            <Input
              label=""
              placeholder="Konfirmasi Password"
              name="password_confirm"
              type={show ? "text" : "password"}
              onChange={handleChange}
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
              {loading ? "Mendaftarkan..." : "Daftar"}
            </Button>
            <p className="text-center">Atau</p>
            <Button color="warning" onClick={() => setType("login")}>
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-col flex justify-center items-center mt-10">
          <Image
            alt="logo"
            src={"/images/tokotitoh.png"}
            layout="relative"
            width={250}
            height={250}
            className="w-[150px] h-[150px]"
          />
          <div className="mt-2 w-full px-8">
            <h2 className="text-center text-xl font-semibold">Lupa Password</h2>
            <Input
              label=""
              placeholder="Email"
              name="email"
              onChange={handleChange}
              defaultValue={payload?.email}
            />
            <Button onClick={onSubmit} disabled={loading}>
              {loading ? "Mengirim..." : "Kirim"}
            </Button>
            <p className="text-center">Atau</p>
            <Button color="warning" onClick={() => setType("login")}>
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
