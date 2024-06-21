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
    const [show, setShow] = useState<boolean>(false)
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
    }, [])

    const onSubmit = async () => {
        try {
            if (payload?.password !== payload?.confirm_password) {
                setLoading(false)
                Swal.fire({
                    icon: "warning",
                    text: "Password tidak sama!"
                })
                return
            }
            const result = await axios.patch(CONFIG.base_url_api + `/user`, { ...payload, id: detail?.id, email: detail?.email }, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setLoading(false)
            Swal.fire({
                icon: "success",
                text: "Berhasil memperbarui password!"
            })
            setPayload({})
            localStorage.removeItem("userReset")
            router.push("/account")
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
                    <h2 className='text-center text-xl font-semibold'>Reset Password</h2>
                    <Input label='' placeholder='Password Baru' type={show ? 'text' : 'password'} name='password' onChange={handleChange} defaultValue={payload?.password} />
                    <Input label='' placeholder='Konfirmasi Password Baru' name='confirm_password' type={show ? 'text' : 'password'} onChange={handleChange} defaultValue={payload?.confirm_password} />
                    <div className='flex items-center gap-2 pb-2'>
                        <input type="checkbox" onChange={(e) => setShow(e.target.checked)} defaultChecked={show} />
                        <span className='text-xs'>Tampilkan password</span>
                    </div>
                    <Button onClick={onSubmit} disabled={loading}>{loading ? "Mengganti..." : "Ganti"}</Button>
                </div>
            </div>
            <BottomTabs />
        </div>
    )
}
