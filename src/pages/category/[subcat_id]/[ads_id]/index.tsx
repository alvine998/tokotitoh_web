import AdsProduct from "@/components/AdsProduct";
import BottomTabs from "@/components/BottomTabs";
import Button from "@/components/Button";
import HeaderAds from "@/components/headers/HeaderAds";
import HeaderHome from "@/components/headers/HeaderHome";
import Modal, { useModal } from "@/components/Modal";
import { CONFIG } from "@/config";
import { normalizePhoneNumber, toMoney } from "@/utils";
import axios from "axios";
import {
  ArrowLeft,
  CarFrontIcon,
  CarIcon,
  ChevronLeftIcon,
  InfoIcon,
  LucideHome,
  PencilIcon,
  PhoneCallIcon,
  PhoneIcon,
  PlusCircleIcon,
  TrashIcon,
  UserCircleIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import { getCookie, setCookie } from "cookies-next";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/config/firebase";
import Swal from "sweetalert2";
import moment from "moment";

const OwlCarousel = dynamic(async () => await import("react-owl-carousel"), {
  ssr: false,
});

export async function getServerSideProps(context: any) {
  try {
    const { page, size } = context.query;
    const { subcat_id, ads_id } = context.params;
    const { req, res } = context;
    let account: any = getCookie("account", { req, res });
    if (account) {
      account = JSON.parse(account);
    }
    const result = await axios.get(
      CONFIG.base_url_api +
        `/ads?id=${ads_id}&pagination=true&page=${+page || 0}&size=${
          +size || 10
        }`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    const user = await axios.get(
      CONFIG.base_url_api +
        `/users?id=${result?.data?.items?.rows[0]?.user_id}`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    return {
      props: {
        ads: result?.data?.items?.rows[0] || {},
        user: user?.data?.items?.rows[0] || {},
        subcat_id,
        ads_id,
        account: account || {},
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

export default function Ads({ ads, user, subcat_id, account }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [show, setShow] = useState<boolean>(false);
  const [from, setFrom] = useState<string>("");
  const [prevLink, setPrevLink] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    const from: any = localStorage.getItem("from");
    const linkBefore: any = localStorage.getItem("linkBefore");
    setFrom(from);
    setPrevLink(linkBefore);
  }, []);

  const [images, setImages] = useState<any>([]);
  const [progress, setProgress] = useState<boolean>(false);

  const handleImage = async (e: any) => {
    setProgress(true);
    if (e.target.files) {
      const file = e.target.files[0];
      if (file?.size <= 2000000) {
        const storageRef = ref(storage, `images/ads/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
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

  const addCalls = async () => {
    try {
      const result = await axios.post(
        CONFIG.base_url_api + `/ads/calls`,
        { id: ads?.id },
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const saveAds = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        CONFIG.base_url_api + `/user`,
        {
          id: account?.id,
          email: account?.email,
          save_ads:
            account?.save_ads !== null
              ? [...JSON.parse(account?.save_ads), ads?.id]
              : [ads?.id],
        },
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      const existUser = await axios.get(
        CONFIG.base_url_api + `/users?id=${account?.id}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      setCookie("account", {
        ...account,
        save_ads: existUser?.data?.items?.rows?.[0]?.save_ads,
      });
      Swal.fire({
        icon: "success",
        text: "Iklan Berhasil Disimpan",
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onReport = async (e: any) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.target));
      const payload = {
        ...formData,
        images: images,
        title: `${formData?.type} - ${formData?.title}`,
      };
      await axios.post(CONFIG.base_url_api + "/report", payload, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      });
      setModal({ ...modal, open: false });
      Swal.fire({
        icon: "success",
        text: "Berhasil melaporkan iklan ini",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Gagal melaporkan iklan ini, harap hubungi admin",
      });
    }
  };
  const responsive: any = {
    0: {
      items: 1,
      margin: 5,
    },
    768: {
      items: 2.5,
      margin: 10,
    },
    1024: {
      items: 1,
      margin: 20,
    },
  };
  return (
    <div className="pb-20 flex flex-col justify-center items-center relative">
      {show ? (
        <>
          <div className="p-3 lg:max-w-[350px] w-full">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  from == "myads"
                    ? router.push(`/myads`)
                    : router.push(prevLink);
                }}
                className="flex gap-2 font-bold"
              >
                <ArrowLeft className="w-5" />
                Kembali
              </button>
              {/* {from == "myads" ||
              ads?.user_id == account?.id ||
              !account?.id ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    setModal({
                      ...modal,
                      open: true,
                      data: ads,
                      key: "report",
                    });
                    setImages([]);
                  }}
                  className="text-red-500"
                >
                  LAPORKAN
                </button>
              )} */}
            </div>
            <OwlCarousel
              center
              responsive={responsive}
              dots
              className="owl-theme mt-2"
            >
              {JSON.parse(ads?.images)?.map((v: any, i: number) => (
                <button
                  type="button"
                  className="w-full"
                  key={i}
                  onClick={() => {
                    setModal({ ...modal, open: true, data: v, key: "view" });
                  }}
                >
                  {/* <Image
                    alt="thumbnail"
                    src={v}
                    layout="relative"
                    width={1020}
                    height={1920}
                    className="h-[250px] sm:h-auto lg:h-[300px] w-[200px] lg:w-[200px] rounded mt-5"
                  /> */}
                  <div className="bg-gray-300 w-full h-[200px] overflow-hidden">
                    <img
                      src={v}
                      alt="thumbnail"
                      className="absolute top-1/2 left-1/2 h-auto w-auto transform -translate-x-1/2 -translate-y-1/2 rounded"
                    />
                  </div>
                </button>
              ))}
            </OwlCarousel>
            <div className="flex justify-between gap-2 items-center">
              <a
                className="bg-gray-700 p-2 w-full rounded text-white text-xs text-center"
                target="_blank"
                href={`https://api.whatsapp.com/send?text=https://tokotitoh.co.id/category/${router.query?.subcat_id}/${router.query?.ads_id}`}
              >
                Bagikan Iklan
              </a>
              <button
                className="bg-gray-700 p-2 w-full rounded text-white text-xs text-center"
                type="button"
                onClick={() => {
                  if (account?.user_id) {
                    setModal({
                      ...modal,
                      open: true,
                      data: ads,
                      key: "report",
                    });
                    setImages([]);
                  } else {
                    router.push("/account");
                  }
                }}
              >
                Laporkan
              </button>
              <button
                className={`bg-gray-700 p-2 w-full rounded text-white text-xs text-center ${
                  account?.save_ads?.includes(ads?.id)
                    ? "opacity-80"
                    : "opacity-100"
                }`}
                type="button"
                onClick={saveAds}
                disabled={account?.save_ads?.includes(ads?.id)}
              >
                {account?.save_ads?.includes(ads?.id)
                  ? "Iklan Tersimpan"
                  : "Simpan Iklan"}
              </button>
            </div>
            <div className="mt-3">
              <h2 className="text-xl">{ads?.title}</h2>
              <h2 className="text-xl font-semibold">
                Rp {toMoney(ads?.price)}
              </h2>
              {ads?.subcategory_name?.toLowerCase() ==
                "alat berat di sewakan" ||
              ads?.subcategory_name?.toLowerCase() == "alat berat di jual" ||
              ads?.subcategory_name?.toLowerCase() == "bus dan truk dijual" ||
              ads?.subcategory_name?.toLowerCase() ==
                "bus dan truk di sewakan" ? (
                <p className="mt-3 text-xs">
                  Tahun: {ads?.year}
                  <br />
                  <hr />
                </p>
              ) : (
                ""
              )}
              {(ads?.category_name?.toLowerCase().includes("mobil") &&
                ads?.subcategory_name?.toLowerCase().includes("dijual")) ||
              (ads?.category_name?.toLowerCase().includes("motor") &&
                ads?.subcategory_name?.toLowerCase().includes("dijual")) ? (
                <p className="mt-3 text-xs">
                  <strong className="text-lg">Detail</strong> <br />
                  <hr />
                  Merek: {ads?.brand_name}
                  <br />
                  <hr />
                  Tipe: {ads?.type_name}
                  <br />
                  <hr />
                  Tahun: {ads?.year}
                  <br />
                  <hr />
                  {/* Warna: {ads?.color}
                  <br />
                  <hr /> */}
                  {/* Trip KM: {toMoney(ads?.km)} km
                  <br />
                  <hr /> */}
                  Transmisi: {ads?.transmission}
                  <br />
                  <hr />
                  Bahan Bakar: {ads?.fuel_type}
                  <br />
                  <hr />
                </p>
              ) : (
                ""
              )}
              {ads?.category_name?.toLowerCase().includes("properti") ? (
                <p className="mt-3 text-xs">
                  Detail <br />
                  <hr />
                  Luas Tanah: {ads?.area || 0} m2
                  <br />
                  <hr />
                  Luas Bangunan: {ads?.building || 0} m2
                  <br />
                  <hr />
                </p>
              ) : (
                ""
              )}
              <p className="text-xs">
                Kota: {ads?.district_name}
                <br />
                <hr />
                Kabupaten/Kota: {ads?.city_name}
                <br />
                <hr />
                Tanggal Iklan Dibuat:{" "}
                {moment(ads?.created_on).format("DD-MM-YYYY")}
                <br />
                <hr />
              </p>
            </div>
            <p className="mt-2 text-md whitespace-pre-line">
              <strong className="text-lg">Deskripsi:</strong> <br />
              {ads?.description}
            </p>
          </div>

          {modal?.key == "view" ? (
            <Modal
              open={modal.open}
              setOpen={() => {
                setModal({ ...modal, open: false });
              }}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setModal({ ...modal, open: false });
                  }}
                >
                  <XCircleIcon className="w-7" />
                </button>
              </div>
              <OwlCarousel
                center
                responsive={responsive}
                dots
                className="owl-theme"
              >
                {JSON.parse(ads?.images)?.map((v: any, i: number) => (
                  <img
                    alt="image"
                    key={i}
                    src={v}
                    // layout="relative"
                    width={800}
                    height={500}
                    className="h-auto w-full rounded mt-5"
                  />
                ))}
              </OwlCarousel>
            </Modal>
          ) : (
            ""
          )}

          {modal?.key == "report" ? (
            <Modal
              open={modal.open}
              setOpen={() => {
                setModal({ ...modal, open: false });
              }}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setModal({ ...modal, open: false });
                  }}
                >
                  <XCircleIcon className="w-7" />
                </button>
              </div>
              <h2 className="text-center text-xl font-bold">
                Laporkan Iklan Ini
              </h2>
              <form onSubmit={onReport}>
                <Input
                  placeholder="Apa yang ingin kamu laporkan?"
                  label=""
                  name="title"
                  required
                />
                <TextArea
                  placeholder="Ketik deskripsi disini..."
                  label=""
                  name="description"
                  required
                />
                <div>
                  <label htmlFor="type">Jenis Laporan:</label>
                  {[
                    "Penipuan",
                    "Produk Terjual",
                    "Duplikat",
                    "Mengandung Unsur Pornografi",
                    "Konten Mengganggu",
                    "Lainnya",
                  ]?.map((v: any, i: number) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="type"
                        id="type"
                        value={v}
                        defaultChecked={i == 0}
                      />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
                {/* <Input
                  type="file"
                  label="Lampirkan Gambar"
                  onChange={handleImage}
                  accept="image/*"
                /> */}
                {progress ? (
                  <p className={progress ? "block" : "hidden"}>
                    Loading Upload....
                  </p>
                ) : (
                  ""
                )}
                <div className="flex flex-wrap mt-5">
                  {images?.map((v: any) => (
                    <button
                      key={v}
                      onClick={() => {
                        setImages(images.filter((val: any) => val !== v));
                      }}
                      className="relative group w-1/3"
                    >
                      <img
                        alt="images"
                        src={v}
                        // layout="relative"
                        width={300}
                        height={300}
                        className="w-full h-[100px]"
                      />
                      <div className="absolute inset-0 bg-red-700 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                        <TrashIcon className="text-white" />{" "}
                        <p className="text-white">Hapus</p>
                      </div>
                    </button>
                  ))}
                </div>
                <input type="hidden" name="user_id" value={account?.id} />
                <input type="hidden" name="user_name" value={account?.name} />
                <input type="hidden" name="ads_id" value={modal?.data?.id} />
                <input
                  type="hidden"
                  name="ads_name"
                  value={modal?.data?.title}
                />
                <Button type="submit" color="danger">
                  Kirim
                </Button>
              </form>
            </Modal>
          ) : (
            ""
          )}

          <div className="pb-2 -ml-10">
            <button
              className="flex gap-3 items-start pt-3 justify-start"
              type="button"
              onClick={() => {
                router.push(`/account/${user?.id}`);
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
              <div>
                <p className="text-left">Pengiklan</p>
                <h5 className="font-bold text-md text-left">
                  {user?.name?.toUpperCase()}
                </h5>
                <p className="text-left text-sm">
                  Bergabung sejak {new Date(user?.created_on)?.getFullYear()}
                </p>
              </div>
            </button>

            <div className="pb-20 w-full px-4">
              <div className="flex gap-2 items-center">
                <p className="text-left font-bold">ID Iklan</p>
                <p className="text-left font-bold">{ads?.id}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="fixed bottom-0 bg-white h-[80px] flex flex-row-reverse justify-between items-center lg:w-[350px] w-full px-5 lg:px-0 gap-2">
        {from == "myads" || ads?.user_id == account?.id ? (
          ""
        ) : (
          <>
            {/* Button Telepon */}
            {/* <div className="w-full">
              <Link
                href={`tel:${normalizePhoneNumber(ads?.wa)}`}
                target="_blank"
              >
                <Button
                  type="button"
                  color="info"
                  onClick={addCalls}
                  className={
                    "rounded-full p-2 flex items-center gap-2 lg:text-md text-sm"
                  }
                >
                  <PhoneIcon className="w-8" />
                  Telepon
                </Button>
              </Link>
            </div> */}
            {/* Button WA */}
            <div className="w-full">
              <Link
                href={`https://wa.me/${normalizePhoneNumber(ads?.wa)}`}
                target="_blank"
              >
                <Button
                  type="button"
                  onClick={addCalls}
                  className={
                    "rounded-full p-2 flex items-center gap-2 lg:text-md text-sm"
                  }
                >
                  <PhoneCallIcon className="w-8" />
                  Whatsapp Now
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
