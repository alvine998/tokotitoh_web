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
import { getCookie } from "cookies-next";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/config/firebase";
import Swal from "sweetalert2";

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
    console.log(account);
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    const from: any = localStorage.getItem("from");
    setFrom(from);
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

  const onReport = async (e: any) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.target));
      const payload = {
        ...formData,
        images: images,
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
          <div className="p-3 max-w-[350px]">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  from == "myads"
                    ? router.push(`/myads`)
                    : router.push(`/category/${subcat_id}`);
                }}
                className="flex gap-2 font-bold"
              >
                <ArrowLeft className="w-5" />
                Kembali
              </button>
              {from == "myads" ||
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
              )}
            </div>
            <p className="mt-4">
              {ads?.district_name} {">"} {ads?.city_name} {">"}{" "}
              {ads?.province_name}
            </p>
            <OwlCarousel
              center
              responsive={responsive}
              dots
              className="owl-theme"
            >
              {ads?.images?.map((v: any, i: number) => (
                <button
                  type="button"
                  className="w-full"
                  key={i}
                  onClick={() => {
                    setModal({ ...modal, open: true, data: v, key: "view" });
                  }}
                >
                  <Image
                    alt="thumbnail"
                    src={v}
                    layout="relative"
                    width={600}
                    height={400}
                    className="h-[200px] w-full rounded mt-5"
                  />
                </button>
              ))}
            </OwlCarousel>
            <a
              className="float-end"
              target="_blank"
              href={`https://api.whatsapp.com/send?text=https://tokotitoh.co.id/category/${router.query?.subcat_id}/${router.query?.ads_id}`}
            >
              <Image
                alt="sharewa"
                src={"/icons/sharewa.png"}
                layout="relative"
                width={200}
                height={200}
                className="w-full h-6"
              />
            </a>
            <div className="mt-3">
              <h2 className="text-xl">{ads?.title}</h2>
              <h2 className="text-xl font-semibold">
                Rp {toMoney(ads?.price)}
              </h2>
              <p className="border rounded p-3 mt-2">
                Deskripsi: <br />
                {ads?.description}
              </p>
              {(ads?.category_name?.toLowerCase().includes("mobil") &&
                ads?.subcategory_name?.toLowerCase().includes("dijual")) ||
              (ads?.category_name?.toLowerCase().includes("motor") &&
                ads?.subcategory_name?.toLowerCase().includes("dijual")) ? (
                <p className="mt-3">
                  Detail <br />
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
                  {/* Kepemilikan:{" "}
                  {ads?.ownership == "individual" ? "Pribadi" : "Dealer"}
                  <br />
                  <hr /> */}
                </p>
              ) : (
                ""
              )}
              <p>No Telepon: {ads?.wa}</p>
            </div>
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
              <Image
                alt="image"
                src={modal.data}
                layout="relative"
                width={800}
                height={500}
                className="h-[400px] w-full rounded mt-5"
              />
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
                <Input
                  type="file"
                  label="Lampirkan Gambar"
                  onChange={handleImage}
                  accept="image/*"
                />
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
                      <Image
                        alt="images"
                        src={v}
                        layout="relative"
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

          {from == "myads" || ads?.user_id == account?.id ? (
            ""
          ) : (
            <>
              {/* Button WA */}
              <div className="fixed bottom-4 right-4 lg:right-[37%]">
                <Link
                  href={`https://wa.me/${normalizePhoneNumber(ads?.wa)}`}
                  target="_blank"
                >
                  <Button
                    type="button"
                    onClick={addCalls}
                    className={"rounded-full p-2 flex items-center gap-2"}
                  >
                    <PhoneCallIcon className="w-8" />
                    Whatsapp Now
                  </Button>
                </Link>
              </div>
            </>
          )}

          <div className="absolute bottom-0 mt-5 lg:left-[37%] left-0">
            <div className="flex gap-3 items-center pl-5 pt-3">
              <UserCircleIcon className="w-20 h-20" />
              <div>
                <p>Pengiklan</p>
                <h5 className="font-bold text-lg">
                  {user?.name?.toUpperCase()}
                </h5>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
