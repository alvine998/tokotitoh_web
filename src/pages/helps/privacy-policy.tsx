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

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="pb-20 flex flex-col">
      <button
        onClick={() => {
          router.push("/account");
        }}
        className="flex gap-2 items-center mt-4 font-bold ml-2 text-lg"
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
          <h2 className="font-bold text-center text-2xl">Kebijakan Privasi</h2>
          <p className="mt-3 text-justify text-lg">
            TOKOTITOH sangat menghargai privasi Anda, Kebijakan Privasi ini
            merupakan komitmen dari PT LOKOH TITOH INTIATOH untuk menghargai dan
            melindungi setiap informasi pribadi Pengguna situs
            www.tokotitoh.co.id dan aplikasi Tokotitoh. Kami hanya akan
            mengumpulkan informasi yang diperlukan dan yang relevan dengan
            transaksi antara Tokotitoh dengan para Pengguna layanan dan selalu
            aktif berupaya untuk menjaga keamanan data pribadi Anda. Pernyataan
            privasi ini akan menjelaskan bagaimana kami menangani data pribadi
            Anda, hak privasi Anda dan menjelaskan perlindungan yang diberikan
            oleh hukum terhadap data Anda.
            <br />
            <br />
            Pernyataan privasi ini berlaku untuk penggunaan atas produk,
            layanan, konten, fitur, teknologi, atau fungsi apa pun, dan semua
            situs web terkait, aplikasi seluler, situs seluler, atau properti
            atau aplikasi online lainnya yang kami tawarkan kepada Anda. Dengan
            menggunakan Pengguna dianggap telah membaca, memahami dan menyetujui
            pengumpulan dan penggunaan data pribadi Pengguna tokotitoh.co.id
            menyarankan agar anda membaca secara seksama dan memeriksa halaman
            Kebijakan Privasi ini dari waktu ke waktu untuk mengetahui perubahan
            apapun.
            <br />
            <br />
            <strong>Pengumpulan Informasi Pengguna</strong>
            <br />
            Ketika Pengguna membuat akun di website tokotitoh.co.id atau
            aplikasi Tokotitoh informasi Pengguna yang kami kumpulkan dapat
            meliputi : Nama, Email, Nomor Ponsel, Dan Lain-lain.
            <br />
            <br />
            Saat membuat akun Pengguna harus menyerahkan informasi yang akurat,
            lengkap dan tidak menyesatkan. Pengguna harus tetap memperbarui dan
            menginformasikannya apabila ada perubahan. Kami berhak meminta
            dokumentasi untuk melakukan verifikasi informasi yang Pengguna
            berikan.
            <br />
            <br />
            Tokotitoh hanya akan dapat mengumpulkan informasi pribadi Pengguna
            jika Pengguna secara sukarela menyerahkan informasi tersebut. Jika
            Pengguna memilih untuk tidak mengirimkan informasi pribadi Pengguna
            kepada tokotitoh atau kemudian menarik persetujuan menggunakan
            informasi pribadi Pengguna, maka hal itu dapat menyebabkan kami
            tidak dapat menyediakan layanan kepada Pengguna.
            <br />
            <br />
            Tokotitoh dapat menggunakan keseluruhan informasi / data Pengguna
            sebagai acuan untuk upaya peningkatan produk dan pelayanan.
            <br />
            <br />
            Tokotitoh dapat menggunakan keseluruhan informasi / data Pengguna
            untuk kebutuhan transaksi tentang riset pasar, promosi Barang,
            penawaran khusus, maupun informasi lain, dimana Tokotitoh dapat
            menghubungi Pengguna melalui email, surat, telepon, sms, atau media
            elektronik lainnya.
            <br />
            <br />
            Tokotitoh dapat menghubungi Pengguna melalui email, surat, telepon,
            sms, atau media elektronik lainnya termasuk namun tidak terbatas,
            untuk membantu dan/atau menyelesaikan proses transaksi jual-beli
            antar Pengguna.
            <br />
            <br />
            Tokotitoh mungkin menggunakan cookies dan teknologi serupa lainnya
            untuk menyimpan informasi sehingga memungkinkan Pengguna untuk
            mengakses layanan secara optimal serta meningkatkan performa
            layanan.
            <br />
            <br />
            Tokotitoh melindungi segala informasi yang diberikan Pengguna pada
            saat pendaftaran, mengakses, dan menggunakan layanan Tokotitoh.
            <br />
            <br />
            Tokotitoh tidak bertanggung jawab atas pertukaran data yang
            dilakukan sendiri di antara Pengguna.
            <br />
            <br />
            tokotitoh.co.id dan aplikasi tokotitoh hanya dapat memberitahukan
            data dan informasi yang dimiliki oleh Pengguna bila diwajibkan
            dan/atau diminta oleh institusi yang berwenang berdasarkan ketentuan
            hukum yang berlaku, perintah resmi dari pengadilan, dan/atau
            perintah resmi dari instansi/aparat penegak hukum yang bersangkutan.
            Dalam hal ini Pengguna setuju untuk tidak melakukan tuntutan apapun
            terhadap Tokotitoh dan/atau PT Bursa Interaktif Gemilang untuk
            pengungkapan informasi pribadi Pengguna.
            <br />
            <br />
            Tokotitoh akan mengumpulkan dan mengolah data mengenai kunjungan
            Pengguna data lokasi, weblog, tautan ataupun data komunikasi
            lainnya.
            <br />
            <br />
            Pada saat Pengguna menghubungi kami, kami menyimpan catatan mengenai
            korespondensi tersebut dan isi dari komunikasi antara Pengguna dan
            tokotitoh
            <br />
            <br />
            Kami menggunakan nomor ponsel Anda, data log, dan pengidentifikasi
            perangkat unik untuk mengelola dan melindungi Layanan kami (termasuk
            pemecahan masalah, analisis data, pengujian, pencegahan penipuan,
            pemeliharaan sistem, dukungan, pelaporan, dan hosting data).
            <br />
            <br />
            <strong>
              Tindakan Teknis dan Organisasi & Pemrosesan Keamanan
            </strong>
            <br />
            Semua informasi yang kami terima tentang Anda disimpan di server
            aman dan kami telah menerapkan langkah-langkah teknis dan organisasi
            yang sesuai dan diperlukan untuk melindungi data pribadi Anda.
            <br />
            <br />
            Tokotitoh terus mengevaluasi keamanan jaringannya yang dirancang
            untuk membantu mengamankan data Anda dari kehilangan, akses atau
            pengungkapan yang tidak disengaja atau melanggar hukum,
            mengidentifikasi risiko yang dapat diduga secara wajar terhadap
            keamanan jaringan , dan meminimalkan risiko keamanan, termasuk
            melalui penilaian risiko dan pengujian rutin.
            <br />
            <br />
            Harap dicatat, meskipun kami telah melakukan langkah-langkah yang
            kami terapkan untuk melindungi data Anda, transfer data melalui
            Internet atau jaringan terbuka lainnya tidak pernah sepenuhnya aman
            dan ada risiko bahwa data pribadi Anda dapat diakses oleh pihak
            ketiga yang tidak sah.
            <br />
            <br />
            Untuk keluhan perlindungan data anda dapat menggunakan hubungi kami,
            Tokotitoh akan melakukan penghapusan data jika Pengguna memintanya.
            Silahkan menghubungi pada Layanan Pelanggan kami dengan menyertakan
            alamat email dan nama Pengguna.
          </p>
        </div>
      </div>
    </div>
  );
}
