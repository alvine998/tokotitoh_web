import { CONFIG } from "@/config";
import { toMoney } from "@/utils";
import axios from "axios";
import { setCookie } from "cookies-next";
import { PencilIcon, Trash2Icon } from "lucide-react";
import moment from "moment";
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
  created_at?: any;
}

export default function AdsProduct2(props: Props) {
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
    created_at,
  } = props;
  const router = useRouter();
  return (
    <div className="w-full">
      <button
        type="button"
        className="p-2 z-10 relative rounded h-auto md:mt-2 sm:mt-2 lg:mt-2 mt-2 w-full lg:w-full flex flex-row gap-4"
        onClick={onClick}
      >
        <div className="bg-white w-auto sm:h-[150px] md:h-[150px] lg:h-[120px] h-[120px] overflow-hidden flex justify-start">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="lg:w-[140px] lg:h-[120px] md:w-[170px] md:h-[150px] sm:w-[170px] sm:h-[150px]  w-[140px] h-[120px] rounded object-cover"
          />
        </div>
        <div className="mt-2">
          <p
            className={`text-left font-bold -mt-1 ${
              price.length > 11
                ? "md:text-lg sm:text-lg lg:text-xs text-xs"
                : "md:text-xl sm:text-xl lg:text-sm text-md"
            }`}
          >
            Rp {toMoney(price)?.slice(0, 15)}
          </p>
          <h5 className="text-left md:text-2xl sm:text-2xl lg:text-lg text-lg font-bold">
            {" "}
            {title?.length > 17 ? title?.slice(0, 17) : title}
          </h5>
          <div className="absolute bottom-2 right-2">
            <p
              className={`text-right text-sm`}
            >
              {moment(created_at).format("DD-MM-YYYY") ===
              moment().format("DD-MM-YYYY")
                ? "Hari ini"
                : moment(created_at).format("DD MMM")}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
