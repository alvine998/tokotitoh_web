import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, UserCircleIcon, UserIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Account() {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    return (
        <div className='pb-20'>
            <div className='p-2 pt-10'>
                <div className='flex gap-3 items-center'>
                    <UserCircleIcon className='w-20 h-20' />
                    <div>
                        <h5 className='font-bold text-lg'>Arman</h5>
                        <h5 className='text-lg'>armanmaulana@gmail.com</h5>
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
                <button onClick={() => {
                    setModal({ ...modal, open: true, key: "edit", data: null })
                }} className='w-full bg-red-500 p-2 rounded text-white mt-2'>
                    Logout
                </button>
            </div>
            <BottomTabs />
        </div>
    )
}
