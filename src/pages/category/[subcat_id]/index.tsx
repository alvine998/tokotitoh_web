import AdsProduct from '@/components/AdsProduct'
import BottomTabs from '@/components/BottomTabs'
import HeaderAds from '@/components/headers/HeaderAds'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export async function getServerSideProps(context: any) {
  try {
    const { page, size } = context.query;
    const { subcat_id } = context.params;
    const result = await axios.get(CONFIG.base_url_api + `/ads?subcategory_id=${subcat_id}&status=1&pagination=true&page=${page || 0}&size=${size || 10}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    return {
      props: {
        ads: result?.data?.items?.rows,
        subcat_id
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

export default function Ads({ ads, subcat_id }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()

  const addViews = async (id: any) => {
    try {
      const result = await axios.post(CONFIG.base_url_api + `/ads/views`, { id: ads?.id }, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
      router.push(`/category/${subcat_id}/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='pb-20'>
      <div className=''>
        <HeaderAds />
      </div>


      {/* Kategori */}
      <div className='p-2 mt-28'>
        {
          ads?.map((v: any, i: number) => (
            <div key={i}>
              <AdsProduct price={v?.price} thumbnail={v?.images[0]} title={v?.title} onClick={() => { addViews(v?.id) }} />
            </div>
          ))
        }
      </div>

      <BottomTabs />
    </div>
  )
}
