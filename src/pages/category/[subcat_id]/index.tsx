import AdsProduct from '@/components/AdsProduct'
import BottomTabs from '@/components/BottomTabs'
import Button from '@/components/Button'
import HeaderAds from '@/components/headers/HeaderAds'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, PlusIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRouter as router2 } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createQueryString } from '@/utils'

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
      year,
      fuel_type
    } = context.query;
    const { subcat_id } = context.params;

    const filters = {
      subcategory_id: subcat_id,
      status: '1',
      pagination: true,
      page: +page || 0,
      size: +size || 5,
      search: search || "",
      brand_id: brand_id || "",
      type_id: type_id || "",
      province_id: province_id || "",
      city_id: city_id || "",
      district_id: district_id || "",
      transmission: transmission || "",
      min: min || "",
      max: max || "",
      minArea: minArea || "",
      maxArea: maxArea || "",
      minBuilding: minBuilding || "",
      maxBuilding: maxBuilding || "",
      sort: sort || "",
      year: year || "",
      fuel_type: fuel_type || "",
    }
    const result = await axios.get(CONFIG.base_url_api +
      `/ads?${createQueryString(filters)}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    const result2 = await axios.get(CONFIG.base_url_api +
      `/subcategories?id=${subcat_id}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    const ads1 = result2?.data?.items?.rows?.[0] || {};
    const [brands, provinces] = await Promise.all([
      axios.get(CONFIG.base_url_api + `/brands?category_id=${ads1?.category_id}`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      }),
      axios.get(CONFIG.base_url_api + `/provinces`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
    ])
    let types: any = []
    if (brand_id) {
      types = await axios.get(CONFIG.base_url_api + `/types?brand_id=${brand_id}`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
    }
    return {
      props: {
        ads: result?.data?.items,
        brands: brands?.data?.items?.rows || [],
        types: types?.data?.items?.rows || [],
        provinces: provinces?.data?.items?.rows || [],
        subcat_id,
        ads1
      }
    }
  } catch (error: any) {
    console.log(error);
    if (error?.response?.status == 401) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
    return {
      props: {
        error: error?.response?.data?.message,
      }
    }
  }
}

export default function Ads({ ads, subcat_id, brands, types, ads1, provinces }: any) {
  const router = useRouter();
  const routers = router2()
  const [modal, setModal] = useState<useModal>()
  const [filter, setFilter] = useState<any>(router.query);
  const [loading, setLoading] = useState<any>(false);

  const addViews = async (id: any) => {
    try {
      const result = await axios.post(CONFIG.base_url_api + `/ads/views`, { id: id }, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
      localStorage.setItem('from', 'subcat')
      router.push(`/category/${subcat_id}/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true)
    const queryFilter = new URLSearchParams(filter).toString();
    routers.push(`?${queryFilter}`, { scroll: false })
    setLoading(false)
  }, [filter])

  return (
    <div className='pb-20 flex flex-col justify-center items-center'>
      <HeaderAds
        loading={loading}
        filter={filter}
        setFilter={setFilter}
        ads={ads1}
        brands={brands}
        types={types}
        provinces={provinces}
        items={ads?.rows}
      />

      {
        ads?.count > 0 ?
          <div>
            {/* Kategori */}
            <div className='p-2 mt-28'>
              {
                ads?.rows?.map((v: any, i: number) => (
                  <div key={i} className='w-[350px]'>
                    <AdsProduct price={v?.price} thumbnail={v?.images[0]} title={v?.title} onClick={() => { addViews(v?.id) }} />
                  </div>
                ))
              }
            </div>

            {
              filter?.size < ads?.count ?
                <div className='flex items-center justify-center'>
                  <button
                    onClick={() => setFilter({ ...filter, size: (+filter.size || 5) + 5 })}
                    type='button'
                    className='rounded-full border-2 p-2 px-4 mt-3 text-white bg-green-500 hover:bg-green-700 flex gap-2 items-center'
                  >
                    <PlusIcon className='w-6' />
                    Lihat Lainnya
                  </button>
                </div> : ""
            }


          </div> : <div className='mt-40 flex flex-col gap-2 justify-center items-center'>
            <Image alt='eror404' src={'/images/error404.webp'} layout='relative' width={300} height={300} className='w-[250px] h-[250px]' />
            <p className='text-center font-semibold text-lg'>Item yang anda dicari tidak ditemukan!</p>
          </div>
      }

      <BottomTabs />
    </div>
  )
}
