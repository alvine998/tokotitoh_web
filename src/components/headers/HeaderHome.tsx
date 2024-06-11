import React, { useEffect, useState } from 'react'
import { BellIcon, MapPinIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';

export default function HeaderHome() {
    const [location, setLocation] = useState<any>({ latitude: null, longitude: null });
    const [adress, setAddress] = useState<any>();

    const geolocation = async () => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        const result = axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`).then((data) => {
                            const address = data.data.address
                            setAddress(`${address?.village || ""}, ${address?.county || ""}`)
                        })
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        geolocation();
    }, [])

    return (
        <div className='w-full fixed top-0 bg-white p-2'>
            <div className='flex justify-between'>
                <button type='button' className='flex gap-2 items-center'>
                    <MapPinIcon className='w-4 h-4' />
                    <h5>{adress}</h5>
                </button>
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
