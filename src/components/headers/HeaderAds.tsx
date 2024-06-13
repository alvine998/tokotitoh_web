import React, { useEffect, useState } from 'react'
import { BellIcon, MapPinIcon, MenuIcon, SearchIcon, Settings2Icon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';
import Modal, { useModal } from '../Modal';
import ReactSelect from 'react-select';
import Button from '../Button';

interface Props {
    ads: any;
    filter: any;
    setFilter: any;
    brands?: any;
    types?: any;
}

export default function HeaderAds(props: Props) {
    const { ads, filter, setFilter, brands, types } = props;

    const [location, setLocation] = useState<any>({ latitude: null, longitude: null });
    const [adress, setAddress] = useState<any>();
    const [modal, setModal] = useState<useModal>();
    const [filterName, setFilterName] = useState<any>("MEREK/MODEL");
    const [show, setShow] = useState<any>({
        brand: false,
        type: false
    })

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

    let navs = [
        {
            name: "MEREK/MODEL"
        },
        {
            name: "LOKASI"
        },
        {
            name: "HARGA"
        },
        {
            name: "TAHUN"
        },
        {
            name: "TRANSMISI"
        },
        {
            name: "BAHAN BAKAR"
        },
        {
            name: "URUTKAN"
        },
    ]

    return (
        <div className='w-full fixed top-0 bg-white p-2'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <button type='button' onClick={() => {
                        setModal({ ...modal, data: ads, open: true, key: "filter" })
                    }} className='flex gap-2 items-center'>
                        <Settings2Icon className='w-4 h-4' />
                        Filter
                    </button>
                    <button type='button' className='flex gap-2 items-center'>
                        <MapPinIcon className='w-4 h-4' />
                        <h5>{adress}</h5>
                    </button>
                </div>

                <div>
                    <Image alt='logo' src={'/images/tokotitoh.png'} layout='relative' width={50} height={50} className='w-7 h-7' />
                </div>
            </div>

            <div className='mt-2 flex gap-2'>
                <div className='border border-black rounded w-full flex pl-3 items-center gap-3 py-2'>
                    <SearchIcon className='w-4 h-4' />
                    <input type="search" placeholder='Cari Iklan' className='w-full focus:outline-none' defaultValue={filter?.search} onChange={(e) => {
                        setFilter({ ...filter, search: e.target.value })
                    }} />
                </div>
                <button type='button'>
                    <BellIcon className='w-7 h-7' />
                </button>
            </div>

            <div className='mt-2'>
                <p>{ads?.category_name} {">"} {ads?.subcategory_name}</p>
            </div>

            {
                modal?.key == "filter" ?
                    <Modal
                        open={modal.open}
                        setOpen={() => { }}
                    >
                        <div className='h-screen'>
                            <div className='p-2'>
                                <div className='flex justify-between items-center'>
                                    <p>Filter: {ads[0]?.category_name} {">"} {ads[0]?.subcategory_name}</p>
                                    <button type='button' onClick={() => setModal({ ...modal, open: false })}>
                                        <XCircleIcon className='w-7' />
                                    </button>
                                </div>
                                <div className='flex mt-8'>
                                    <div className='w-auto flex flex-col gap-2'>
                                        {
                                            navs?.map((v: any, i: number) => (
                                                <button key={i} onClick={() => { setFilterName(v?.name) }} className={`border-2 p-2 rounded text-xs ${filterName == v?.name ? 'bg-gray-300' : ''} hover:bg-gray-300 duration-200 transition-all`}>
                                                    {v?.name}
                                                </button>
                                            ))
                                        }
                                    </div>
                                    <div className='w-full'>
                                        {
                                            filterName == "MEREK/MODEL" ?
                                                <div>
                                                    {
                                                        !show?.brand && !show?.type ?
                                                            <div className='duration-200 transition-all'>
                                                                <div className='flex items-center justify-evenly gap-2'>
                                                                    {
                                                                        brands?.slice(0, 3)?.map((v: any, i: number) => (
                                                                            <button key={i} type='button' onClick={() => { setFilter({ ...filter, brand_id: v?.id }) }}>
                                                                                <Image alt='logo-brand' layout='relative' src={v?.image} width={100} height={100} className='w-auto h-[50px]' />
                                                                            </button>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className='flex items-center justify-evenly gap-2 mt-4'>
                                                                    {
                                                                        brands?.slice(3, 6)?.map((v: any, i: number) => (
                                                                            <button key={i} type='button' onClick={() => { setFilter({ ...filter, brand_id: v?.id }) }}>
                                                                                <Image alt='logo-brand' layout='relative' src={v?.image} width={100} height={100} className='w-auto h-[50px]' />
                                                                            </button>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className='flex items-center justify-evenly gap-2 mt-4'>
                                                                    {
                                                                        brands?.slice(6, 9)?.map((v: any, i: number) => (
                                                                            <button key={i} type='button' onClick={() => { setFilter({ ...filter, brand_id: v?.id }) }}>
                                                                                <Image alt='logo-brand' layout='relative' src={v?.image} width={100} height={100} className='w-auto h-[50px]' />
                                                                            </button>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className='flex items-center justify-evenly gap-2 mt-4'>
                                                                    {
                                                                        brands?.slice(9, 12)?.map((v: any, i: number) => (
                                                                            <button key={i} type='button' onClick={() => { setFilter({ ...filter, brand_id: v?.id }) }}>
                                                                                <Image alt='logo-brand' layout='relative' src={v?.image} width={100} height={100} className='w-auto h-[50px]' />
                                                                            </button>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div> : ""
                                                    }
                                                    <div className='flex flex-col gap-2 items-center justify-center pl-2'>
                                                        <ReactSelect
                                                            options={[{value:"", label: "Semua Merek"}, ...brands?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))]}
                                                            onChange={(e: any) => { setFilter({ ...filter, brand_id: e.value, type_id: '' }) }}
                                                            maxMenuHeight={150}
                                                            placeholder="Pilih Merek"
                                                            className='w-full'
                                                            defaultValue={{ value: filter?.brand_id, label: brands?.find((v: any) => v?.id == filter?.brand_id)?.name || "Semua Merek" }}
                                                        />
                                                        <ReactSelect
                                                            isDisabled={types?.length < 1}
                                                            options={[{value:"", label: "Semua Model"}, ...types?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))]}
                                                            onChange={(e: any) => { setFilter({ ...filter, type_id: e.value }) }}
                                                            maxMenuHeight={150}
                                                            placeholder="Pilih Model"
                                                            className='w-full'
                                                            defaultValue={{ value: filter?.type_id, label: types?.find((v: any) => v?.id == filter?.type_id)?.name || "Semua Model" }}
                                                        />
                                                        <Button color='info' onClick={() => { setModal({ ...modal, open: false }) }}>Terapkan</Button>
                                                    </div>
                                                </div> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal> : ""
            }
        </div>
    )
}
