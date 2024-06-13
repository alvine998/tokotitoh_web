import React, { useEffect, useState } from 'react'
import { BellIcon, MapPinIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';

export default function HeaderMyAds() {

    return (
        <div className='w-full fixed top-0 bg-white p-2'>
            <div className='mt-2 flex gap-2'>
                <div className='border border-black rounded w-full flex pl-3 items-center gap-3 py-2'>
                    <SearchIcon className='w-4 h-4' />
                    <input type="search" placeholder='Cari Iklan Saya...' className='w-full focus:outline-none' />
                </div>
            </div>
        </div>
    )
}
