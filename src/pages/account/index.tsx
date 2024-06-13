import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/headers/HeaderHome'
import LoginForm from '@/components/LoginForm'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, UserCircleIcon, UserIcon, XCircleIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Account() {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    const [user, setUser] = useState<any>(null)

    const logout = async () => {
        localStorage.removeItem('usertokotitoh')
        deleteCookie('account')
        router.reload()
    }

    useEffect(() => {
        let user: any = getCookie('account')
        if (user) {
            user = JSON.parse(user)
            setUser(user)
        }
    }, [])
    return (
        <div className='pb-20'>
            {
                user == null ?
                    <LoginForm /> :
                    <div className='p-2 pt-10'>
                        <div className='flex gap-3 items-center'>
                            <UserCircleIcon className='w-20 h-20' />
                            <div>
                                <h5 className='font-bold text-lg'>{user?.name}</h5>
                                <h5 className='text-lg'>{user?.email || user?.phone}</h5>
                            </div>
                        </div>
                        <button onClick={() => {
                            setModal({ ...modal, open: true, key: "edit", data: null })
                        }} className='w-full bg-blue-500 p-2 rounded text-white mt-4'>
                            Edit Akun
                        </button>
                        <div className='py-2'>
                            <button type='button' className='border p-2 w-full' >Tentang Kami</button>
                            <button type='button' className='border p-2 w-full' >Bantuan</button>
                            <button type='button' className='border p-2 w-full' >Download Aplikasi Tokotitoh</button>
                        </div>
                        <button onClick={logout} className='w-full bg-red-500 p-2 rounded text-white mt-2'>
                            Logout
                        </button>
                    </div>
            }
            <BottomTabs />
        </div>
    )
}
