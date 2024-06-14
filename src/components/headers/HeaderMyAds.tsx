import React, { useEffect, useState } from 'react'
import { BellIcon, MapPinIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

interface Props {
    filter: any;
    setFilter: any;
    items: any
}

export default function HeaderMyAds(props: Props) {
    const { filter, setFilter, items } = props;

    return (
        <div className='w-full lg:w-1/4 fixed top-0 bg-white'>
            <div className='mt-4 flex gap-2 px-2'>
                {/* <div className='border border-black rounded w-full flex pl-3 items-center gap-3 py-2'>
                    <SearchIcon className='w-4 h-4' />
                    <input type="search" placeholder='Cari Iklan Saya...' className='w-full focus:outline-none' defaultValue={filter?.search} onChange={(e) => {
                        setFilter({ search: e.target.value })
                    }} />
                </div> */}
                <div className='w-full'>
                    <ReactSearchAutocomplete
                        items={items?.map((v:any) => ({...v, name: v?.title}))}
                        onSearch={(string: string, results: any) => { setFilter({ search: string }) }}
                        placeholder='Cari disini...'
                    />
                </div>
            </div>
        </div>
    )
}
