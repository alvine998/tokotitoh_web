import AdsProduct from '@/components/AdsProduct'
import BottomTabs from '@/components/BottomTabs'
import HeaderAds from '@/components/headers/HeaderAds'
import HeaderHome from '@/components/headers/HeaderHome'
import HeaderMyAds from '@/components/headers/HeaderMyAds'
import LoginForm from '@/components/LoginForm'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, PlusIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export async function getServerSideProps(context: any) {
    try {
        const { page, size } = context.query;
        const { req, res } = context;
        let user: any = getCookie('account', { req, res });
        let result: any = []
        if (user) {
            user = JSON.parse(user)
            result = await axios.get(CONFIG.base_url_api + `/ads?user_id=${user?.id || 0}&pagination=true&page=${page || 0}&size=${size || 10}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": user?.partner_code
                }
            })
        }
        return {
            props: {
                ads: result?.data?.items?.rows || [],
                user: user || null
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

export default function MyAds({ ads, user }: any) {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()

    const onRoute = async (v: any) => {
        await localStorage.setItem('from', 'myads')
        router.push(`/category/${v?.subcategory_id}/${v?.id}`)
    }
    return (
        <div className='pb-20'>
            {
                user ?
                    <div className=''>
                        <HeaderMyAds />
                        <div className='p-2 mt-28'>
                            {
                                ads?.length > 0 ?
                                    <>
                                        {
                                            ads?.map((v: any, i: number) => (
                                                <div key={i}>
                                                    <AdsProduct
                                                        status={v?.status}
                                                        price={v?.price}
                                                        thumbnail={v?.images[0]}
                                                        title={v?.title}
                                                        onClick={() => onRoute(v)}
                                                        views={v?.views}
                                                        calls={v?.calls}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </> :
                                    <>
                                        <div className='flex flex-col justify-center items-center'>
                                            <h5 className='text-center text-xl font-bold'>Anda Belum memiliki iklan</h5>
                                            <Link href={"/sell"}>
                                                <button className='rounded-full border-2 p-2 px-4 mt-3 text-white bg-green-500 hover:bg-green-700 flex gap-2 items-center'>
                                                    <PlusIcon className='w-6' />
                                                    Buat Iklan Disini
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    :
                    <LoginForm />
            }

            <BottomTabs />
        </div>
    )
}
