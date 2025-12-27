import { CONFIG } from "@/config";
import { toMoney } from "@/utils";
import axios from "axios";
import { setCookie } from "cookies-next";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";

interface Props {
  path?: string;
  title: string;
  price: any;
  thumbnail: string;
  status?: any;
  onClick?: any;
  views?: any;
  calls?: any;
  id?: any;
  account_id?: any;
  account?: any;
  category_id?: any;
  brand_id?: any;
}

export default function AdsProduct(props: Props) {
  const {
    path,
    price,
    thumbnail,
    title,
    status,
    onClick,
    calls,
    views,
    id,
    account_id,
    brand_id,
    category_id,
    account,
  } = props;
  const router = useRouter();
  const onDelete = async (id: any) => {
    try {
      const result = await axios.delete(CONFIG.base_url_api + "/ads?id=" + id, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      });
      Swal.fire({
        icon: "success",
        text: "Berhasil hapus iklan!",
      });
      router.push("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Gagal hapus iklan!",
      });
    }
  };
  const onDeleteAds = async (id: any) => {
    try {
      const result = await axios.patch(
        CONFIG.base_url_api + "/user",
        {
          id: account_id,
          email: account?.email,
          save_ads: account?.save_ads?.filter((v: any) => v !== id),
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
        text: "Berhasil hapus iklan!",
      });
      router.push("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Gagal hapus iklan!",
      });
    }
  };
  return (
    <div className="w-full">
      {router.pathname == "/myads" ? (
        <div>
          <div className="flex justify-end gap-2 my-2">
            <Link
              href={`/sell?id=${id}&account_id=${account_id}&category_id=${category_id}&brand_id=${brand_id}`}
            >
              <button
                type="button"
                className="text-white bg-blue-700 rounded p-2 flex gap-2 text-xs items-center"
              >
                <PencilIcon className="w-8" />
                Edit
              </button>
            </Link>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="text-white bg-red-700 rounded p-2 flex gap-2 text-xs items-center"
            >
              <Trash2Icon /> Hapus
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {router.pathname == "/saved-ads" ? (
        <div>
          <div className="flex justify-end gap-2 my-2">
            <button
              type="button"
              onClick={() => onDeleteAds(id)}
              className="text-white bg-red-700 rounded p-2 flex gap-2 text-xs items-center"
            >
              <Trash2Icon /> Hapus
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        type="button"
        className="p-2 relative z-10 rounded h-auto md:mt-10 sm:mt-10 lg:mt-2 mt-2 w-full lg:w-full flex flex-col justify-start"
        onClick={onClick}
      >
        <div className="bg-white w-full sm:h-[300px] md:h-[400px] lg:h-[200px] h-[200px] relative overflow-hidden flex justify-center">
          <Image
            src={thumbnail}
            alt="thumbnail"
            fill
            className="rounded object-cover"
          />
        </div>
        {router.pathname == "/myads" ? (
          <div className="flex justify-between items-end mt-2">
            <div>
              <h5 className="text-left text-lg font-bold">
                {title?.length > 17 ? title?.slice(0, 17) : title}
              </h5>
              <p
                className={`text-left font-bold ${
                  price.length > 12
                    ? "text-xs"
                    : price.length > 10
                    ? "text-sm"
                    : "text-lg"
                }`}
              >
                Rp {toMoney(price)?.slice(0, 15)}
              </p>{" "}
            </div>
            {router.pathname == "/myads" ? (
              <div>
                <p
                  className={
                    status == 0
                      ? "text-orange-700"
                      : status == 1
                      ? "text-green-700"
                      : "text-red-700"
                  }
                >
                  {status == 0
                    ? "Sedang Ditinjau"
                    : status == 1
                    ? "Disetujui"
                    : "Ditolak"}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="absolute md:top-[390px] sm:top-[290px] top-44 lg:top-44 lg:left-2 md:left-2 sm:left-2 left-2">
            <h5 className="text-left md:text-2xl sm:text-2xl lg:text-lg text-lg font-bold md:mt-4 sm:mt-4 mt-2 lg:mt-2">
              {" "}
              {title?.length > 17 ? title?.slice(0, 17) : title}
            </h5>
            <p
              className={`text-left font-bold -mt-1 ${
                price.length > 11 ? "md:text-lg sm:text-lg lg:text-xs text-xs" : "md:text-xl sm:text-xl lg:text-sm text-md"
              }`}
            >
              Rp {toMoney(price)?.slice(0, 15)}
            </p>
          </div>
        )}

        {router.pathname == "/myads" ? (
          <div className="flex justify-between items-center mt-2">
            <div className="w-full border-r-2">
              <h5>Dilihat</h5>
              <h5>{views || 0}</h5>
            </div>
            <div className="w-full">
              <h5>Dihubungi</h5>
              <h5>{calls || 0}</h5>
            </div>
          </div>
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
