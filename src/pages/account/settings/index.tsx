import BottomTabs from "@/components/BottomTabs";
import Button from "@/components/Button";
import HeaderHome from "@/components/headers/HeaderHome";
import Input from "@/components/Input";
import LoginForm from "@/components/LoginForm";
import Modal, { useModal } from "@/components/Modal";
import { CONFIG } from "@/config";
import { storage } from "@/config/firebase";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imageCompression from "browser-image-compression";
import {
  ArrowLeft,
  CarFrontIcon,
  CarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
  LockIcon,
  LucideHome,
  PlusCircleIcon,
  Trash2Icon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export async function getServerSideProps(context: any) {
  try {
    const { page, size, search } = context.query;
    const { req, res } = context;
    let user: any = getCookie("account", { req, res }) || null;
    if (!user) {
      return {
        redirect: {
          destination: "/account/login",
          permanent: false,
        },
      };
    }
    user = JSON.parse(user);

    return {
      props: {
        user: user || null,
      },
    };
  } catch (error: any) {
    console.log(error);
    if (error?.response?.status == 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        error: error?.response?.data?.message,
      },
    };
  }
}

export default function AccountSettingsPage() {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [user, setUser] = useState<any>(null);

  const logout = async () => {
    localStorage.removeItem("usertokotitoh");
    deleteCookie("account");
    router.reload();
  };

  const [images, setImages] = useState<any>(user?.image || []);
  const [progress, setProgress] = useState<boolean>(false);

  const update = async (e: any) => {
    e?.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      // if (formData?.password) {
      //   if (formData?.password !== formData?.password_confirm) {
      //     return Swal.fire({
      //       icon: "warning",
      //       text: "Password tidak sesuai",
      //     });
      //   }
      // }
      const payload = {
        ...formData,
        image: images[0],
      };
      const result = await axios.patch(CONFIG.base_url_api + `/user`, payload, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      });
      Swal.fire({
        icon: "success",
        text: "Data Berhasil Disimpan",
      });
      setCookie("account", {
        ...user,
        name: formData?.name,
        phone: formData?.phone,
        email: formData?.email,
        image: images[0],
      });
      setModal({ ...modal, open: false });
      router.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Data Gagal Disimpan",
      });
    }
  };

  const remove = async (e: any) => {
    e?.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      const result = await axios.delete(
        CONFIG.base_url_api + `/user?id=${formData?.id}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Akun Berhasil Dihapus",
      });
      deleteCookie("account");
      setModal({ ...modal, open: false });
      router.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Data Gagal Disimpan",
      });
    }
  };

  useEffect(() => {
    let user: any = getCookie("account");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);
  return (
    <div className="pb-20 flex flex-col">
      <div className="flex justify-between items-center w-full px-2 pt-4">
        <button
          type="button"
          onClick={() => {
            router.push("/account");
          }}
          className="flex gap-2 font-bold"
        >
          <ArrowLeft className="w-5" />
        </button>
        <h5 className="text-lg">Pengaturan Akun</h5>
        <div></div>
      </div>
      <div className="px-2 pt-4 lg:max-w-sm max-w-full">
        <div className="py-2">
          <button
            type="button"
            onClick={() => {
              router.push("/account/settings/change-password");
            }}
            className="border-b p-2 w-full text-lg flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <LockIcon className="w-5 h-5 text-gray-500" />
              Ubah Password
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button
            type="button"
            onClick={() => {
              setModal({ ...modal, open: true, data: null, key: "remove" });
            }}
            className="border-b p-2 w-full text-lg flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <Trash2Icon className="w-5 h-5 text-gray-500" />
              Hapus Akun
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {modal?.key == "edit" ? (
          <Modal open={modal.open} setOpen={() => { }}>
            <form onSubmit={update}>
              <h2 className="text-2xl font-semibold text-center">
                Ubah Profil
              </h2>
              <div>
                <Input
                  placeholder="Masukkan Nama"
                  label="Nama"
                  defaultValue={user?.name || ""}
                  name="name"
                  required
                />
                <Input
                  placeholder="Masukkan Email"
                  label="Email"
                  defaultValue={user?.email || ""}
                  name="email"
                  type="email"
                />
                <Input
                  placeholder="Masukkan No Telepon"
                  label="No Telepon"
                  defaultValue={user?.phone || ""}
                  name="phone"
                  type="number"
                />
                <input type="hidden" name="id" value={user?.id} />
              </div>
              <Button type="submit">Simpan</Button>
              <Button
                type="button"
                onClick={() => {
                  setModal({ ...modal, open: false });
                }}
                color="white"
              >
                Kembali
              </Button>
            </form>
          </Modal>
        ) : (
          ""
        )}
        {modal?.key == "remove" ? (
          <Modal open={modal.open} setOpen={() => { }}>
            <div className="px-2">
              <form onSubmit={remove}>
                <h2 className="text-xl font-semibold">Hapus Akun</h2>
                <input type="hidden" name="id" value={user?.id} />
                <div className="mt-2">
                  <p>
                    Apakah anda yakin ingin menghapus akun ini dari tokotitoh ?
                  </p>
                </div>
                <div className="flex gap-10 justify-end items-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setModal({ ...modal, open: false });
                    }}
                    className="font-semibold text-blue-700"
                  >
                    Batalkan
                  </button>
                  <button type="submit" className="font-semibold text-red-700">
                    Hapus
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        ) : (
          ""
        )}
        {modal?.key == "view" ? (
          <Modal open={modal.open} setOpen={() => { }}>
            <div className="px-2">
              <div className="w-full h-auto relative min-h-[300px]">
                <Image
                  alt="userimage"
                  src={modal?.data?.image}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex gap-10 justify-end items-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModal({ ...modal, open: false });
                  }}
                  className="font-semibold text-blue-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
      <BottomTabs />
    </div>
  );
}
