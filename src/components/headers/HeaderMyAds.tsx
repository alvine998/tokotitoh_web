import React, { useEffect, useState } from "react";
import { BellIcon, MapPinIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";

interface Props {
  filter: any;
  setFilter: any;
  items: any;
}

export default function HeaderMyAds(props: Props) {
  const router = useRouter();
  const { filter, setFilter, items } = props;

  return (
    <div className="w-full lg:w-1/4 fixed top-0 left-0 lg:left-[37%] bg-white">
      <div className="mt-4 px-2">
        <div className="w-full">
          <ReactSearchAutocomplete
            items={items?.map((v: any) => ({ ...v, name: v?.title }))}
            onSearch={(string: string, results: any) => {
              setFilter({ search: string });
            }}
            placeholder="Cari disini..."
          />
        </div>
      </div>
      <div className="my-2 px-2 flex justify-between gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            router.push(`/myads`);
          }}
          className={`border shadow bg-white w-full p-2 rounded ${
            router.pathname == "/myads"
              ? "border-blue-600"
              : "hover:border-blue-600 duration-200 transition-all"
          }`}
        >
          Iklan Saya
        </button>
        <button
          type="button"
          onClick={() => {
            router.push(`/saved-ads`);
          }}
          className={`border shadow bg-white w-full p-2 rounded ${
            router.pathname == "/saved-ads"
              ? "border-blue-600"
              : "hover:border-blue-600 duration-200 transition-all"
          }`}
        >
          Iklan Disimpan
        </button>
      </div>
    </div>
  );
}
