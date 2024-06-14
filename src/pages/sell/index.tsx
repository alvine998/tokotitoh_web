import BottomTabs from '@/components/BottomTabs'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal, { useModal } from '@/components/Modal'
import TextArea from '@/components/TextArea'
import HeaderHome from '@/components/headers/HeaderHome'
import { CONFIG } from '@/config'
import { storage } from '@/config/firebase'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ArrowLeft, CarFrontIcon, CarIcon, ChevronLeftCircleIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import Swal from 'sweetalert2'

export async function getServerSideProps(context: any) {
    try {
        const { page, size, category_id, brand_id } = context.query;
        const { req, res } = context;
        let user: any = getCookie('account', { req, res });
        if (!user) {
            return {
                redirect: {
                    destination: '/account',
                    permanent: false,
                }
            }
        }
        user = JSON.parse(user);
        const result = await axios.get(CONFIG.base_url_api + `/categories?`, {
            headers: {
                "bearer-token": "tokotitohapi",
                "x-partner-code": user?.partner_code
            }
        })
        let [subcategories, brands, provinces]: any = [];
        if (category_id) {
            [subcategories, brands, provinces] = await Promise.all([
                axios.get(CONFIG.base_url_api + `/subcategories?category_id=${category_id}`, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": user?.partner_code
                    }
                }),
                axios.get(CONFIG.base_url_api + `/brands?category_id=${category_id}`, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": user?.partner_code
                    }
                }),
                axios.get(CONFIG.base_url_api + `/provinces`, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": user?.partner_code
                    }
                })
            ])
        }
        let types: any = []
        if (brand_id) {
            types = await axios.get(CONFIG.base_url_api + `/types?brand_id=${brand_id}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": user?.partner_code
                }
            })
        }
        return {
            props: {
                categories: result?.data?.items?.rows,
                subcategories: subcategories?.data?.items?.rows || [],
                brands: brands?.data?.items?.rows || [],
                types: types?.data?.items?.rows || [],
                provinces: provinces?.data?.items?.rows || [],
                user
            }
        }
    } catch (error: any) {
        console.log(error);
        if (error?.response?.status == 401) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
        return {
            props: {
                error: error?.response?.data?.message,
            }
        }
    }
}

export default function Sell({ categories, subcategories, brands, types, provinces, user }: any) {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    const [subcat, setSubcat] = useState<any>([]);
    const [filter, setFilter] = useState<any>(router.query)
    const fileInputRef: any = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    const [images, setImages] = useState<any>([]);
    const [progress, setProgress] = useState<any>();

    const handleImage = async (e: any) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (file?.size <= 30000) {
                const storageRef = ref(storage, `images/ads/${file?.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                }, (error) => {
                    console.log(error);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImages([...images, downloadURL]);
                    })
                })
            } else {
                return Swal.fire({
                    icon: "error",
                    text: "Ukuran Gambar Tidak Boleh Lebih Dari 30Kb"
                })
            }

        }
    }
    const [isMoved, setIsMoved] = useState<number>(0);
    const [selected, setSelected] = useState<any>();
    const [filled, setFilled] = useState<any>([1]);
    const [list, setList] = useState<any>({
        cities: [],
        districts: [],
        villages: []
    })

    const getCity = async (data: any) => {
        try {
            const result = await axios.get(CONFIG.base_url_api + `/cities?province_id=${data?.value}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setList({
                cities: result?.data?.items?.rows,
                districts: [],
                villages: []
            })
            setSelected({ ...selected, province_id: data?.value, province_name: data?.label })
        } catch (error) {
            console.log(error);
        }
    }

    const getDistrict = async (data: any) => {
        try {
            const result = await axios.get(CONFIG.base_url_api + `/districts?city_id=${data?.value}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setList({
                ...list,
                districts: result?.data?.items?.rows,
                villages: []
            })
            setSelected({ ...selected, city_id: data?.value, city_name: data?.label })
        } catch (error) {
            console.log(error);
        }
    }

    const getVillage = async (data: any) => {
        try {
            const result = await axios.get(CONFIG.base_url_api + `/villages?district_id=${data?.value}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setList({
                ...list,
                villages: result?.data?.items?.rows
            })
            setSelected({ ...selected, district_id: data?.value, district_name: data?.label })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const queryFilter = new URLSearchParams(filter).toString();
        router.push(`?${queryFilter}`)
    }, [filter])

    const handleCategory = (data: any) => {
        setFilled([...filled, 2])
        setIsMoved(1);
        setFilter({ ...filter, category_id: data?.id })
        setSelected({ category_id: data?.id, category_name: data?.name })
    };
    const handleSubCategory = (data: any) => {
        setFilled([...filled, 3])
        setIsMoved(2);
        setFilter({ ...filter, subcategory_id: data?.id })
        setSelected({ ...selected, subcategory_id: data?.id, subcategory_name: data?.name })
    };
    const handleFormData = () => {
        setFilled([...filled, 4])
        setIsMoved(3);
    };
    const handleGeolocation = () => {
        setFilled([...filled, 5])
        setIsMoved(4);
    };
    const handlePreviousButtonClick = () => {
        if (isMoved > 0) {
            setIsMoved(isMoved - 1);
            setFilled(filled?.filter((v: any) => v !== (isMoved + 1)))
        }
    };

    const onSubmit = async () => {
        try {
            const payload = {
                ...selected,
                images: images,
                user_id: user?.id,
                user_name: user?.name,
                price: +selected?.price?.replaceAll(",", ""),
                km: +selected?.km?.replaceAll(",", ""),
            }
            const result = await axios.post(CONFIG.base_url_api + '/ads', payload, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": user?.partner_code
                }
            });
            Swal.fire({
                icon: "success",
                text: "Berhasil membuat iklan!"
            })
            router.push('/myads')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='pb-20'>
            <div className="relative w-full h-screen">

                {/* Numbering */}
                <div className='flex gap-2 justify-center pt-2 fixed top-0 left-0 right-0 z-[99] bg-white'>
                    {
                        [1, 2, 3, 4, 5]?.map((v: any) => (
                            <div key={v} className={filled?.includes(v) ? 'bg-blue-500 rounded-full p-2 w-10' : 'border rounded-full p-2 w-10'}>
                                <p className={filled?.includes(v) ? 'text-white text-center' : 'text-black text-center'}>{v}</p>
                            </div>
                        ))
                    }
                </div>

                {/* Select Category */}
                <div
                    className={`absolute z-0 top-10 ${isMoved == 0 ? 'left-0' : 'left-full hidden'} bg-white w-full h-auto mt-2 transition-all duration-500`}
                >
                    <button className='text-blue-700 m-2 flex items-center gap-2' type='button' onClick={() => { router.push('/') }}>
                        <ArrowLeft />
                        Kembali
                    </button>
                    <p className='m-2 mt-4'>Apa yang ingin anda jual?</p>
                    <div className='mt-4'>
                        {
                            categories?.map((v: any) => (
                                <button onClick={() => { handleCategory(v) }} type='button' key={v?.id} className='p-2 border w-full text-left hover:bg-gray-300'>
                                    {v?.name}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* Select Subcategory */}
                <div
                    className={`absolute z-10 top-10 ${isMoved == 1 ? 'left-0' : 'left-full hidden'} bg-white p-2 w-full h-auto transition-all duration-500`}
                >
                    <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                        <ArrowLeft />
                    </button>
                    <p className='m-2'>Pilih Sub Kategori {selected?.category_name}:</p>
                    <div className='mt-4'>
                        {
                            subcategories?.map((v: any) => (
                                <button onClick={() => { handleSubCategory(v) }} type='button' key={v?.id} className='p-2 border w-full text-left hover:bg-gray-300'>
                                    {v?.name}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* Form Data */}
                <div
                    className={`absolute z-20 top-10 ${isMoved == 2 ? 'left-0' : 'left-full hidden'} bg-white p-2 w-full h-auto transition-all duration-500`}
                >
                    <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                        <ArrowLeft />
                    </button>
                    <p className='m-2'>{selected?.category_name} {">"} {selected?.subcategory_name}</p>
                    <div className='mt-4'>
                        <Input label='Judul' placeholder='Masukkan Judul Iklan' maxLength={30} onChange={(e: any) => { setSelected({ ...selected, title: e.target.value }) }} />
                        <div>
                            <label className='text-gray-500' htmlFor="brand">Brand</label>
                            <ReactSelect
                                options={brands?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))}
                                placeholder="Pilih Brand"
                                onChange={(e: any) => { setFilter({ ...filter, brand_id: e?.value }), setSelected({ ...selected, brand_id: e?.value, brand_name: e?.label }) }}
                                maxMenuHeight={200}
                                id='brand'
                            />
                        </div>
                        <div className='mt-2'>
                            <label className='text-gray-500' htmlFor="type">Tipe</label>
                            <ReactSelect
                                isDisabled={types?.length < 1}
                                options={types?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))}
                                placeholder="Pilih Tipe"
                                onChange={(e: any) => { setSelected({ ...selected, type_id: e?.value, type_name: e?.label }) }}
                                maxMenuHeight={200}
                                id='type'
                            />
                        </div>
                        <Input label='Harga' placeholder='Masukkan Harga' numericformat onChange={(e: any) => { setSelected({ ...selected, price: e.target.value }) }} />
                        <TextArea label='Deksripsi' placeholder='Masukkan Deskripsi' maxLength={250} onChange={(e) => { setSelected({ ...selected, description: e.target.value }) }} />
                        {
                            selected?.category_name?.toLowerCase()?.includes('properti') ?
                                <div>
                                    <Input label='Luas (m2)' placeholder='Masukkan Luas (m2)' numericformat onChange={(e: any) => { setSelected({ ...selected, area: e.target.value }) }} />
                                    <Input label='Sertifikat' placeholder='Masukkan Sertifikat' onChange={(e: any) => { setSelected({ ...selected, certificates: e.target.value }) }} />
                                </div> : ""
                        }
                        {
                            selected?.category_name?.toLowerCase()?.includes('mobil') || selected?.category_name?.toLowerCase()?.includes('motor') ?
                                <div>
                                    <Input label='Trip KM' placeholder='Masukkan Trip KM' numericformat onChange={(e: any) => { setSelected({ ...selected, km: e.target.value }) }} />
                                    <div className='mt-2'>
                                        <label className='text-gray-500' htmlFor="fuel_type">Jenis Bahan Bakar</label>
                                        <ReactSelect
                                            options={[
                                                { value: "bensin", label: "Bensin" },
                                                { value: "diesel", label: "Diesel" },
                                                { value: "hybrid", label: "Hybrid" },
                                                { value: "ev", label: "Listrik" }
                                            ]}
                                            placeholder="Pilih Jenis Bahan Bakar"
                                            onChange={(e: any) => { setSelected({ ...selected, fuel_type: e.value }) }}
                                            maxMenuHeight={200}
                                            id='fuel_type'
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <label className='text-gray-500' htmlFor="transmission">Jenis Transmisi</label>
                                        <ReactSelect
                                            options={[
                                                { value: "MT", label: "Manual" },
                                                { value: "AT", label: "Automatic" },
                                                { value: "CVT", label: "CVT" }
                                            ]}
                                            onChange={(e: any) => { setSelected({ ...selected, transmission: e.value }) }}
                                            placeholder="Pilih Jenis Transmisi"
                                            maxMenuHeight={200}
                                            id='transmission'
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <label className='text-gray-500' htmlFor="ownership">Kepemilikan</label>
                                        <ReactSelect
                                            options={[
                                                { value: "individual", label: "Pribadi" },
                                                { value: "company", label: "Dealer" },
                                            ]}
                                            onChange={(e: any) => { setSelected({ ...selected, ownership: e.value }) }}
                                            placeholder="Pilih Kepemilikan"
                                            maxMenuHeight={200}
                                            id='ownership'
                                        />
                                    </div>
                                    <Input label='Tahun' placeholder='Masukkan Tahun' type='number' onChange={(e: any) => { setSelected({ ...selected, year: e.target.value }) }} />
                                    <Input label='Warna' placeholder='Masukkan Warna' onChange={(e: any) => { setSelected({ ...selected, color: e.target.value }) }} />
                                    <Input label='Plat Nomor' placeholder='X1234YYY' onChange={(e: any) => { setSelected({ ...selected, plat_no: e.target.value }) }} />
                                    <Button color='info' type='button' onClick={handleFormData} >Selanjutnya</Button>
                                </div> : ""
                        }
                    </div>
                </div>

                {/* Select Location */}
                <div
                    className={`absolute z-40 top-10 ${isMoved == 3 ? 'left-0' : 'left-full hidden'} bg-white p-2 w-full h-auto transition-all duration-500`}
                >
                    <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                        <ArrowLeft />
                    </button>
                    <p className='m-2'>Pilih Lokasi:</p>
                    <div className='mt-4'>
                        <div>
                            <label className='text-gray-500' htmlFor="province">Provinsi</label>
                            <ReactSelect
                                options={provinces?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))}
                                placeholder="Pilih Provinsi"
                                onChange={(e: any) => { getCity(e) }}
                                maxMenuHeight={200}
                                id='province'
                            />
                        </div>
                        <div className='mt-2'>
                            <label className='text-gray-500' htmlFor="city">Kota/Kab</label>
                            <ReactSelect
                                isDisabled={list?.cities?.length < 1}
                                options={list?.cities?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))}
                                placeholder="Pilih Kota/Kab"
                                maxMenuHeight={200}
                                onChange={(e: any) => { getDistrict(e) }}
                                id='city'
                            />
                        </div>
                        <div className='mt-2'>
                            <label className='text-gray-500' htmlFor="district">Kecamatan</label>
                            <ReactSelect
                                isDisabled={list?.districts?.length < 1}
                                options={list?.districts?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))}
                                placeholder="Pilih Kecamatan"
                                maxMenuHeight={200}
                                onChange={(e: any) => { getVillage(e) }}
                                id='district'
                            />
                        </div>
                        <div className='mt-2'>
                            <label className='text-gray-500' htmlFor="village">Kelurahan/Desa</label>
                            <ReactSelect
                                isDisabled={list?.villages?.length < 1}
                                options={list?.villages?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }))}
                                placeholder="Pilih Kelurahan/Desa"
                                onChange={(e: any) => setSelected({ ...selected, village_id: e.value, village_name: e.label })}
                                maxMenuHeight={200}
                                id='village'
                            />
                        </div>
                        <Button color='info' type='button' onClick={handleGeolocation} >Selanjutnya</Button>
                    </div>
                </div>

                {/* Image */}
                <div
                    className={`absolute z-50 top-10 ${isMoved == 4 ? 'left-0' : 'left-full hidden'} bg-white p-2 w-full h-auto transition-all duration-500`}
                >
                    <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                        <ArrowLeft />
                    </button>
                    <p className='m-2'>Pilih Gambar:</p>
                    <div className='mt-5'>
                        <input type="file" className='hidden' ref={fileInputRef} onChange={handleImage} accept='image/*' />
                        <button disabled={images?.length == 10} type='button' onClick={handleButtonClick} className='border rounded p-2 w-full flex gap-2 items-center justify-center'>
                            <PlusIcon className='w-4' />
                            Tambah
                        </button>
                        {
                            progress && <p className={progress == 100 ? "hidden" : ""}>Progress: {progress}%</p>
                        }
                        <div className='flex flex-wrap mt-5'>
                            {
                                images?.map((v: any) => (
                                    <Image alt='images' src={v} key={v} layout='relative' width={300} height={300} className='w-1/3 h-[100px]' />
                                ))
                            }
                        </div>
                        <Button color='info' className={'mt-4'} onClick={onSubmit}>Selesai</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
