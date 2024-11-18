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

export default function TermCondition() {
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
                <div className="mt-5 w-full lg:px-8 px-4">
                    <h2 className="font-bold text-center text-lg">Syarat & Ketentuan</h2>
                    <h5 className="text-center font-bold mt-4">
                        Syarat Dan Ketentuan Umum
                    </h5>
                    <p className="mt-3 text-justify">
                        PT LOKOH TITOH INTIATOH adalah suatu perseroan terbatas yang
                        didirikan menurut hukum Indonesia yang menjalankan kegiatan usaha
                        jasa website portal www.tokotitoh.co.id dan / atau aplikasi
                        Tokotitoh yakni situs dan aplikasi mobile jasa penghubung antara
                        Pembeli dan Penjual. Tokotitoh dapat setiap saat, melakukan koreksi,
                        penambahan, perbaikan, atau modifikasi pada konten, presentasi,
                        informasi, layanan, area, basis data, dan elemen lain dari Layanan
                        tersebut, tanpa hal ini tidak menimbulkan hak atas klaim atau
                        kompensasi apa pun, juga tidak menyatakan pengakuan atas tanggung
                        jawab apapun yang menguntungkan Pengguna.
                        <br />
                        <br />
                        Tokotitoh berhak untuk mengubah Syarat dan Ketentuan ini setiap
                        saat. Dengan cara ini, Pengguna setuju untuk meninjau ketentuan ini
                        secara berkala untuk mengikuti perubahan tersebut. Setiap kali
                        pengguna mengakses layanan, itu akan dianggap sebagai penerimaan
                        mutlak atas perubahan Syarat dan Ketentuan ini. Dalam hal Pengguna
                        tidak setuju dengan salah satu Ketentuan, pedoman apa pun atau salah
                        satu perubahannya; atau, tidak puas dengan Tokotitoh karena alasan
                        apapun, Pengguna dapat segera berhenti menggunakan Tokotitoh para
                        pengguna baik pembeli dan penjual diwajibkan untuk waspada terhadap
                        penipuan baik itu dari kualitas barang atau pun kehilangan total
                        segala kerugian yg ada antara penjual dan pembeli bukan tanggung
                        jawab dari Tokotitoh atau PT LOKOH TITOH INTIATOH Layanan hanya
                        tersedia untuk orang yang memiliki kapasitas hukum untuk membuat
                        kontrak. Orang yang tidak memiliki kapasitas tersebut, anak di bawah
                        umur atau Pengguna yang telah ditangguhkan sementara atau
                        dinonaktifkan secara permanen tidak boleh menggunakan layanan.
                        <br />
                        <br />
                        Syarat & Ketentuan yang di bawah ini mengatur pemakaian jasa yang
                        ditawarkan oleh PT LOKOH TITOH INTIATOH dalam penggunaan situs
                        www.tokotitoh.co.id dan / atau aplikasi Tokotitoh. Pengguna
                        diwajibkan membaca dengan seksama karena syarat & ketentuan ini
                        berdampak kepada hak dan kewajiban masing-masing Pengguna
                        berdasarkan hukum.
                        <br />
                        <br />
                        Syarat & Ketentuan merupakan perjanjian antara masing- masing
                        Pengguna dan PT LOKOH TITOH INTIATOH yang berisikan seperangkat
                        kesepakatan yang mengatur hak, kewajiban, tanggung jawab
                        masing-masing Pengguna dan PT Bursa Interaktif Gemilang, serta tata
                        cara penggunaan sistem layanan Pengguna adalah masing-masing subjek
                        hukum yang menggunakan layanan termasuk namun tidak terbatas pada
                        Pembeli, Penjual maupun pihak lain yang sekedar berkunjung ke
                        Tokotitoh
                        <br />
                        <br />
                        Tokotitoh tidak bertanggung jawab atas kebenaran informasi, gambar
                        dan keterangan, Anda disarankan untuk berhubungan langsung dengan
                        pemasang iklan untuk memastikan informasi yang dicari.
                        <br />
                        <br />
                        Setiap informasi yang dibuat oleh pemasang iklan atau terhadap
                        layanan atau produknya. Tanggung jawab isi dan/atau materi iklan
                        yang dipasang oleh pemasang iklan (“Materi”) merupakan tanggung
                        jawab sepenuhnya dari pemasang iklan. Tokotitoh tidak memiliki hak
                        milik atas iklan yang dipasang oleh pengguna, maupun terlibat dalam
                        proses kesepakatan, pembayaran, pengiriman serta proses purna jual
                        di antara penjual dan pembeli. Perikatan untuk penyerahan barang
                        atau jasa yang terjadi melalui Layanan atau sebagai hasil dari
                        kunjungan dan keberhasilan penawaran yang diajukan oleh pengguna
                        dibuat dengan bebas antara penjual dan pembeli.Informasi, gambar dan
                        keterangan lainnya yang terdapat atau diterbitkan dalam Situs ini
                        juga dapat mengandung ketidakakuratan Para pemasang iklan mungkin
                        akan melakukan perubahan atau perbaikan, dan/atau memperbarui
                        informasi yang tertera di dalam Situs dari waktu ke waktu. Tokotitoh
                        Indonesia tidak menanggung kewajiban untuk memperbarui Materi yang
                        telah menjadi kedaluwarsa atau tidak akurat.
                        <br />
                        <br />
                        Tokotitoh tanpa pemberitahuan terlebih dahulu kepada Pengguna,
                        memiliki kewenangan untuk melakukan tindakan yang perlu atas setiap
                        dugaan pelanggaran atau pelanggaran Syarat & Ketentuan dan/atau
                        hukum yang berlaku.
                        <br />
                        <br />
                        Pengguna bertanggung jawab secara pribadi untuk menjaga kerahasiaan
                        akun dan password untuk semua aktivitas yang terjadi dalam akun
                        Pengguna. Tokotitoh tidak akan meminta password akun Pengguna untuk
                        alasan apapun, oleh karena itu menghimbau Pengguna agar tidak
                        memberikan password akun Anda kepada pihak manapun. Pengguna
                        dilarang untuk menciptakan dan/atau menggunakan perangkat, software,
                        fitur dan/atau alat lainnya yang bertujuan untuk melakukan
                        manipulasi pada sistem Tokotitoh. Pengguna juga dilarang mengirimkan
                        e-mail spam dengan merujuk ke bagian apapun dari Tokotitoh.
                        <br />
                        <br />
                        Pengguna menjamin bahwa tidak melanggar hak kekayaan intelektual
                        dalam mengunggah konten Pengguna kedalam Tokotitoh. Setiap Pengguna
                        dengan ini bertanggung jawab secara pribadi atas pelanggaran hak
                        kekayaan intelektual dalam mengunggah konten. Pengguna setuju untuk
                        selalu mengakses dan/atau menggunakan Tokotitoh hanya untuk tujuan
                        yang tidak melanggar hukum, dan dengan cara yang sah dan selanjutnya
                        setuju untuk melakukan kegiatan yang berkaitan dengan itikad baik.
                        <br />
                        Pengguna setuju untuk selalu memastikan bahwa setiap informasi atau
                        data yang Pengguna berikan/masukkan adalah akurat dan setuju untuk
                        bertanggung jawab atas informasi dan data tersebut.
                        <br />
                        <br />
                        Pengguna dengan ini menyatakan bahwa Tokotitoh tidak bertanggung
                        jawab atas kerugian atau kerusakan yang timbul dari penyalahgunaan
                        akun Pengguna.
                        <br />
                        <br />
                        Pengguna tidak diperbolehkan menggunakan layanan untuk melanggar
                        peraturan yang ditetapkan oleh hukum di Indonesia.
                        <br />
                        <br />
                        Pengguna dilarang keras menyampaikan setiap jenis konten apapun yang
                        menyesatkan, memfitnah, atau mencemarkan nama baik, mengandung atau
                        bersinggungan dengan unsur SARA, diskriminasi, melanggar peraturan
                        terkait perlindungan Hak Kekayaan Intelektual dan/atau menyudutkan
                        pihak lain. Tokotitoh tidak bertanggung jawab atas akibat langsung
                        atau tidak langsung dari keputusan Pengguna / Pembeli dalam
                        mengajukan penawaran atau tidak mengajukan penawaran kepada pemasang
                        iklan, melakukan jual beli atau tidak melakukan jual beli dengan
                        pemasang iklan.
                        <br />
                        Pengguna memahami dan menyetujui bahwa penggunaan dan pelaksanaan
                        kegiatan sehubungan di Tokotitoh adalah atas kebijakan dan risiko
                        Pengguna sendiri.
                        <br />
                        <br />
                        <strong>Titip Jual (Consignment)</strong>
                        <br />
                        Pembeli bertanggung jawab untuk membaca, memahami, dan menyetujui
                        informasi / deskripsi sebelum membuat tawaran atau komitmen untuk
                        membeli, dimana informasi / deskripsi yang disediakan tersebut tidak
                        dijamin 100% akurat dan hanya aproksimasi. Segala kerugian yg ada
                        antara penjual dan pembeli bukan tanggung jawab dari Tokotitoh atau
                        PT LOKOH TITOH INTIATOH.
                    </p>

                    <h5 className="text-center font-bold mt-4">Larangan Beriklan</h5>
                    <p className="mt-3 text-justify">
                        Untuk menjaga kualitas layanan dan ketertiban terhadap hukum
                        Indonesia, kepuasan Pengguna, serta pengalaman Pengguna (User
                        Experience), daftar barang dan jasa ini adalah bagian yang tidak
                        terpisah dari Syarat dan Ketentuan.
                        <br />
                        Berikut daftar barang dan jasa yang dilarang dijual di
                        tokotitoh.co.id dan aplikasi Tokotitoh
                        <br />
                        <br />
                        <strong>Kebiakan Khusus Selama Pandemi COVID-19</strong>
                        <br />
                        Berikut daftar iklan / produk yang dilarang tayang selama pandemi
                        COVID-19 :
                        <br />
                        Surat Bebas COVID-19
                        <br />
                        Alat Pelindung Diri (APD) Baju Hazmat
                        <br />
                        Alat Rapid Test COVID-19
                        <br />
                        Alat Swab PCR Test COVID-19
                        <br />
                        Tanah Pemakaman COVID-19 dan jasanya
                        <br />
                        <br />
                        <strong>Umum</strong>
                        <br />
                        Barang atau jasa yang tergolong berbahaya, melanggar hukum,
                        mengancam, melecehkan, menghina,memfitnah, mengintimidasi,
                        menginvasi privasi orang lain atau hak-hak lainnya, meremehkan,
                        berkaitan atau dengan cara apapun atau melanggar hukum dengan cara
                        apapun tidak dapat ditayangkan.
                        <br />
                        Iklan yang masuk dalam kategori ini termasuk, antara lain :
                        <br />
                        Iklan yang merugikan pihak ketiga dalam bentuk apapun
                        <br />
                        Benda-benda atau jasa yang tergolong sensitif dan salah secara
                        moral.
                        <br />
                        Barang hasil kejahatan demi terbentuk nya aplikasi dan website yg
                        terbaik kami melarang penayangan iklan sbb :
                        <br />
                        - Iklan yang menduplikasi iklan lain yang sudah aktif
                        <br />
                        - Iklan yang mengarahkan ke platform, situs, jasa, atau kantor
                        pesaing
                        <br />
                        - Iklan dengan kategori yang tidak sesuai
                        <br />
                        - Iklan dengan foto buram, terbalik, atau bermutu jelek
                        <br />
                        - Iklan dengan foto, deskripsi, dan/atau judul yang tidak sesuai
                        dengan produk/jasa yang dijual.
                        <br />
                        <br />
                        <strong>Iklan Dengan Materi Dewasa</strong>
                        <br />
                        Melarang iklan yang mengandung pornografi, bersifat dewasa, atau
                        materi yang hanya bisa dikonsumsi oleh orang dewasa, seperti :
                        <br />
                        Benda atau gambar yang mengandung pornografi secara terang-terangan,
                        terutama yang menampilkan jenis kelamin pria/wanita dan/atau
                        pornografi yang melibatkan orang-orang dibawah usia dewasa.
                        <br />
                        Benda-benda terkait dengan kekerasan seksual.
                        <br />
                        Alat bantu seks, vibrator, obat seks, obat kuat, enlargement pill
                        (obat pembesar kelamin), perangsang,
                        <br />
                        Jasa lady escort/companion, atau wanita sewaan.
                        <br />
                        Jasa seks komersial.
                        <br />
                        Iklan-iklan yang cabul, atau bersifat atau bahkan secara implisit
                        maupun eksplisit merupakan pornografi
                        <br />
                        <br />
                        <strong>Iklan yang Merugikan Pihak / Kelompok Tertentu</strong>
                        <br />
                        melarang pengguna untuk mengunggah materi yang bersifat melecehkan
                        atau intimidasi, atau yang menghasut kebencian atau mempromosikan
                        kekerasan terhadap individu atau kelompok berdasarkan ras atau asal
                        etnis, agama, kecacatan, jenis kelamin, usia, status veteran, atau
                        orientasi seksual/identitas gender ataupun menghasut atau untuk
                        mendukung bahaya terhadap individu atau kelompok, antara lain :
                        <br />
                        Benda atau gambar atau jasa yang yang melecehkan, mendegradasi, atau
                        mengandung muatan kebencian terhadap individu atau kelompok individu
                        atas dasar agama, jenis kelamin, orientasi seksual, ras, etnis,
                        usia, atau cacat tubuh.
                        <br />
                        Iklan yang menganjurkan /membenarkan kekerasan atau membuat ancaman
                        bahaya terhadap individu atau kelompok.
                        <br />
                        Iklan yang menghasut atau mempromosikan kebencian terhadap kelompok
                        atau individu.
                        <br />
                        Iklan yang mendorong orang lain untuk percaya bahwa suatu kelompok
                        atau individu adalah tidak manusiawi atau lebih rendah.
                        <br />
                        Iklan yang menyerang seseorang atau kelompok atas dasar orientasi
                        seksual atau identitas gender.
                        <br />
                        <br />
                        <strong>
                            Iklan yang Melanggar Hak Kekayaan Intelektual Atau Hak Pihak
                            Ketiga
                        </strong>
                        <br />
                        Termasuk dalam kategori ini adalah iklan-iklan seperti :
                        <br />
                        Barang-barang yang melanggar hak kekayaan intelektual pihak ketiga,
                        termasuk namun tidak terbatas pada :
                        <br />
                        Barang black market/illegal
                        <br />
                        Barang palsu/”KW”
                        <br />
                        Barang imitasi
                        <br />
                        Copy dari original
                        <br />
                        Barang replika
                        <br />
                        Musik, film, software, dan barang-barang lain yang melanggar hak
                        kekayaan intelektual
                        <br />
                        Akun digital termasuk username, email, password (kode identifikasi
                        pengguna), PIN, dst
                        <br />
                        Iklan yang mencakup informasi pribadi atau identifikasi tentang
                        orang lain tanpa persetujuan eksplisit orang itu.
                        <br />
                        Iklan produk yang tidak diizinkan oleh Produsen atau Distributor
                        resmi untuk diperdagangkan melalui internet.
                        <br />
                        <br />
                        <strong>
                            Iklan Narkoba, Obat-obatan, Makanan, Da Minuman Tertentu
                        </strong>
                        <br />
                        Termasuk dalam kategori ini adalah iklan-iklan, seperti misalnya :
                        <br />
                        Obat-obatan terlarang sebagaimana diatur dalam Undang-Undang Nomor
                        35 Tahun 2009 Tentang Narkotika, termasuk Psikotropika dan
                        obat-obatan, terutama obat-obatan, dan zat lain yang dimaksudkan
                        untuk digunakan sebagai pengganti, terlepas dari apakah kepemilikan
                        dan pemasaran zat dan bahan kimia tersebut dilarang oleh hukum atau
                        tidak.
                        <br />
                        Obat-obatan yang berkhasiat untuk menyembuhkan penyakit kanker,
                        tuberkulosis, poliomyelitis, penyakit kelamin, impotensi, tipus,
                        kolera, tekanan darah tinggi, diabetes, liver dan penyakit lain yang
                        ditetapkan oleh Keputusan Menteri Kesehatan RI 386 /MENKES /SK /IV /1994
                        tentang pedoman periklanan : obat bebas, obat tradisional, alat
                        kesehatan, kosmetika, perbekalan kesehatan rumah tangga dan
                        makanan-minuman.
                        <br />
                        Obat-obat yang memerlukan resep atau tindakan langsung oleh dokter,
                        obat bius dan sejenisnya
                        <br />
                        Obat Keras
                        <br />
                        Obat-obatan (termasuk obat-obatan tradisional) yang tidak mempunyai
                        izin edar dan/atau yang materi iklannya belum/tidak disetujui oleh
                        pihak-pihak terkait
                        <br />
                        Makanan, minuman dan obat-obatan yang belum terdaftar/dilarang oleh
                        BPOM.
                        <br />
                        <br />
                        <strong>Iklan Dengan Materi Kekerasan</strong>
                        <br />
                        penayangan iklan dengan gambar grafis atau berdarah seperti
                        pertumpahan darah dan kecelakaan, seperti :
                        <br />
                        Organ tubuh manusia, darah
                        <br />
                        Barang ataupun jasa terkait dengan penyiksaan baik hewan maupun
                        manusia.
                        <br />
                        <br />
                        <strong>Iklan Senjata, Militer, Dan Peledak</strong>
                        <br />
                        Iklan yang menjual, memfasilitasi atau mendukung penjualan senjata
                        dan aksesoris senjata (kecuali aksesoris airsoftgun & aksesoris
                        paintball) termasuk namun tidak terbatas penjualan amunisi, bagian
                        senjata, pistol, senapan, senjata udara, dan senjata bius. Kebijakan
                        ini juga melarang iklan yang menjual bahan peledak, termasuk
                        produk-produk yang berhubungan dengan militer, seperti :
                        <br />
                        Senjata (termasuk senjata api, senapan angin dan benda yang
                        mirip/sejenisnya).
                        <br />
                        Tanda kepangkatan.
                        <br />
                        Atribut instansi pemerintah (Polri, TNI, Dishub, dan sejenisnya).
                        <br />
                        <br />
                        <strong>
                            Iklan yang Memungkinkan Perilaku Penipuan Atau Tidak Jujur
                        </strong>
                        <br />
                        Kami tidak mengizinkan iklan dengan materi yang mendorong atau
                        memfasilitasi aktivitas kecurangan, penyesatan, atau penipuan
                        seperti :
                        <br />
                        Iklan yang bertujuan untuk penipuan dan/atau mendukung penipuan.
                        <br />
                        Pencucian uang.
                        <br />
                        Jasa pemalsuan dokumen, jual ijazah, jual sertifikat.
                        <br />
                        Skema piramida, multi-level marketing, pemasaran afiliasi atau money
                        game.
                        <br />
                        STNK dan atau BPKB yang dijual tidak bersamaan dengan kendaraan yang
                        dimaksud dalam STNK dan atau BPKB tersebut.
                        <br />
                        Penipuan jasa dan lowongan kerja.
                        <br />
                        <br />
                        <strong>Lain-lain</strong>
                        <br />
                        Selain hal-hal di atas, pengguna Tokotitoh juga dilarang untuk
                        mengiklankan (antara-lain):
                        <br />
                        Barang hasil tindak pencurian.
                        <br />
                        ASI (Air Susu Ibu)
                        <br />
                        Penawaran jasa pijat
                        <br />
                        Manusia (human trafficking)
                        <br />
                        Barang baru yang tergolong wajib memiliki SNI, namun tidak memiliki
                        SNI
                        <br />
                        Tanaman & binatang yang dilindungi oleh Negara berdasarkan Undang
                        Undang NOMOR P.26 /MENLHK /SETJEN /KUM.1 /7 /2018 Tentang Konservasi
                        Sumberdaya Alam Hayati dan Ekosistemnya. Termasuk bagian tubuh dari
                        tanaman & binatang tersebut, seperti taring, cakar, kulit, hasil
                        awetan, dll.
                        <br />
                        Benda-benda atau jasa yang berhubungan dengan perjudian, lotre dan
                        taruhan
                        <br />
                        Bahan kimia, beracun dan berbahaya, seperti misalnya: sulfuric acid,
                        carbide (karbit)
                        <br />
                        Iklan pencarian kerja dan penyedia kerja untuk anak di bawah umur 18
                        tahun
                        <br />
                        <br />
                        Tokotitoh berhak untuk memutuskan dan memilih iklan yang ditayangkan
                        dan mencabut iklan kapan saja, tanpa pemberitahuan kepada pengguna,
                        dan secara sepihak. Kebijakan ini dapat berubah sewaktu-waktu.
                    </p>
                </div>
            </div>
        </div>
    );
}
