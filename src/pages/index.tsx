import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { CarFrontIcon, CarIcon, ChevronLeftCircleIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export async function getServerSideProps(context: any) {
  try {
    const { page, size, search } = context.query;
    const result = await axios.get(CONFIG.base_url_api + `/categories?page=${page || 0}&size=${size || 99999}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    const { req, res } = context;
    let user: any = getCookie('account', { req, res });
    let notif: any = []
    if (user) {
      user = JSON.parse(user)
      notif = await axios.get(CONFIG.base_url_api + `/notifications?pagination=true&page=${+page || 0}&size=${+size || 5}`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
    }
    const ads = await axios.get(CONFIG.base_url_api + `/ads?status=1&pagination=true&page=${+page || 0}&size=${+size || 10}&search=${search || ""}`, {
      headers: {
        "bearer-token": "tokotitohapi",
        "x-partner-code": "id.marketplace.tokotitoh"
      }
    })
    return {
      props: {
        categories: result?.data?.items?.rows,
        ads: ads?.data?.items?.rows,
        notif: notif?.data?.items?.rows || [],
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

export default function Home({ categories, ads, notif }: any) {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()
  const [subcat, setSubcat] = useState<any>([]);
  const [filter, setFilter] = useState<any>(router.query);
  const [mode, setMode] = useState<any>({
    type: 'default',
    data: null
  });
  useEffect(() => {
    const queryFilter = new URLSearchParams(filter).toString();
    router.push(`?${queryFilter}`)
  }, [filter])

  const getSubCat = async (cat_id: any) => {
    try {
      const result = await axios.get(CONFIG.base_url_api + `/subcategories?category_id=${cat_id}&page=0&size=99999`, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
      setSubcat(result?.data?.items?.rows?.sort((a:any, b:any) => a.name?.localeCompare(b.name)));
    } catch (error) {
      console.log(error);
    }
  }

  const viewNotif = async (data: any) => {
    try {
      await axios.patch(CONFIG.base_url_api + `/notification`, { id: data?.id, status: 1 }, {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh"
        }
      })
      setMode({ type: 'read', data: data })
      router.push('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='pb-20 flex flex-col justify-center items-center'>
      <HeaderHome notif={notif} items={ads} modal={modal} setModal={setModal} filter={filter} setFilter={setFilter} />

      {/* Kategori */}
      <div className='p-2 mt-28'>
        <div className='flex flex-wrap gap-5 items-center justify-center'>
          {
            categories?.slice(0, 2)?.map((v: any, i: number) => (
              <button key={i} onClick={() => {
                getSubCat(v?.id)
                setModal({ ...modal, open: true, data: v, key: 'subcat' })
              }} className='flex flex-col items-center justify-center w-[100px]'>
                <Image src={v?.icon} layout='relative' width={100} height={100} alt='icon' className='w-16 h-16' />
                {v?.name}
              </button>
            ))
          }
          <button onClick={() => { router.push('/category') }} className='flex flex-col items-center justify-center w-[100px] text-sm uppercase text-blue-700 font-semibold'>
            Lihat Semua Kategori
          </button>
        </div>
        <div className='flex flex-wrap gap-5 items-center justify-center mt-4'>
          {
            categories?.slice(2, 5)?.map((v: any, i: number) => (
              <button key={i} onClick={() => {
                getSubCat(v?.id)
                setModal({ ...modal, open: true, data: v, key: 'subcat' })
              }} className='flex flex-col items-center justify-center w-[100px]'>
                <Image src={v?.icon} layout='relative' width={100} height={100} alt='icon' className='w-16 h-16' />
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
          <button type='button' onClick={() => { router.push('/sell') }} className='w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm'>
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
              <h1>{modal?.data?.name}</h1>
            </div>
            <div className='mt-5'>
              {
                subcat?.map((v: any, i: number) => (
                  <button key={i} onClick={() => router.push(`/category/${v?.id}`)} className='border border-gray-500 p-2 w-full'>
                    {v?.name}
                  </button>
                ))
              }
            </div>
          </Modal> : ""
      }
      {
        modal?.key == "notif" ?
          <Modal
            open={modal.open}
            setOpen={() => setModal({ ...modal, open: false, key: "" })}
          >
            <div className='p-2'>
              <div className='flex gap-3 items-center justify-between'>
                <h1 className='font-bold text-xl'>Notifikasi</h1>
                <button onClick={() => { setModal({ ...modal, open: false }) }}>
                  <XCircleIcon />
                </button>
              </div>
              {
                mode.type === "default" ?
                  <>
                    {
                      notif?.length > 0 ?
                        <div className='my-5'>
                          {
                            notif?.map((v: any) => (
                              <button key={v?.id} onClick={() => viewNotif(v)} className='flex flex-col gap-2 w-full border-2 rounded p-2'>
                                <p className='font-semibold'>{v?.title}</p>
                                <p className='text-gray-500'>{v?.content?.substring(0, 30)}{v?.content?.length > 30 ? "..." : ""}</p>
                              </button>
                            ))
                          }
                        </div> :
                        <p className='mt-10 text-center text-xl font-semibold'>Belum ada notifikasi!</p>
                    }
                  </> :
                  <div className='my-4 border-2 p-2 rounded'>
                    <button className='flex gap-3 items-center' onClick={() => { setMode({ type: 'default', data: null }) }}>
                      <ChevronLeftCircleIcon className='w-6 h-6' />
                      Kembali
                    </button>
                    <h5 className='text-center text-xl font-semibold mt-3'>{mode?.data?.title}</h5>
                    <p className='text-justify'>{mode?.data?.content}</p>
                  </div>
              }
            </div>
          </Modal> : ""
      }

      <BottomTabs />
    </div>
  )
}
