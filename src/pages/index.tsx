import BottomTabs from '@/components/BottomTabs'
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
    const result = await axios.get(CONFIG.base_url_api + `/categories?page=${page || 0}&size=${size || 99999}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    return {
      props: {
        categories: result?.data?.items?.rows
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

export default function Home({ categories }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()
  const [subcat, setSubcat] = useState<any>([]);

  const getSubCat = async (cat_id: any) => {
    try {
      const result = await axios.get(CONFIG.base_url_api + `/subcategories?category_id=${cat_id}&page=0&size=99999`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
      setSubcat(result?.data?.items?.rows);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='pb-20'>
      <div className=''>
        <HeaderHome />
      </div>


      {/* Kategori */}
      <div className='p-2 mt-28'>
        <div className='flex flex-wrap gap-5 items-center justify-center'>
          {
            categories?.map((v: any, i: number) => (
              i == 2
                ?
                <button onClick={() => { router.push('/category') }} className='flex flex-col items-center justify-center w-[100px] text-sm uppercase text-blue-700 font-semibold'>
                  Lihat Semua Kategori
                </button> :
                <button key={i} onClick={() => {
                  setModal({ ...modal, open: true, data: v, key: 'subcat' })
                }} className='flex flex-col items-center justify-center w-[100px]'>
                  <Image src={v?.icon} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                  {v?.name}
                </button>
            ))
          }
        </div>
      </div>

      {/* Tips */}
      <div className='p-2 mt-5'>
        <div className='flex gap-2'>
          <button onClick={() => {
            setModal({ ...modal, open: true, key: "tips", data: null })
          }} className='w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm'>
            <InfoIcon className='text-blue-700' />
            Tips Hindari Penipuan
          </button>
          <button className='w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm'>
            <PlusCircleIcon className='text-green-700' />
            Pasang Iklan Baru
          </button>
        </div>
      </div>

      {/* Modal */}
      {
        modal?.key == "tips" ?
          <Modal
            open={modal.open}
            setOpen={() => setModal({ ...modal, open: false, key: "" })}
          >
            <div className='p-2'>
              <div className='flex gap-3 items-center justify-between'>
                <h1 className='font-bold text-xl'>Tips Menghindari Penipuan</h1>
                <button onClick={() => { setModal({ ...modal, open: false }) }}>
                  <XCircleIcon />
                </button>
              </div>
              <p className='mt-2'>
                - Hindari pembelian non COD<br />
                - Hindari DP transfer sebelum bertemu langsung dengan penjual<br />
                - Periksa surat-surat dan kelengkapan barang<br />
                - Untuk pembelian properti cek surat-surat dan kondisi situasi tanah dengan teliti sesuai dengan ketentuan yang berlaku
              </p>
            </div>
          </Modal> : ""
      }
      {
        modal?.key == "subcat" ?
          <Modal
            open={modal.open}
            setOpen={() => setModal({ ...modal, open: false, key: "" })}
          >
            <div className='flex gap-3 items-center'>
              <button onClick={() => { setModal({ ...modal, open: false }) }}>
                <ChevronLeftIcon />
              </button>
              <h1>Mobil</h1>
            </div>
            <div className='mt-5'>
              <button onClick={() => { router.push('/category/car?subcategory=mobil-dijual') }} className='border border-gray-500 p-2 w-full'>
                Mobil Dijual
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Kredit / TT
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Disewakan
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Baru / Promosi
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Sparepart
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Aksesoris & Audio
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Velg & Ban
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Bengkel / Montir
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Karoseri
              </button>
            </div>
          </Modal> : ""
      }

      <BottomTabs />
    </div>
  )
}
