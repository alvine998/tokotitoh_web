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
    const result = await axios.get(CONFIG.base_url_api + `/ads?user_id=1&pagination=true&page=${page || 0}&size=${size || 10}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    return {
      props: {
        ads: result?.data?.items?.rows || []
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

export default function MyAds({ ads, subcat_id }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()
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
              <AdsProduct status={v?.status} price={v?.price} thumbnail={v?.images[0]} title={v?.title} path={`/category/${v?.subcategory_id}/${v?.id}`} />
            </div>
          ))
        }
      </div>

      <BottomTabs />
    </div>
  )
}
