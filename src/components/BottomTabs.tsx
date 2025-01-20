import { HeartIcon, HomeIcon, MenuIcon, PlusIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/router';
import React from 'react'

export default function BottomTabs() {
    const router = useRouter();
    return (
        <div className='fixed bottom-0 w-full lg:w-1/4 md:max-w-sm h-[50px] bg-white border-t border-t-gray-300 flex justify-center gap-2 items-center px-2'>
            <button onClick={() => { router.push('/') }} type='button' className={`${router.pathname == "/" ? "font-bold" : ""} flex flex-col items-center justify-center w-[150px] hover:font-bold`}>
                <HomeIcon className='w-5 h-5' />
                <p>Home</p>
            </button>
            <button type='button' onClick={() => { router.push('/menu') }} className={`flex flex-col items-center justify-center w-[150px] ${router.pathname == '/menu' ? 'font-bold' : ''} hover:font-bold`}>
                <MenuIcon className='w-5 h-5' />
                <p>Menu</p>
            </button>
            <button type='button' onClick={() => { router.push('/sell') }} className={`flex flex-col items-center justify-center w-[150px] ${router.pathname == '/sell' ? 'font-bold' : ''} hover:font-bold`}>
                <div className='p-2 border-2 border-black rounded -mt-5 bg-white'>
                    <PlusIcon className='w-5 h-5' />
                </div>
                <p>Jual</p>
            </button>
            <button type='button' onClick={() => { router.push('/myads') }} className={`flex flex-col items-center justify-center w-[150px] ${router.pathname == '/myads' ? 'font-bold' : ''} hover:font-bold`}>
                <HeartIcon className='w-5 h-5' />
                <p className='text-xs'>Iklan Saya</p>
            </button>
            <button onClick={() => { router.push('/account') }} type='button' className={`flex flex-col items-center justify-center w-[160px] ${router.pathname == '/account' ? 'font-bold' : ''} hover:font-bold`}>
                <UserIcon className='w-5 h-5' />
                <p className='text-xs'>Akun Saya</p>
            </button>
        </div>
    )
}
