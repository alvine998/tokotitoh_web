import React from 'react'
import { BellIcon, MapPinIcon, MenuIcon, SearchIcon, Settings2Icon } from 'lucide-react'
import Image from 'next/image'

export default function HeaderAds() {
    return (
        <div className='w-full fixed top-0 bg-white p-2'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <button type='button' className='flex gap-2 items-center'>
                        <Settings2Icon className='w-4 h-4' />
                        Filter
                    </button>
                    <button type='button' className='flex gap-2 items-center'>
                        <MapPinIcon className='w-4 h-4' />
                        <h5>Lokasi</h5>
                    </button>
                </div>

                <div>
                    <Image alt='logo' src={'/images/tokotitoh.png'} layout='relative' width={50} height={50} className='w-7 h-7' />
                </div>
            </div>

            <div className='mt-2 flex gap-2'>
                <div className='border border-black rounded w-full flex pl-3 items-center gap-3 py-2'>
                    <SearchIcon className='w-4 h-4' />
                    <input type="text" placeholder='Cari Iklan' className='w-full focus:outline-none' />
                </div>
                <button type='button'>
                    <BellIcon className='w-7 h-7' />
                </button>
            </div>
        </div>
    )
}
