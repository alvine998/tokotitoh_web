import React, { useEffect, useState } from "react";
import {
  BellIcon,
  CheckIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  Settings2Icon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Modal, { useModal } from "../Modal";
import ReactSelect from "react-select";
import Button from "../Button";
import Input from "../Input";
import { CONFIG } from "@/config";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";

interface Props {
  ads: any;
  filter: any;
  setFilter: any;
  brands?: any;
  types?: any;
  provinces?: any;
  loading: any;
  items?: any;
}

export default function HeaderAds(props: Props) {
  const { ads, filter, setFilter, brands, types, provinces, loading, items } =
    props;
  const router = useRouter();
  const [location, setLocation] = useState<any>({
    latitude: null,
    longitude: null,
  });
  const [adress, setAddress] = useState<any>("Indonesia");
  const [modal, setModal] = useState<useModal>();
  const [filterName, setFilterName] = useState<any>(
    (ads?.category_name?.toLowerCase()?.includes("mobil") &&
      ads?.name?.toLowerCase()?.includes("mobil")) ||
      (ads?.category_name?.toLowerCase()?.includes("motor") &&
        ads?.name?.toLowerCase()?.includes("motor"))
      ? "MEREK/MODEL"
      : "LOKASI"
  );

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

  const [selected, setSelected] = useState<any>();
  const [list, setList] = useState<any>({
    cities: [],
    districts: [],
    villages: [],
  });

  const getCity = async (data: any) => {
    try {
      if (data?.value !== "") {
        const result = await axios.get(
          CONFIG.base_url_api + `/cities?province_id=${data?.value}`,
          {
            headers: {
              "bearer-token": "tokotitohapi",
              "x-partner-code": "id.marketplace.tokotitoh",
            },
          }
        );
        setList({
          cities: result?.data?.items?.rows,
          districts: [],
          villages: [],
        });
        setFilter({ ...filter, province_id: data?.value, city_id: "" });
        setAddress(data?.label);
      } else {
        setList({
          cities: [],
          districts: [],
          villages: [],
        });
        setFilter({ ...filter, province_id: "", city_id: "" });
        setAddress("Indonesia");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDistrict = async (data: any) => {
    try {
      if (data?.value !== "") {
        const result = await axios.get(
          CONFIG.base_url_api + `/districts?city_id=${data?.value}`,
          {
            headers: {
              "bearer-token": "tokotitohapi",
              "x-partner-code": "id.marketplace.tokotitoh",
            },
          }
        );
        setList({
          ...list,
          districts: result?.data?.items?.rows,
          villages: [],
        });
        setFilter({ ...filter, city_id: data?.value, district_id: "" });
        setAddress(`${data?.label}, ${adress}`);
      } else {
        setList({
          ...list,
          districts: [],
          villages: [],
        });
        setFilter({ ...filter, city_id: "", district_id: "" });
        setAddress(adress.split(",")[1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //     geolocation();
  // }, [])

  let navsCar = [
    {
      name: "MEREK/MODEL",
    },
    {
      name: "LOKASI",
    },
    {
      name: "HARGA",
    },
    {
      name: "TAHUN",
    },
    {
      name: "TRANSMISI",
    },
    {
      name: "BAHAN BAKAR",
    },
    {
      name: "URUTKAN",
    },
  ];

  let navsProperty = [
    {
      name: "LOKASI",
    },
    {
      name: "HARGA",
    },
    {
      name: "LUAS TANAH",
    },
    {
      name: "LUAS BANGUNAN",
    },
    {
      name: "URUTKAN",
    },
  ];

  let navsBusTruck = [
    {
      name: "LOKASI",
    },
    {
      name: "HARGA",
    },
    {
      name: "TAHUN",
    },
    {
      name: "URUTKAN",
    },
  ];

  let navsFoodPet = [
    {
      name: "LOKASI",
    },
    {
      name: "HARGA",
    },
    {
      name: "URUTKAN",
    },
  ];

  let navs = [
    {
      name: "LOKASI",
    },
    {
      name: "HARGA",
    },
    {
      name: "KONDISI",
    },
    {
      name: "URUTKAN",
    },
  ];

  return (
    <div className="w-full lg:w-1/4 fixed top-0 bg-white p-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setModal({ ...modal, data: ads, open: true, key: "filter" });
            }}
            className="flex gap-2 items-center"
          >
            <Settings2Icon className="w-4 h-4" />
            Filter
          </button>
          <button type="button" className="flex gap-2 items-center">
            <MapPinIcon className="w-4 h-4" />
            <h5 className="text-xs">
              {adress?.substring(0, 30)}
              {adress?.length > 30 ? "..." : ""}
            </h5>
          </button>
        </div>

        <div>
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

      <div className="mt-2 flex gap-2">
        <div className="w-full">
          <ReactSearchAutocomplete
            items={items?.map((v: any) => ({ ...v, name: v?.title }))}
            onSearch={(string: string, results: any) => {
              setFilter({ ...filter, search: string });
            }}
            placeholder="Cari disini..."
            onSelect={(item: any) =>
              router.push(`/category/${item?.subcategory_id}`)
            }
          />
        </div>
      </div>

      <div className="mt-2">
        <p>
          {ads?.category_name} {">"} {ads?.name}
        </p>
      </div>

      {modal?.key == "filter" ? (
        <Modal open={modal.open} setOpen={() => {}} type="filters">
          <div className="h-screen">
            <div className="p-2">
              <div className="flex justify-between items-center">
                <p>
                  Filter: {ads?.category_name} {">"} {ads?.name}
                </p>
                <button
                  type="button"
                  onClick={() => setModal({ ...modal, open: false })}
                >
                  <XCircleIcon className="w-7" />
                </button>
              </div>
              <div className="flex mt-8">
                <div className="w-auto flex flex-col gap-2">
                  {(ads?.category_name?.toLowerCase()?.includes("mobil") &&
                    ads?.name?.toLowerCase()?.includes("mobil")) ||
                  (ads?.category_name?.toLowerCase()?.includes("motor") &&
                    ads?.name?.toLowerCase()?.includes("motor")) ? (
                    <>
                      {navsCar?.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {
                            setFilterName(v?.name);
                          }}
                          className={`border-2 p-2 rounded text-xs ${
                            filterName == v?.name ? "bg-gray-300" : ""
                          } hover:bg-gray-300 duration-200 transition-all`}
                        >
                          {v?.name}
                        </button>
                      ))}
                    </>
                  ) : ads?.category_name
                      ?.toLowerCase()
                      ?.includes("properti") ? (
                    <>
                      {navsProperty?.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {
                            setFilterName(v?.name);
                          }}
                          className={`border-2 p-2 rounded text-xs ${
                            filterName == v?.name ? "bg-gray-300" : ""
                          } hover:bg-gray-300 duration-200 transition-all`}
                        >
                          {v?.name}
                        </button>
                      ))}
                    </>
                  ) : ads?.name?.toLowerCase() == "alat berat di sewakan" ||
                    ads?.name?.toLowerCase() == "alat berat di jual" ||
                    ads?.name?.toLowerCase() == "bus dan truk dijual" ||
                    ads?.name?.toLowerCase() == "bus dan truk di sewakan" ? (
                    <>
                      {navsBusTruck?.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {
                            setFilterName(v?.name);
                          }}
                          className={`border-2 p-2 rounded text-xs ${
                            filterName == v?.name ? "bg-gray-300" : ""
                          } hover:bg-gray-300 duration-200 transition-all`}
                        >
                          {v?.name}
                        </button>
                      ))}
                    </>
                  ) : ads?.category_name?.toLowerCase()?.includes("makanan") ||
                    ads?.category_name?.toLowerCase()?.includes("hewan") ? (
                    <>
                      {navsFoodPet?.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {
                            setFilterName(v?.name);
                          }}
                          className={`border-2 p-2 rounded text-xs ${
                            filterName == v?.name ? "bg-gray-300" : ""
                          } hover:bg-gray-300 duration-200 transition-all`}
                        >
                          {v?.name}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      {navs?.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => {
                            setFilterName(v?.name);
                          }}
                          className={`border-2 p-2 rounded text-xs ${
                            filterName == v?.name ? "bg-gray-300" : ""
                          } hover:bg-gray-300 duration-200 transition-all`}
                        >
                          {v?.name}
                        </button>
                      ))}
                    </>
                  )}
                </div>
                <div className="w-full">
                  {filterName == "MEREK/MODEL" ? (
                    <div>
                      <div className="flex flex-col gap-2 items-center justify-center pl-2 mt-4">
                        <ReactSelect
                          options={[
                            { value: "", label: "Semua Merek" },
                            ...brands?.map((v: any) => ({
                              ...v,
                              value: v?.id,
                              label: v?.name?.toUpperCase(),
                            })),
                          ]}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              brand_id: e.value,
                              type_id: "",
                            });
                          }}
                          maxMenuHeight={150}
                          placeholder="Semua Merek"
                          className="w-full"
                          defaultValue={{
                            value: filter?.brand_id,
                            label:
                              brands?.find(
                                (v: any) => v?.id == filter?.brand_id
                              )?.name || "Semua Merek",
                          }}
                        />
                        <ReactSelect
                          isDisabled={types?.length < 1}
                          options={[
                            { value: "", label: "Semua Model" },
                            ...types?.map((v: any) => ({
                              ...v,
                              value: v?.id,
                              label: v?.name?.toUpperCase(),
                            })),
                          ]}
                          onChange={(e: any) => {
                            setFilter({ ...filter, type_id: e.value });
                          }}
                          maxMenuHeight={150}
                          placeholder="Semua Model"
                          className="w-full"
                          defaultValue={{
                            value: filter?.type_id,
                            label:
                              types?.find((v: any) => v?.id == filter?.type_id)
                                ?.name || "Semua Model",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "LOKASI" ? (
                    <div>
                      <div className="flex flex-col gap-2 items-center justify-center pl-2 mt-4">
                        <ReactSelect
                          options={[
                            { value: "", label: "Semua Provinsi" },
                            ...provinces?.map((v: any) => ({
                              ...v,
                              value: v?.id,
                              label: v?.name,
                            })),
                          ]}
                          onChange={(e: any) => {
                            getCity(e);
                          }}
                          maxMenuHeight={150}
                          placeholder="Semua Provinsi"
                          className="w-full"
                          defaultValue={{
                            value: filter?.province_id,
                            label:
                              provinces?.find(
                                (v: any) => v?.id == filter?.province_id
                              )?.name || "Semua Provinsi",
                          }}
                        />
                        <ReactSelect
                          isDisabled={list?.cities?.length < 1}
                          options={[
                            { value: "", label: "Semua Kota/Kabupaten" },
                            ...list?.cities?.map((v: any) => ({
                              ...v,
                              value: v?.id,
                              label: v?.name,
                            })),
                          ]}
                          onChange={(e: any) => {
                            getDistrict(e);
                          }}
                          maxMenuHeight={150}
                          placeholder="Semua Kota/Kabupaten"
                          className="w-full"
                          defaultValue={{
                            value: filter?.city_id,
                            label:
                              list?.cities?.find(
                                (v: any) => v?.id == filter?.city_id
                              )?.name || "Semua Kota/Kabupaten",
                          }}
                        />
                        <ReactSelect
                          isDisabled={list?.districts?.length < 1}
                          options={[
                            { value: "", label: "Semua Kecamatan" },
                            ...list?.districts?.map((v: any) => ({
                              ...v,
                              value: v?.id,
                              label: v?.name,
                            })),
                          ]}
                          onChange={(e: any) => {
                            setFilter({ ...filter, district_id: e.value });
                          }}
                          maxMenuHeight={150}
                          placeholder="Semua Kecamatan"
                          className="w-full"
                          defaultValue={{
                            value: filter?.district_id,
                            label:
                              list?.districts?.find(
                                (v: any) => v?.id == filter?.district_id
                              )?.name || "Semua Kecamatan",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "HARGA" ? (
                    <div>
                      <div className="flex flex-col items-center justify-center pl-2 mt-4">
                        <Input
                          numericformat
                          label=""
                          placeholder="Dari Harga"
                          defaultValue={filter?.min || 0}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              min: e.target.value.replaceAll(",", ""),
                            });
                          }}
                        />
                        <Input
                          numericformat
                          label=""
                          placeholder="Sampai Harga"
                          defaultValue={filter?.max || 1000000000000}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              max: e.target.value.replaceAll(",", ""),
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "LUAS TANAH" ? (
                    <div>
                      <div className="flex flex-col items-center justify-center pl-2 mt-4">
                        <Input
                          numericformat
                          label=""
                          placeholder="Mulai Dari"
                          defaultValue={filter?.minArea}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              minArea: e.target.value.replaceAll(",", ""),
                            });
                          }}
                        />
                        <Input
                          numericformat
                          label=""
                          placeholder="Sampai"
                          defaultValue={filter?.maxArea}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              maxArea: e.target.value.replaceAll(",", ""),
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "LUAS BANGUNAN" ? (
                    <div>
                      <div className="flex flex-col items-center justify-center pl-2 mt-4">
                        <Input
                          numericformat
                          label=""
                          placeholder="Mulai Dari"
                          defaultValue={filter?.minBuilding}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              minBuilding: e.target.value.replaceAll(",", ""),
                            });
                          }}
                        />
                        <Input
                          numericformat
                          label=""
                          placeholder="Sampai"
                          defaultValue={filter?.maxBuilding}
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              maxBuilding: e.target.value.replaceAll(",", ""),
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "TAHUN" ? (
                    <div>
                      <div className="flex flex-col items-center justify-center pl-2 mt-2">
                        <Input
                          label=""
                          placeholder={"1945"}
                          maxLength={4}
                          type="tel"
                          onChange={(e: any) => {
                            setFilter({
                              ...filter,
                              year_start: e.target.value,
                            });
                          }}
                        />
                        <Input
                          label=""
                          placeholder={`${new Date().getFullYear()}`}
                          maxLength={4}
                          type="tel"
                          onChange={(e: any) => {
                            setFilter({ ...filter, year_end: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "TRANSMISI" ? (
                    <div>
                      <div className="flex flex-col gap-2 items-start pl-2 mt-4">
                        <div>
                          <input
                            type="radio"
                            name="transmission"
                            value={""}
                            defaultChecked={
                              filter?.transmission == "" ||
                              !filter?.transmission
                            }
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                transmission: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Semua Transmisi</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="transmission"
                            value={"MT"}
                            defaultChecked={filter?.transmission == "MT"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                transmission: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Manual</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="transmission"
                            value={"AT"}
                            defaultChecked={filter?.transmission == "AT"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                transmission: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Automatic</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="transmission"
                            value={"CVT"}
                            defaultChecked={filter?.transmission == "CVT"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                transmission: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">CVT</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "KONDISI" ? (
                    <div>
                      <div className="flex flex-col gap-2 items-start pl-2 mt-4">
                        <div>
                          <input
                            type="radio"
                            name="condition"
                            value={""}
                            defaultChecked={
                              filter?.condition == "" || !filter?.condition
                            }
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                condition: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Semua Kondisi</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="condition"
                            value={"new"}
                            defaultChecked={filter?.condition == "new"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                condition: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Baru</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="condition"
                            value={"second"}
                            defaultChecked={filter?.condition == "second"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                condition: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Bekas</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "BAHAN BAKAR" ? (
                    <div>
                      <div className="flex flex-col gap-2 items-start pl-2 mt-4">
                        <div>
                          <input
                            type="radio"
                            name="fuel_type"
                            value={""}
                            defaultChecked={
                              filter?.fuel_type == "" || !filter?.fuel_type
                            }
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                fuel_type: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Semua Bahan Bakar</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="fuel_type"
                            value={"bensin"}
                            defaultChecked={filter?.fuel_type == "bensin"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                fuel_type: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Bensin</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="fuel_type"
                            value={"diesel"}
                            defaultChecked={filter?.fuel_type == "diesel"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                fuel_type: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Solar</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="fuel_type"
                            value={"hybrid"}
                            defaultChecked={filter?.fuel_type == "hybrid"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                fuel_type: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Hybrid</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="fuel_type"
                            value={"ev"}
                            defaultChecked={filter?.fuel_type == "ev"}
                            onChange={(e) => {
                              setFilter({
                                ...filter,
                                fuel_type: e.target.value,
                              });
                            }}
                          />
                          <span className="ml-2">Listrik</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "URUTKAN" ? (
                    <div className="pl-2 mt-4 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setFilter({ ...filter, sort: "newest" });
                        }}
                        className={`border-2 w-full p-2 rounded text-xs ${
                          filter?.sort == "newest" || !filter?.sort
                            ? "bg-gray-300"
                            : ""
                        } hover:bg-gray-300 duration-200 transition-all items-center flex gap-2`}
                      >
                        {(filter?.sort == "newest" || !filter?.sort) && (
                          <CheckIcon className="w-4 text-green-700" />
                        )}
                        IKLAN TERBARU
                      </button>
                      <button
                        onClick={() => {
                          setFilter({ ...filter, sort: "minprice" });
                        }}
                        className={`border-2 w-full p-2 rounded text-xs ${
                          filter?.sort == "minprice" ? "bg-gray-300" : ""
                        } hover:bg-gray-300 duration-200 transition-all items-center flex gap-2`}
                      >
                        {filter?.sort == "minprice" && (
                          <CheckIcon className="w-4 text-green-700" />
                        )}
                        IKLAN PALING MURAH
                      </button>
                      <button
                        onClick={() => {
                          setFilter({ ...filter, sort: "maxprice" });
                        }}
                        className={`border-2 w-full p-2 rounded text-xs ${
                          filter?.sort == "maxprice" ? "bg-gray-300" : ""
                        } hover:bg-gray-300 duration-200 transition-all items-center flex gap-2`}
                      >
                        {filter?.sort == "maxprice" && (
                          <CheckIcon className="w-4 text-green-700" />
                        )}
                        IKLAN PALING MAHAL
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col gap-2 items-center justify-center pl-2">
                    <Button
                      color="info"
                      onClick={() => {
                        setModal({ ...modal, open: false });
                      }}
                      disabled={loading}
                    >
                      Terapkan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
