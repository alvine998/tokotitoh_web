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

export default function HelpCenter() {
  const router = useRouter();

  return (
    <div className="pb-20 flex flex-col">
      <button
        onClick={() => {
          router.push("/account");
        }}
        className="flex gap-2 items-center mt-4 font-bold ml-2"
      >
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
          <h2 className="font-bold text-center text-lg">Pusat Bantuan</h2>
          <p className="mt-3 text-justify">
            <strong>Cara Mendaftar Akun Tokotitoh</strong>
            <br />
            Anda memiliki 2 pilihan:
            <br />
            <br />
            Melalui Google
            <br />
            Pengguna dapat login melalui Google, sesuai dengan email yang
            digunakan pada akun Google yang sinkron di handphone Anda. Pastikan
            memasukkan kata sandi Google yang valid.
            <br />
            <br />
            Melalui Email
            <br />
            Anda dapat mendaftarkan email Anda untuk login Tokotitoh, dan saat
            Anda memasukkan email Anda. Anda akan menerima email kode
            verifikasi, jika kode verifikasi yang Anda masukan benar Anda akan
            diarahkan untuk membuat password.
          </p>

          <p className="mt-3 text-justify">
            <strong>Edit Profil</strong>
            <br />
            1. Cara mengubah email dan nomor HP
            <br />
            2. Anda dapat mengubah data tersebut.
            <br />
            3. Pilih &quot;Menu&quot; &gt; &quot;Pengaturan&quot; &gt;
            <br />
            4. Klik &quot;Alamat Email/ID Masuk&quot; atau &quot;Nomor Handphone&quot;
            <br />
            5. Lalu masukkan alamat email atau nomor HP baru
            <br />
            6. dan klik tombol &quot;Ubah&quot;.
            <br />
            Ketika mengubah email, Anda akan diminta untuk mengisi kata sandi
            akun Anda.
            <br />
            Ketika mengubah nomor HP, Anda akan diminta untuk melakukan
            verifikasi nomor HP baru anda
          </p>

          <p className="mt-3 text-justify">
            <strong>Lupa Password</strong>
            <br />
            1. Klik &quot;Lupa Password&quot; pada laman &quot;Masuk/Daftar&quot;.
            <br />
            2. Masukkan alamat email yang telah Anda daftarkan lalu klik tombol
            &quot;Kirim&quot;.
            <br />
            3. Kami akan mengirimkan link ke email Anda untuk membuat password
            baru.
            <br />
            4. Klik tombol &quot;Buat Password&quot; pada email yang kami kirimkan.
            <br />
            5. Masukkan password baru Anda, lalu klik tombol &quot;Ubah Password&quot;.
          </p>

          <p className="mt-3 text-justify">
            <strong>Cara Pasang Iklan</strong>
            <br />
            1. Klik tombol &quot;Sell&quot;.
            <br />
            2. Pilih kategori produk yang Anda ingin jual.
            <br />
            3. Isi detail iklan Anda.
            <br />
            4. Tambahkan foto produk (maksimal 10 foto). Lebih banyak foto,
            semakin menarik iklan Anda.
            <br />
            5. Pilih lokasi Anda.
            <br />
            6. Isi detail alamat pick-up.
            <br />
            7. Cantumkan harga.
            <br />
            8. Klik pasang iklan dan iklan Anda akan langsung tayang.
          </p>

          <p className="mt-3 text-justify">
            <strong>Cara Beli Barang Atau Jasa</strong>
            <br />
            1. Cari iklan yg sesuai dengan keinginan Anda, bisa dengan bantuan
            Search ataupun Pemfilteran
            <br />
            2. Cari lokasi yang sesuai
            <br />
            3. Hubungi Pengiklan melalui telepon atau whatsapp
            <br />
            4. Buat appointment dengan Penjual
            <br />
            5. Hindari membeli tanpa COD
          </p>
        </div>
      </div>
    </div>
  );
}
