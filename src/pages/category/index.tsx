import BottomTabs from "@/components/BottomTabs";
import Modal, { useModal } from "@/components/Modal";
import HeaderHome from "@/components/headers/HeaderHome";
import { CONFIG } from "@/config";
import axios from "axios";
import {
  CarFrontIcon,
  CarIcon,
  ChevronLeftCircleIcon,
  ChevronLeftIcon,
  InfoIcon,
  LucideHome,
  PlusCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export async function getServerSideProps(context: any) {
  try {
    const { page, size } = context.query;
    const result = await axios.get(
      CONFIG.base_url_api +
        `/categories?page=${page || 0}&size=${size || 99999}`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    return {
      props: {
        categories: result?.data?.items?.rows,
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

export default function Category({ categories }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [subcat, setSubcat] = useState<any>([]);

  const getSubCat = async (cat_id: any) => {
    try {
      const result = await axios.get(
        CONFIG.base_url_api +
          `/subcategories?category_id=${cat_id}&page=0&size=99999`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
      setSubcat(result?.data?.items?.rows);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pb-20  flex flex-col justify-center items-center">
      {/* Kategori */}
      <div className="p-2 mt-5 lg:max-w-sm md:max-w-full sm:max-w-full max-w-sm w-full">
        <button
          className="flex gap-3 items-center"
          onClick={() => {
            router.push("/");
          }}
        >
          <ChevronLeftCircleIcon className="w-6 h-6" />
          Kembali
        </button>
        <h2 className="text-center font-semibold lg:text-xl text-xl md:text-4xl">Kategori</h2>
        <div className="grid lg:grid-cols-3 grid-cols-3 gap-5 items-center justify-center mt-5">
          {categories?.map((v: any, i: number) => (
            <button
              onClick={() => {
                getSubCat(v?.id);
                setModal({ ...modal, open: true, key: "subcat", data: v });
              }}
              key={i}
              className="flex flex-col items-center justify-center w-auto text-xs pt-2 font-bold"
            >
              <img
                src={v?.icon}
                width={100}
                height={80}
                alt="icon"
                className="lg:w-[100px] lg:h-[60px] md:w-[230px] md:h-[150px] w-[100px] h-[60px]"
              />
              {v?.name}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal?.key == "subcat" ? (
        <Modal
          open={modal.open}
          setOpen={() => setModal({ ...modal, open: false, key: "" })}
        >
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                setModal({ ...modal, open: false });
              }}
            >
              <ChevronLeftIcon />
            </button>
            <h1>{modal?.data?.name?.toUpperCase()}</h1>
          </div>
          <div className="mt-5">
            {subcat?.map((v: any, i: number) => (
              <button
                key={i}
                onClick={() => router.push(`/category/${v?.id}`)}
                className="border border-gray-500 p-2 w-full"
              >
                {v?.name?.toUpperCase()}
              </button>
            ))}
          </div>
        </Modal>
      ) : (
        ""
      )}

      <BottomTabs />
    </div>
  );
}
