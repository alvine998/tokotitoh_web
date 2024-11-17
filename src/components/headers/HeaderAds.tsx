import React, { useEffect, useState } from "react";
import {
  BellIcon,
  CheckIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  Settings2Icon,
  XCircleIcon,
  XIcon,
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
import { useParams } from "next/navigation";

interface Props {
  ads: any;
  filter: any;
  setFilter: any;
  brands?: any;
  types?: any;
  provinces?: any;
  setLoading: any;
  items?: any;
  subcat_id?: any;
  categories: any[];
}

export default function HeaderAds(props: Props) {
  const {
    ads,
    filter,
    setFilter,
    brands,
    types,
    provinces,
    setLoading,
    items,
    subcat_id,
    categories,
  } = props;
  const router = useRouter();
  const [location, setLocation] = useState<any>({
    latitude: null,
    longitude: null,
  });
  const [category, setCategory] = useState<any>();
  const [adress, setAddress] = useState<any>("Indonesia");
  const [modal, setModal] = useState<useModal>();
  const [filterName, setFilterName] = useState<any>("MEREK");

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
        // setSelected({
        //   ...selected,
        //   province_id: data?.value,
        //   province_name: data?.label,
        // });
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
        // setSelected({
        //   ...selected,
        //   district_id: data?.value,
        //   district_name: data?.label,
        // });
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

  const getType = async (data: any) => {
    try {
      if (data?.value !== "") {
        const result = await axios.get(
          CONFIG.base_url_api + `/types?brand_id=${data?.value}`,
          {
            headers: {
              "bearer-token": "tokotitohapi",
              "x-partner-code": "id.marketplace.tokotitoh",
            },
          }
        );
        setList({
          ...list,
          types: result.data.items.rows,
        });
      } else {
        setList({
          ...list,
          types: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubcategory = async (data: any) => {
    try {
      if (data?.id !== 0) {
        const result = await axios.get(
          CONFIG.base_url_api + `/subcategories?category_id=${data?.id}`,
          {
            headers: {
              "bearer-token": "tokotitohapi",
              "x-partner-code": "id.marketplace.tokotitoh",
            },
          }
        );
        setList({
          ...list,
          subcategories: [
            { id: 0, name: "Kembali" },
            ...result.data.items.rows,
          ],
        });
      } else {
        setList({
          ...list,
          subcategories: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let initialValue: any = {
    size: "",
    province_id: "",
    city_id: "",
    district_id: "",
    brand_id: "",
    brand_name: "",
    type_id: "",
    type_name: "",
    max: filter?.max || "",
    min: filter?.min || "",
    maxArea: "",
    minArea: "",
    maxBuilding: "",
    minBuilding: "",
    year_start: "",
    year_end: ``,
    transmission: "",
    condition: "",
    fuel_type: "",
    sort: "",
  };

  const [selected, setSelected] = useState<any>(initialValue);

  let navsCar = [
    {
      name: "MEREK",
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
      name: "KATEGORI",
    },
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

  const params = useParams();
  return (
    <div className="w-full lg:w-1/3 fixed top-0 bg-white p-2">
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
          {/* <ReactSearchAutocomplete
            items={items?.map((v: any) => ({ ...v, name: `${v?.title}` }))}
            onSearch={(string: string, results: any) => {
              setFilter({ ...filter, q: string });
            }}
            placeholder="Cari barangmu disini..."
            onSelect={(item: any) =>
              router.push(
                `/category/${item?.subcategory_id}?search=${item?.title}`
              )
            }
          /> */}
          <Input
            placeholder="Cari disini"
            label=""
            defaultValue={filter?.search}
            onChange={(e: any) => {
              setFilter({ ...filter, search: e.target.value });
            }}
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
              <div className="flex justify-between items-start">
                <p>
                  Filter: {ads?.category_name} {">"} {ads?.name}
                </p>
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setModal({ ...modal, open: false })}
                    className="justify-end items-end flex"
                  >
                    <XCircleIcon className="w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // setResets(true);
                      // setSelected(initialValue);
                      setLoading(true);
                      setList({ type: [] });
                      setFilter({ size: 6 });
                      setModal({ ...modal, open: false });
                      const id = subcat_id || ads?.id || params?.subcat_id;
                      if (id) {
                        // Only navigate if the id is valid
                        router.push(`/category/${id}`);
                      } else {
                        // Handle the case where id is missing (optional)
                        console.warn("subcat_id or ads.id is missing");
                      }
                    }}
                    className="text-blue-700 mr-2 border-2 border-black rounded py-1 px-4 mt-1"
                  >
                    Reset
                  </button>
                </div>
              </div>
              {/* Filter Selected */}
              <div className="w-full overflow-y-auto mt-2 gap-2 flex">
                {Object.entries(selected)
                  ?.filter(
                    ([key, value]: any) => value !== "" && !key?.includes("_id")
                  )
                  ?.map(([key, value]: any) => (
                    <div
                      key={key}
                      className="flex bg-blue-500 rounded-full py-1 px-2 items-end w-auto"
                    >
                      <p className="text-white">{value}</p>
                      <button
                        className="ml-2"
                        onClick={() => {
                          setSelected({
                            ...selected,
                            [key]: "",
                          });
                        }}
                      >
                        <XIcon className="text-white w-4" />
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex mt-2">
                <div className="lg:w-auto w-auto flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setFilterName("KATEGORI");
                    }}
                    className={`border-2 w-auto p-2 rounded text-xs hover:bg-gray-300 duration-200 transition-all`}
                  >
                    KATEGORI
                  </button>
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
                          className={`border-2 w-auto p-2 rounded text-xs ${
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
                  {filterName == "KATEGORI" ? (
                    <div className="lg:h-[45vh] h-[60vh] overflow-auto">
                      <div className="flex flex-col gap-2 pl-2 mt-4">
                        {list?.subcategories?.length > 0 ? (
                          <>
                            {list?.subcategories?.map((v: any, i: number) => (
                              <button
                                key={i}
                                className="w-full px-2 py-1 text-xs text-left border-b"
                                onClick={() => {
                                  if (v?.id !== 0) {
                                    router.push(`/category/${v?.id}`);
                                    setFilter("");
                                    setModal({ ...modal, open: false });
                                    setList({ ...list, subcategories: [] });
                                  } else {
                                    setList({ ...list, subcategories: [] });
                                  }
                                }}
                              >
                                {v?.name}
                              </button>
                            ))}
                          </>
                        ) : (
                          <>
                            {categories?.map((v: any, i: number) => (
                              <button
                                key={i}
                                className="w-full px-2 py-1 text-xs text-left border-b"
                                onClick={() => {
                                  getSubcategory(v);
                                }}
                              >
                                {v?.name}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterName == "MEREK" ? (
                    <div>
                      <div className="flex flex-row gap-2 justify-start items-center flex-wrap pl-2">
                        {brands
                          ?.filter((v: any) => v.image !== null)
                          ?.map((val: any) => (
                            <button className="border border-gray-200 rounded p-2">
                              <img
                                src={val?.image}
                                alt="logo-car"
                                className="w-[50px] h-[50px]"
                              />
                            </button>
                          ))}
                      </div>
                      {/* <div className="flex flex-col gap-2 items-center justify-center pl-2 mt-4">
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
                            // setSelected({
                            //   ...selected,
                            //   brand_id: e.value ? e.value : "",
                            //   brand_name: e.value ? e.label : "",
                            //   type_id: "",
                            //   type_name: "",
                            // });
                            setFilter({
                              ...filter,
                              brand_id: e?.value,
                              type_id: "",
                            });
                            getType(e);
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
                        {list?.types ? (
                          <ReactSelect
                            isDisabled={list?.types?.length < 1}
                            options={[
                              { value: "", label: "Semua Model" },
                              ...list?.types?.map((v: any) => ({
                                ...v,
                                value: v?.id,
                                label: v?.name?.toUpperCase(),
                              })),
                            ]}
                            onChange={(e: any) => {
                              // setSelected({
                              //   ...selected,
                              //   type_id: e.value ? e.value : "",
                              //   type_name: e.value ? e.label : "",
                              // });
                              setFilter({ ...filter, type_id: e?.value });
                            }}
                            maxMenuHeight={150}
                            placeholder="Semua Model"
                            className="w-full"
                            defaultValue={{
                              value: filter?.type_id,
                              label:
                                list?.types?.find(
                                  (v: any) => v?.id == filter?.type_id
                                )?.name || "Semua Model",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div> */}
                      <div className="lg:h-[45vh] h-[60vh] overflow-auto">
                        <div className="flex flex-col gap-2 pl-2 mt-4">
                          {list?.types?.length > 0 ? (
                            <>
                              {list?.types?.map((v: any, i: number) => (
                                <button
                                  key={i}
                                  className="w-full px-2 py-1 text-xs text-left border-b"
                                  onClick={() => {
                                    if (v?.id !== 0) {
                                      router.push(`/category/${v?.id}`);
                                      setFilter("");
                                      setModal({ ...modal, open: false });
                                      setList({ ...list, types: [] });
                                    } else {
                                      setList({ ...list, types: [] });
                                    }
                                  }}
                                >
                                  {v?.name}
                                </button>
                              ))}
                            </>
                          ) : (
                            <>
                              {brands?.map((v: any, i: number) => (
                                <button
                                  key={i}
                                  className="w-full px-2 py-1 text-xs text-left border-b"
                                  onClick={() => {
                                    setFilter({
                                      ...filter,
                                      brand_id: v?.id,
                                      type_id: "",
                                    });
                                    getType(v);
                                  }}
                                >
                                  {v?.name}
                                </button>
                              ))}
                            </>
                          )}
                        </div>
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
                            // setSelected({ ...selected, district_id: e.value });
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
                          defaultValue={filter?.min || 1}
                          onChange={(e: any) => {
                            // setSelected({
                            //   ...selected,
                            //   min: e.target.value.replaceAll(",", ""),
                            // });
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
                          defaultValue={filter?.max || 1000000000000000}
                          onChange={(e: any) => {
                            // setSelected({
                            //   ...selected,
                            //   max: e.target.value.replaceAll(",", ""),
                            // });
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
                            // setSelected({
                            //   ...selected,
                            //   minArea: e.target.value.replaceAll(",", ""),
                            // });
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
                            // setSelected({
                            //   ...selected,
                            //   maxArea: e.target.value.replaceAll(",", ""),
                            // });
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
                            // setSelected({
                            //   ...selected,
                            //   minBuilding: e.target.value.replaceAll(",", ""),
                            // });
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
                            // setSelected({
                            //   ...selected,
                            //   maxBuilding: e.target.value.replaceAll(",", ""),
                            // });
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
                            // setSelected({
                            //   ...selected,
                            //   year_start: e.target.value,
                            // });
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
                            // setSelected({
                            //   ...selected,
                            //   year_end: e.target.value,
                            // });
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
                              // setSelected({
                              //   ...selected,
                              //   transmission: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   transmission: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   transmission: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   transmission: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   condition: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   condition: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   condition: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   fuel_type: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   fuel_type: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   fuel_type: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   fuel_type: e.target.value,
                              // });
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
                              // setSelected({
                              //   ...selected,
                              //   fuel_type: e.target.value,
                              // });
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
                          // setSelected({ ...selected, sort: "newest" });
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
                          // setSelected({ ...selected, sort: "minprice" });
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
                          // setSelected({ ...selected, sort: "maxprice" });
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
                    {filterName !== "KATEGORI" ? (
                      <Button
                        color="info"
                        onClick={() => {
                          // setFilter({
                          //   subcat_id: filter?.subcat_id,
                          //   ...selected,
                          // });
                          setModal({ ...modal, open: false });
                          setLoading(true);
                          if (filter?.subcategory_id) {
                            router.push(`/category/${filter?.subcategory_id}`);
                            setFilter("");
                          }
                        }}
                      >
                        Terapkan
                      </Button>
                    ) : (
                      ""
                    )}
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
