import AdsProduct from "@/components/AdsProduct";
import BottomTabs from "@/components/BottomTabs";
import HeaderAds from "@/components/headers/HeaderAds";
import HeaderHome from "@/components/headers/HeaderHome";
import HeaderMyAds from "@/components/headers/HeaderMyAds";
import LoginForm from "@/components/LoginForm";
import Modal, { useModal } from "@/components/Modal";
import { CONFIG } from "@/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  CarFrontIcon,
  CarIcon,
  ChevronLeftIcon,
  InfoIcon,
  LucideHome,
  MailCheckIcon,
  PlusCircleIcon,
  PlusIcon,
  UserCircleIcon,
  XCircleIcon,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export async function getServerSideProps(context: any) {
  try {
    const { page, size, search } = context.query;
    const { req, res, params } = context;
    let result: any = [];

    let detailBuyer: any = await axios.get(
      CONFIG.base_url_api + `/users?id=${params?.user_id}`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    detailBuyer = detailBuyer.data.items.rows[0];

    if (detailBuyer) {
      result = await axios.get(
        CONFIG.base_url_api +
          `/ads?user_id=${detailBuyer?.id || 0}&pagination=true&page=${
            +page || 0
          }&size=${+size || 999}&search=${search || ""}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
    }
    return {
      props: {
        ads: result?.data?.items?.rows || [],
        detailBuyer: detailBuyer,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        error: error?.response?.data?.message,
      },
    };
  }
}

export default function MyAds({ ads, detailBuyer }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [filter, setFilter] = useState<any>(router.query);

  useEffect(() => {
    const queryFilter = new URLSearchParams(filter).toString();
    router.push(`?${queryFilter}`);
  }, [filter]);

  const onRoute = async (v: any) => {
    await localStorage.setItem("from", "myads");
    router.push(`/category/${v?.subcategory_id}/${v?.id}`);
  };
  return (
    <div className="pb-20 flex flex-col justify-center items-center">
      <div className="">
        <div className="p-2 flex gap-2">
          {detailBuyer?.image ? (
            <img
              alt="image"
              src={detailBuyer?.image}
              // layout="relative"
              width={800}
              height={500}
              className="h-24 w-24 rounded-full mt-5"
            />
          ) : (
            <UserCircleIcon className="w-20 h-20" />
          )}
          <div className="mt-4">
            <p className="text-2xl font-semibold">
              {detailBuyer?.name?.toUpperCase()}
            </p>
            <div className="flex flex-col items-start">
              <div>
                <p className="text-lg">Pengguna terverifikasi</p>
              </div>
              <p className="text-lg text-gray-500">
                Anggota sejak{" "}
                {moment(detailBuyer?.created_on).format("MM YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-2 w-full">
          {ads?.length > 0 ? (
            <div className="grid lg:gap-4 gap-2 grid-cols-2">
              {ads?.map((v: any, i: number) => (
                <div
                  key={i}
                  className="lg:w-[200px] md:w-full sm:w-full w-[180px] h-auto"
                >
                  <AdsProduct
                    status={v?.status}
                    price={v?.price}
                    thumbnail={JSON.parse(v?.images)[0]}
                    title={v?.title}
                    onClick={() => onRoute(v)}
                    views={v?.views}
                    calls={v?.calls}
                    id={v?.id}
                    brand_id={v?.brand_id}
                    category_id={v?.category_id}
                    account_id={detailBuyer?.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h5 className="text-center text-2xl font-bold">
                Iklan Tidak Ditemukan!
              </h5>
              <Link href={"/sell"}>
                <button className="rounded-full text-xl border-2 p-2 px-4 mt-3 text-white bg-green-500 hover:bg-green-700 flex gap-2 items-center duration-200 transition-all">
                  <PlusIcon className="w-6" />
                  Buat Iklan Disini
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
