import React, { useEffect, useState } from 'react'
import { BellIcon, MapPinIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useRouter } from 'next/router';

interface Props {
    filter: any;
    setFilter: any;
    modal?: any;
    setModal?: any;
    items?: any;
}

export default function HeaderHome(props: Props) {
    const router = useRouter();
    const { modal, setModal, items, filter, setFilter } = props;
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
                        }).catch((err: any) => {
                            console.log(err);
                            setAddress('Indonesia')
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
        <div className='w-full fixed top-0 bg-white p-2 lg:w-1/4'>
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
                <div className='w-full'>
                    <ReactSearchAutocomplete
                        items={items?.map((v: any) => ({ ...v, name: v?.title }))}
                        onSearch={(string: string, results: any) => { setFilter({ ...filter, search: string }) }}
                        placeholder='Cari barangmu disini...'
                        onSelect={(item: any)=>router.push(`/category/${item?.subcategory_id}`)}
                    />
                </div>
                <button type='button' onClick={() => { setModal({ ...modal, open: true, key: "notif" }) }}>
                    <BellIcon className='w-7 h-7' />
                </button>
            </div>
        </div>
    )
}
