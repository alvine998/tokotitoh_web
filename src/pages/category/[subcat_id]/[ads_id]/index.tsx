import AdsProduct from '@/components/AdsProduct'
import BottomTabs from '@/components/BottomTabs'
import Button from '@/components/Button'
import HeaderAds from '@/components/headers/HeaderAds'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import { toMoney } from '@/utils'
import axios from 'axios'
import { ArrowLeft, CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PhoneCallIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export async function getServerSideProps(context: any) {
  try {
    const { page, size } = context.query;
    const { subcat_id, ads_id } = context.params;
    const result = await axios.get(CONFIG.base_url_api + `/ads?id=${ads_id}&pagination=true&page=${page || 0}&size=${size || 10}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    const user = await axios.get(CONFIG.base_url_api + `/users?id=${result?.data?.items?.rows[0]?.user_id}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    return {
      props: {
        ads: result?.data?.items?.rows[0] || [],
        user: user?.data?.items?.rows[0] || [],
        subcat_id,
        ads_id
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


export default function Ads({ ads, user }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShow(true)
    }
  }, [])
  return (
    <div className='pb-20'>
      {
        show ?
          <>
            <div className='p-3'>
              <button className='flex gap-2 font-bold'>
                <ArrowLeft className='w-5' />
                Kembali
              </button>
              <p className='mt-4'>{ads?.district_name} {">"} {ads?.city_name} {">"} {ads?.province_name}</p>
              <Image alt='thumbnail' src={ads?.images[0]} layout='relative' width={300} height={300} className='h-[300px] w-full rounded mt-5' />

              <div className='mt-3'>
                <h2 className='text-xl'>{ads?.title}</h2>
                <h2 className='text-xl font-semibold'>Rp {toMoney(ads?.price)}</h2>
                <p className='mt-3'>
                  Deskripsi: <br />
                  {ads?.description}
                </p>
                {
                  ads?.category_name?.toLowerCase().includes('mobil') || ads?.category_name?.toLowerCase().includes('motor') ?
                    <p className='mt-3'>
                      Detail <br /><hr />
                      Brand: {ads?.brand_name}<br /><hr />
                      Tipe: {ads?.type_name}<br /><hr />
                      Tahun: {ads?.year}<br /><hr />
                      Warna: {ads?.color}<br /><hr />
                      Trip KM: {toMoney(ads?.km)} km<br /><hr />
                      Transmisi: {ads?.transmission}<br /><hr />
                      Bahan Bakar: {ads?.fuel_type}<br /><hr />
                      Kepemilikan: {ads?.ownership == "individual" ? "Pribadi" : "Dealer"}<br /><hr />
                    </p> : ""
                }
              </div>
            </div>


            {/* Button WA */}
            <div className='fixed bottom-4 right-4'>
              <Link href={`https://wa.me/${user?.phone}`}>
                <Button type='button' className={'rounded-full p-2 flex items-center gap-2'}>
                  <PhoneCallIcon className='w-8' />
                  Whatsapp Now
                </Button>
              </Link>

            </div>
          </> : ""
      }
    </div>
  )
}
