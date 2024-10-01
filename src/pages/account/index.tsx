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
      if (formData?.password) {
        if (formData?.password !== formData?.password_confirm) {
          return Swal.fire({
            icon: "warning",
            text: "Password tidak sesuai",
          });
        }
      }
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
      const result = await axios.delete(CONFIG.base_url_api + `/user?id=${formData?.id}`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      });
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

  const handleImage = async (e: any) => {
    setProgress(true);
    // Set compression options
    const options = {
      maxSizeMB: 0.1, // Maximum size in MB
      maxWidthOrHeight: 1000, // Max width or height (maintains aspect ratio)
      useWebWorker: true, // Use multi-threading for compression
    };
    if (e.target.files) {
      const file = e.target.files[0];
      const compressedFile = await imageCompression(file, options);
      if (file?.size <= 50000000) {
        const storageRef = ref(storage, `images/user/${compressedFile?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImages([...images, downloadURL]);
              setProgress(false);
            });
          }
        );
      } else {
        setProgress(false);
        return Swal.fire({
          icon: "error",
          text: "Ukuran Gambar Tidak Boleh Lebih Dari 2mb",
        });
      }
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
    <div className="pb-20 flex flex-col justify-center items-center">
      {user == null ? (
        <LoginForm />
      ) : (
        <div className="px-4 pt-10 lg:max-w-sm max-w-full">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                setModal({ ...modal, open: true, key: "view", data: user });
              }}
            >
              {user?.image ? (
                <img
                  alt="image"
                  src={user?.image}
                  // layout="relative"
                  width={800}
                  height={500}
                  className="h-20 w-20 rounded-full mt-5"
                />
              ) : (
                <UserCircleIcon className="w-20 h-20" />
              )}
            </button>
            <div>
              <h5 className="font-bold text-lg">{user?.name}</h5>
              <h5 className="text-lg">{user?.email || user?.phone}</h5>
            </div>
          </div>
          <button
            onClick={() => {
              setModal({ ...modal, open: true, key: "edit", data: null });
            }}
            className="w-full bg-blue-500 p-2 rounded text-white mt-4"
          >
            Edit Akun
          </button>
          <div className="py-2">
            <Link href={"https://play.google.com/"}>
              <button type="button" className="border p-2 w-full">
                Download Aplikasi
              </button>
            </Link>
            <button
              type="button"
              onClick={() => {
                router.push("helps/help-center");
              }}
              className="border p-2 w-full"
            >
              Pusat Bantuan
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("helps/call-us");
              }}
              className="border p-2 w-full"
            >
              Hubungi Kami
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("helps/about-us");
              }}
              className="border p-2 w-full"
            >
              Tentang Kami
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("helps/term-condition");
              }}
              className="border p-2 w-full"
            >
              Syarat & Ketentuan
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("helps/privacy-policy");
              }}
              className="border p-2 w-full"
            >
              Kebijakan Privasi
            </button>
          </div>
          <button
            onClick={() => {
              setModal({ ...modal, open: true, data: null, key: "remove" });
            }}
            className="w-full bg-orange-500 p-2 rounded text-white mt-2"
          >
            Hapus Akun
          </button>
          <button
            onClick={() => {
              setModal({ ...modal, open: true, data: null, key: "logout" });
            }}
            className="w-full bg-red-500 p-2 rounded text-white mt-2"
          >
            Logout
          </button>

          {modal?.key == "edit" ? (
            <Modal open={modal.open} setOpen={() => {}}>
              <form onSubmit={update}>
                <h2 className="text-xl font-semibold text-center">
                  Ubah Profil
                </h2>
                <div>
                  <Input
                    label="Foto"
                    name="image"
                    type="file"
                    onChange={(e: any) => {
                      handleImage(e);
                    }}
                    accept="image/*"
                  />
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
                  <Input
                    placeholder="********"
                    minLength={8}
                    label="Password"
                    defaultValue={""}
                    name="password"
                    isPassword
                  />
                  <Input
                    placeholder="********"
                    minLength={8}
                    label="Konfirmasi Password"
                    defaultValue={""}
                    name="password_confirm"
                    isPassword
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
          {modal?.key == "logout" ? (
            <Modal open={modal.open} setOpen={() => {}}>
              <div className="px-2">
                <h2 className="text-xl font-semibold">Logout</h2>
                <div className="mt-2">
                  <p>
                    Apakah anda yakin akan logout dari tokotitoh ? Pastikan anda
                    ingat email/no telepon dan password anda untuk login kembali
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
                  <button
                    type="button"
                    onClick={logout}
                    className="font-semibold text-blue-700"
                  >
                    Ya
                  </button>
                </div>
              </div>
            </Modal>
          ) : (
            ""
          )}
          {modal?.key == "remove" ? (
            <Modal open={modal.open} setOpen={() => {}}>
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
                    <button
                      type="submit"
                      className="font-semibold text-red-700"
                    >
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
            <Modal open={modal.open} setOpen={() => {}}>
              <div className="px-2">
                <img
                  alt="userimage"
                  src={modal?.data?.image}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  // layout="relative"
                />
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
      )}
      <BottomTabs />
    </div>
  );
}
