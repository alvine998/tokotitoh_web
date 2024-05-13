import { HeartIcon, HomeIcon, MenuIcon, PlusIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/router';
import React from 'react'

export default function BottomTabs() {
    const router = useRouter();
    return (
        <div className='fixed bottom-0 w-full h-[50px] bg-white border-t border-t-gray-300 flex justify-center gap-2 items-center px-2'>
            <button onClick={()=>{router.push('/')}} type='button' className={`${!router.pathname ? "font-bold" : ""} flex flex-col items-center justify-center w-[150px]`}>
                <HomeIcon className='w-5 h-5' />
                <p>Home</p>
            </button>
            <button type='button' className='flex flex-col items-center justify-center w-[150px]'>
                <MenuIcon className='w-5 h-5' />
                <p>Menu</p>
            </button>
            <button type='button' className='flex flex-col items-center justify-center w-[150px]'>
                <div className='p-2 border-2 border-black rounded -mt-5 bg-white'>
                    <PlusIcon className='w-5 h-5' />
                </div>
                <p>Jual</p>
            </button>
            <button type='button' className='flex flex-col items-center justify-center w-[150px]'>
                <HeartIcon className='w-5 h-5' />
                <p className='text-xs'>Iklan Saya</p>
            </button>
            <button type='button' className='flex flex-col items-center justify-center w-[160px]'>
                <UserIcon className='w-5 h-5' />
                <p className='text-xs'>Akun Saya</p>
            </button>
        </div>
    )
}
