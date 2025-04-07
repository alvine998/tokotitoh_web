import React, { useEffect, useState } from "react";
import { BellIcon, MapPinIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import Input from "../Input";

interface Props {
  filter: any;
  setFilter: any;
  modal?: any;
  setModal?: any;
  items?: any;
  notif?: any;
  handleSearch?: any;
}

export default function HeaderHome(props: Props) {
  const router = useRouter();
  const { modal, setModal, items, filter, setFilter, notif, handleSearch } =
    props;
  const [location, setLocation] = useState<any>({
    latitude: null,
    longitude: null,
  });
  const [textSearch, setTextSearch] = useState<string>("");
  const [adress, setAddress] = useState<any>("Indonesia");

  // const geolocation = async () => {
  //     try {
  //         if (navigator.geolocation) {
  //             navigator.geolocation.getCurrentPosition(
  //                 (position) => {
  //                     setLocation({
  //                         latitude: position.coords.latitude,
  //                         longitude: position.coords.longitude,
  //                     });
  //                     const result = axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`).then((data) => {
  //                         const address = data.data.address
  //                         setAddress(`${address?.village || ""}, ${address?.county || ""}`)
  //                     }).catch((err: any) => {
  //                         console.log(err);
  //                         setAddress('Indonesia')
  //                     })
  //                 }
  //             );
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // useEffect(() => {
  //     geolocation();
  // }, [])

  const [searchString, setSearchString] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      router.push(`/category/0?search=${searchString}&size=6`);
    }
  };

  return (
    <div className="w-full lg:max-w-sm md:max-w-full sm:max-w-full max-w-full fixed top-0 bg-white p-2 lg:w-1/4 md:1/4">
      <div className="flex justify-end">
        {/* <button type='button' className='flex gap-2 items-center'>
                    <MapPinIcon className='w-4 h-4' />
                    <h5>{adress}</h5>
                </button> */}
        <div className="justify-end">
          <Image
            alt="logo"
            src={"/images/tokotitoh.png"}
            layout="relative"
            width={50}
            height={50}
            className="w-7 h-7"
          />
        </div>
      </div>

      <div className="mt-2 flex gap-2 lg:px-0 px-0 md:px-4">
        <div className="w-full" onKeyDown={handleKeyPress}>
          {/* <ReactSearchAutocomplete
            items={items?.map((v: any) => ({ ...v, name: `${v?.title}` }))}
            onSearch={(string: string, results: any) => {
              //   setFilter({ ...filter, search: string });
              setSearchString(string);
              handleSearch(string);
            }}
            placeholder="Cari barangmu disini..."
            onSelect={(item: any) =>
              router.push(
                `/category/${item?.subcategory_id}?search=${item?.title}&size=6`
              )
            }
          /> */}
          <Input
            placeholder="Cari disini"
            label=""
            value={searchString}
            onChange={(e: any) => {
              // setFilter({ ...filter, search: e.target.value });
              setSearchString(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setModal({ ...modal, open: true, key: "notif" });
          }}
          className="relative group"
        >
          <BellIcon className="w-7 h-7" />
          {notif?.find((v: any) => v?.status == 0) ? (
            <div className="absolute top-1 right-0 w-4 bg-blue-700 p-2 rounded-full"></div>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}
