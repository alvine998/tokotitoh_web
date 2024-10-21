import AdsProduct from "@/components/AdsProduct";
import BottomTabs from "@/components/BottomTabs";
import Button from "@/components/Button";
import HeaderAds from "@/components/headers/HeaderAds";
import HeaderHome from "@/components/headers/HeaderHome";
import Modal, { useModal } from "@/components/Modal";
import { CONFIG } from "@/config";
import axios from "axios";
import {
  CarFrontIcon,
  CarIcon,
  ChevronLeftIcon,
  CircleDotDashedIcon,
  InfoIcon,
  LucideHome,
  PlusCircleIcon,
  PlusIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRouter as router2 } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createQueryString } from "@/utils";
import { getCookie } from "cookies-next";

export async function getServerSideProps(context: any) {
  try {
    const {
      page,
      size,
      search,
      brand_id,
      type_id,
      province_id,
      city_id,
      district_id,
      transmission,
      max,
      min,
      maxArea,
      minArea,
      maxBuilding,
      minBuilding,
      sort,
      year_start,
      year_end,
      fuel_type,
      q,
    } = context.query;
    const { subcat_id } = context.params;

    const filters = {
      subcategory_id: subcat_id,
      status: "1",
      search: search || "",
      pagination: true,
      page: +page || 0,
      size: +size || 6,
      brand_id: brand_id || "",
      type_id: type_id || "",
      province_id: province_id || "",
      city_id: city_id || "",
      district_id: district_id || "",
      transmission: transmission || "",
      min: min?.replaceAll(".", "") || "5",
      max: max?.replaceAll(".", "") || "1000000000000",
      minArea: minArea || "",
      maxArea: maxArea || "",
      minBuilding: minBuilding || "",
      maxBuilding: maxBuilding || "",
      sort: sort || "",
      year_start: year_start || "1945",
      year_end: year_end || new Date().getFullYear(),
      fuel_type: fuel_type || "",
    };
    const result = await axios.get(
      CONFIG.base_url_api + `/ads?${createQueryString(filters)}`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    const result2 = await axios.get(
      CONFIG.base_url_api + `/subcategories?id=${subcat_id}`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    const ads1 = result2?.data?.items?.rows?.[0] || {};
    const [brands, provinces, categories] = await Promise.all([
      axios.get(
        CONFIG.base_url_api + `/brands?category_id=${ads1?.category_id}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      ),
      axios.get(CONFIG.base_url_api + `/provinces`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }),
      axios.get(CONFIG.base_url_api + `/categories`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }),
    ]);
    let types: any = [];
    if (brand_id) {
      types = await axios.get(
        CONFIG.base_url_api + `/types?brand_id=${brand_id}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
    }
    let searchAds: any = [];
    if (q) {
      searchAds = await axios.get(
        CONFIG.base_url_api +
          `/ads?pagination=true&page=${+page || 0}&size=${10}&status=1&search=${
            q || ""
          }`,
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
        ads: result?.data?.items,
        searchAds: searchAds?.data?.items?.rows || [],
        brands: brands?.data?.items?.rows || [],
        types: types?.data?.items?.rows || [],
        provinces: provinces?.data?.items?.rows || [],
        categories: categories?.data?.items?.rows || [],
        subcat_id,
        ads1,
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

export default function Ads({
  ads,
  subcat_id,
  brands,
  types,
  ads1,
  provinces,
  searchAds,
  categories,
}: any) {
  const router = useRouter();
  const routers = router2();
  const [modal, setModal] = useState<useModal>();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({ ...router?.query, size: 6 });
  const [loading, setLoading] = useState<any>(false);
  let user: any = getCookie("account");

  const addViews = async (data: any) => {
    try {
      if (user?.id !== data?.id) {
        await axios.post(
          CONFIG.base_url_api + `/ads/views`,
          { id: data?.id },
          {
            headers: {
              "bearer-token": "tokotitohapi",
              "x-partner-code": "id.marketplace.tokotitoh",
            },
          }
        );
      }
      localStorage.setItem("from", "subcat");
      router.push(`/category/${subcat_id}/${data?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const queryFilter = new URLSearchParams(filter).toString();
    routers.push(`${subcat_id}?${queryFilter}`, { scroll: false });
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  return (
    <div className="pb-20 flex flex-col justify-center items-center">
      <HeaderAds
        setLoading={setLoading}
        filter={filter}
        setFilter={setFilter}
        ads={ads1}
        brands={brands}
        types={types}
        provinces={provinces}
        items={searchAds}
        subcat_id={subcat_id}
        categories={categories}
      />

      {ads1?.id !== +subcat_id ? (
        <div className="mt-10">
          <CircleDotDashedIcon className="animate-spin text-green-500 ml-5" />
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <>
          {ads?.count > 0 ? (
            <div>
              {/* Kategori */}
              <div className="mt-28 flex lg:flex-col lg:gap-4 gap-0 flex-row flex-wrap justify-center items-center">
                {loading ? (
                  <div className="mt-10">
                    <CircleDotDashedIcon className="animate-spin text-green-500 ml-5" />
                    <p className="text-center">Loading...</p>
                  </div>
                ) : (
                  <>
                    {ads?.rows?.map((v: any, i: number) => (
                      <div
                        key={i}
                        className="lg:w-[350px] sm:w-[300px] w-[350px]"
                      >
                        <AdsProduct
                          price={v?.price}
                          thumbnail={JSON.parse(v?.images)[0]}
                          title={v?.title}
                          onClick={() => {
                            addViews(v);
                          }}
                        />
                      </div>
                    ))}
                    {filter?.size < ads?.count ? (
                      <div className="flex items-center justify-center">
                        {spinning ? (
                          <CircleDotDashedIcon className="animate-spin text-green-500" />
                        ) : (
                          <button
                            onClick={() => {
                              setSpinning(true);
                              setTimeout(() => {
                                setSpinning(false);
                              }, 3000);
                              setFilter({
                                ...filter,
                                size: (+filter.size || 6) + 6,
                              });
                            }}
                            type="button"
                            className="rounded-full border-2 p-2 px-4 mt-3 text-white bg-green-500 hover:bg-green-700 flex gap-2 items-center"
                          >
                            <PlusIcon className="w-6" />
                            Lihat Lainnya
                          </button>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-40 flex flex-col gap-2 justify-center items-center">
              {loading ? (
                <div className="mt-10">
                  <CircleDotDashedIcon className="animate-spin text-green-500 ml-5" />
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <>
                  <img
                    alt="eror404"
                    src={"/images/error404.webp"}
                    // layout="relative"
                    width={300}
                    height={300}
                    className="w-[250px] h-[250px]"
                  />
                  <p className="text-center font-semibold text-lg">
                    Item yang anda dicari tidak ditemukan!
                  </p>
                </>
              )}
            </div>
          )}
        </>
      )}

      <BottomTabs />
    </div>
  );
}
