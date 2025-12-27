import BottomTabs from '@/components/BottomTabs'
import Button from '@/components/Button'
import HeaderHome from '@/components/headers/HeaderHome'
import Input from '@/components/Input'
import LoginForm from '@/components/LoginForm'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, UserCircleIcon, UserIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Account() {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    const [loading, setLoading] = useState<boolean>(false)
    const [payload, setPayload] = useState<any>();
    const [detail, setDetail] = useState<any>();
    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setPayload({ ...payload, [name]: value })
    }
    useEffect(() => {
        let user: any = localStorage.getItem("userReset")
        if (!user) {
            router.push("/account")
        } else {
            user = JSON?.parse(user);
            setDetail(user)
        }
    }, [router])

    const onSubmit = async () => {
        try {
            const result = await axios.post(CONFIG.base_url_api + `/user/verification`, { ...payload, id: detail?.id, email: detail?.email }, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setLoading(false)
            Swal.fire({
                icon: "success",
                text: "Verifikasi Berhasil"
            })
            setPayload({})
            router.push("/account/reset-password")
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: "error",
                text: error?.response?.data?.message
            })
        }
    }

    return (
        <div className='pb-20 flex flex-col justify-center items-center'>
            <div className='flex-col flex justify-center items-center mt-10 w-full lg:w-1/4'>
                <Image alt='logo' src={'/images/tokotitoh.png'} layout='relative' width={250} height={250} className='w-[150px] h-[150px]' />
                <div className='mt-2 w-full px-8'>
                    <h2 className='text-center text-xl font-semibold'>Verifikasi Kode OTP</h2>
                    <Input label='' placeholder='Masukkan Kode OTP' type={'number'} name='otp' onChange={handleChange} defaultValue={payload?.otp} />
                    <div className='flex justify-end items-end'>
                        <button className='text-xs text-blue-700' onClick={() => { onSubmit() }}>Kirim Ulang Kode OTP</button>
                    </div>
                    <Button onClick={onSubmit} disabled={loading}>{loading ? "Menmverifikasi..." : "Verifikasi"}</Button>
                </div>
            </div>
            <BottomTabs />
        </div>
    )
}
