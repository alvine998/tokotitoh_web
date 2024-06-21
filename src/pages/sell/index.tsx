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
import { ArrowLeft, CarFrontIcon, CarIcon, ChevronLeftCircleIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import Swal from 'sweetalert2'

export async function getServerSideProps(context: any) {
    try {
        const { page, size, category_id, brand_id, id, account_id } = context.query;
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
        let detail: any = []
        if (id && account_id) {
            detail = await axios.get(CONFIG.base_url_api + `/ads?id=${id}`, {
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
                detail: detail?.data?.items?.rows[0] || [],
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

export default function Sell({ categories, subcategories, brands, types, provinces, user, detail }: any) {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    const [subcat, setSubcat] = useState<any>([]);
    const [filter, setFilter] = useState<any>(router.query)
    const fileInputRef: any = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    const [images, setImages] = useState<any>(detail?.images || []);
    const [progress, setProgress] = useState<boolean>(false);

    const handleImage = async (e: any) => {
        setProgress(true)
        if (e.target.files) {
            const file = e.target.files[0]
            if (file?.size <= 2000000) {
                const storageRef = ref(storage, `images/ads/${file?.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                }, (error) => {
                    console.log(error);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImages([...images, downloadURL]);
                        setProgress(false);
                    })
                })
            } else {
                setProgress(false);
                return Swal.fire({
                    icon: "error",
                    text: "Ukuran Gambar Tidak Boleh Lebih Dari 2mb"
                })
            }

        }
    }
    const [isMoved, setIsMoved] = useState<number>(filter?.account_id ? 2 : 0);
    const [selected, setSelected] = useState<any>({
        ...detail
    });
    const [filled, setFilled] = useState<any>(detail?.id ? [1, 2, 3] : [1]);
    const [list, setList] = useState<any>({
        cities: [],
        districts: [],
        villages: []
    })

    const getCity = async (data: any) => {
        try {
            const result = await axios.get(CONFIG.base_url_api + `/cities?province_id=${data?.value || data}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setList({
                cities: result?.data?.items?.rows?.map((v: any) => ({ ...v, value: v?.id, label: v?.name })),
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
            const result = await axios.get(CONFIG.base_url_api + `/districts?city_id=${data?.value || data}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            setList({
                ...list,
                districts: result?.data?.items?.rows?.map((v: any) => ({ ...v, value: v?.id, label: v?.name })),
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
        if (detail) {
            const geolocation = async () => {
                const result = await axios.get(CONFIG.base_url_api + `/cities?province_id=${detail?.province_id}`, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh"
                    }
                })
                const result2 = await axios.get(CONFIG.base_url_api + `/districts?city_id=${detail?.city_id}`, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh"
                    }
                })
                setList({
                    cities: result?.data?.items?.rows?.map((v: any) => ({ ...v, value: v?.id, label: v?.name })),
                    districts: result2?.data?.items?.rows?.map((v: any) => ({ ...v, value: v?.id, label: v?.name })),
                    villages: []
                })
            }
            geolocation()
        }
    }, [])

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

    const validationFormData = (data: any) => {
        let next = true
        if (data?.category_name?.toLowerCase()?.includes('mobil') || data?.category_name?.toLowerCase()?.includes('motor')) {
            ['title', 'brand_id', 'type_id', 'price', 'description', 'km', 'fuel_type', 'transmission', 'ownership', 'year', 'color']?.map((val: any) => {
                if (!data[val] || data[val] == "") {
                    Swal.fire({
                        icon: "warning",
                        text: `Harap lengkapi semua kolom!`
                    })
                    next = false
                }
            })
            if (next) {
                setFilled([...filled, 4])
                setIsMoved(3);
                return
            }
        }
        else if (data?.category_name?.toLowerCase()?.includes('properti')) {
            ['title', 'price', 'description', 'certificates', 'area', 'building']?.map((val: any) => {
                if (!data[val] || data[val] == "") {
                    Swal.fire({
                        icon: "warning",
                        text: `Harap lengkapi kolom!`
                    })
                    next = false
                }
            })
            if (next) {
                setFilled([...filled, 4])
                setIsMoved(3);
                return
            }
        }
        else {
            ['title', 'price', 'description']?.map((val: any) => {
                if (!data[val] || data[val] == "") {
                    Swal.fire({
                        icon: "warning",
                        text: `Harap lengkapi kolom!`
                    })
                    next = false
                }
            })
            if (next) {
                setFilled([...filled, 4])
                setIsMoved(3);
                return
            }
        }
    }
    const handleGeolocation = (data: any) => {
        let next = true;
        ['province_id', 'district_id', 'city_id']?.map((val: any) => {
            if (!data[val] || data[val] == "") {
                Swal.fire({
                    icon: "warning",
                    text: `Harap lengkapi kolom!`
                })
                next = false
            }
        })
        if (next) {
            setFilled([...filled, 5])
            setIsMoved(4);
            return
        }
    };
    const handlePreviousButtonClick = () => {
        if (isMoved > 0) {
            setIsMoved(isMoved - 1);
            setFilled(filled?.filter((v: any) => v !== (isMoved + 1)))
        }
    };

    const onSubmit = async () => {
        try {
            if (images?.length < 1) {
                return Swal.fire({
                    icon: "warning",
                    text: "Gambar Wajib Diisi"
                })
            }
            // Get today's date
            let today = new Date();

            // Subtract 200 days
            let pastDate = new Date();
            pastDate.setDate(today.getDate() + 200);

            // Format the date (optional)
            let day: any = pastDate.getDate();
            let month: any = pastDate.getMonth() + 1; // Months are zero-based in JavaScript
            let year = pastDate.getFullYear();

            // Pad single digit day and month with a leading zero (optional)
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;

            const payload = {
                ...selected,
                images: images,
                user_id: user?.id,
                user_name: user?.name,
                price: +selected?.price,
                km: +selected?.km,
                expired_on: `${year}-${month}-${day}`
            }
            if (detail?.id) {
                await axios.patch(CONFIG.base_url_api + '/ads', { ...payload, id: detail?.id, status: 0 }, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": user?.partner_code
                    }
                });
            } else {
                await axios.post(CONFIG.base_url_api + '/ads', payload, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": user?.partner_code
                    }
                });
            }
            Swal.fire({
                icon: "success",
                text: "Berhasil membuat iklan!"
            })
            router.push('/myads')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                text: "Gagal membuat iklan!"
            })
        }
    }
    let BRANDS = brands?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }));
    let TYPES = types?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }));
    let FUELTYPES = [
        { value: "bensin", label: "Bensin" },
        { value: "diesel", label: "Diesel" },
        { value: "hybrid", label: "Hybrid" },
        { value: "ev", label: "Listrik" }
    ]
    let TRANSMISSIONTYPES = [
        { value: "MT", label: "Manual" },
        { value: "AT", label: "Automatic" },
        { value: "CVT", label: "CVT" }
    ];
    let OWNERSHIPS = [
        { value: "individual", label: "Pribadi" },
        { value: "company", label: "Dealer" },
    ];
    let PROVINCES = provinces?.map((v: any) => ({ ...v, value: v?.id, label: v?.name }));
    return (
        <div className='pb-20 flex justify-center items-center'>
            <div className="relative w-full max-w-2xl">

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
                {
                    isMoved == 0 ?
                        <div className='mt-20'>
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
                        </div> : ""
                }

                {/* Select Subcategory */}
                {
                    isMoved == 1 ?
                        <div className='mt-20'>
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
                        </div> : ""
                }

                {/* Form Data */}
                {
                    isMoved == 2 ?
                        <div className='mt-20'>
                            {
                                filter?.id && filter?.account_id ?
                                    "" :
                                    <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                                        <ArrowLeft />
                                    </button>
                            }
                            <p className='m-2 mt-4'>{selected?.category_name} {">"} {selected?.subcategory_name}</p>
                            <div className='mt-4'>
                                <Input label='Judul' defaultValue={selected?.title || ""} placeholder='Masukkan Judul Iklan' maxLength={30} onChange={(e: any) => { setSelected({ ...selected, title: e.target.value }) }} />
                                <div>
                                    <label className='text-gray-500' htmlFor="brand">Brand</label>
                                    <ReactSelect
                                        options={BRANDS}
                                        placeholder="Pilih Brand"
                                        onChange={(e: any) => { setFilter({ ...filter, brand_id: e?.value }), setSelected({ ...selected, brand_id: e?.value, brand_name: e?.label }) }}
                                        maxMenuHeight={200}
                                        defaultValue={BRANDS?.find((v: any) => v?.id == detail?.brand_id)}
                                        id='brand'
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label className='text-gray-500' htmlFor="type">Tipe</label>
                                    <ReactSelect
                                        isDisabled={types?.length < 1}
                                        options={TYPES}
                                        placeholder="Pilih Tipe"
                                        onChange={(e: any) => { setSelected({ ...selected, type_id: e?.value, type_name: e?.label }) }}
                                        maxMenuHeight={200}
                                        defaultValue={TYPES?.find((v: any) => v?.id == selected?.type_id)}
                                        id='type'
                                    />
                                </div>
                                <Input label='Harga' placeholder='Masukkan Harga' defaultValue={+selected?.price || ""} numericformat onChange={(e: any) => { setSelected({ ...selected, price: +e.target.value?.replaceAll(",", "") }) }} />
                                <TextArea label='Deksripsi' placeholder='Masukkan Deskripsi' maxLength={250} defaultValue={selected?.description || ""} onChange={(e) => { setSelected({ ...selected, description: e.target.value }) }} />
                                {
                                    selected?.category_name?.toLowerCase()?.includes('properti') ?
                                        <div>
                                            <Input label='Luas (m2)' placeholder='Masukkan Luas (m2)' defaultValue={+selected?.area || ""} numericformat onChange={(e: any) => { setSelected({ ...selected, area: e.target.value }) }} />
                                            <Input label='Sertifikat' placeholder='Masukkan Sertifikat' defaultValue={selected?.certificates || ""} onChange={(e: any) => { setSelected({ ...selected, certificates: e.target.value }) }} />
                                        </div> : ""
                                }
                                {
                                    selected?.category_name?.toLowerCase()?.includes('mobil') || selected?.category_name?.toLowerCase()?.includes('motor') ?
                                        <div>
                                            <Input label='Trip KM' placeholder='Masukkan Trip KM' defaultValue={+selected?.km || ""} numericformat onChange={(e: any) => { setSelected({ ...selected, km: +e.target.value?.replaceAll(",", "") }) }} />
                                            <div className='mt-2'>
                                                <label className='text-gray-500' htmlFor="fuel_type">Jenis Bahan Bakar</label>
                                                <ReactSelect
                                                    options={FUELTYPES}
                                                    placeholder="Pilih Jenis Bahan Bakar"
                                                    onChange={(e: any) => { setSelected({ ...selected, fuel_type: e.value }) }}
                                                    maxMenuHeight={200}
                                                    id='fuel_type'
                                                    defaultValue={FUELTYPES?.find((v: any) => v?.value == selected?.fuel_type)}
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label className='text-gray-500' htmlFor="transmission">Jenis Transmisi</label>
                                                <ReactSelect
                                                    options={TRANSMISSIONTYPES}
                                                    onChange={(e: any) => { setSelected({ ...selected, transmission: e.value }) }}
                                                    placeholder="Pilih Jenis Transmisi"
                                                    maxMenuHeight={200}
                                                    id='transmission'
                                                    defaultValue={TRANSMISSIONTYPES?.find((v: any) => v?.value == selected?.transmission)}
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label className='text-gray-500' htmlFor="ownership">Kepemilikan</label>
                                                <ReactSelect
                                                    options={OWNERSHIPS}
                                                    onChange={(e: any) => { setSelected({ ...selected, ownership: e.value }) }}
                                                    placeholder="Pilih Kepemilikan"
                                                    maxMenuHeight={200}
                                                    id='ownership'
                                                    defaultValue={OWNERSHIPS?.find((v: any) => v?.value == selected?.ownership)}
                                                />
                                            </div>
                                            <Input label='Tahun' defaultValue={+selected?.year || ""} placeholder='Masukkan Tahun' type='number' onChange={(e: any) => { setSelected({ ...selected, year: e.target.value }) }} />
                                            <Input label='Warna' defaultValue={selected?.color || ""} placeholder='Masukkan Warna' onChange={(e: any) => { setSelected({ ...selected, color: e.target.value }) }} />
                                            {/* <Input label='Plat Nomor' defaultValue={selected?.plat_no || ""} placeholder='X1234YYY' onChange={(e: any) => { setSelected({ ...selected, plat_no: e.target.value }) }} /> */}
                                        </div> : ""
                                }
                                <Button color='info' type='button' onClick={() => validationFormData(selected)} >Selanjutnya</Button>
                            </div>
                        </div> : ""
                }

                {/* Select Location */}
                {
                    isMoved == 3 ?
                        <div
                            className='mt-20'
                        >
                            <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                                <ArrowLeft />
                            </button>
                            <p className='m-2'>Pilih Lokasi:</p>
                            <div className='mt-4'>
                                <div>
                                    <label className='text-gray-500' htmlFor="province">Provinsi</label>
                                    <ReactSelect
                                        options={PROVINCES}
                                        placeholder="Pilih Provinsi"
                                        onChange={(e: any) => { getCity(e) }}
                                        maxMenuHeight={200}
                                        id='province'
                                        defaultValue={PROVINCES?.find((v: any) => v?.id == detail?.province_id)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label className='text-gray-500' htmlFor="city">Kota/Kab</label>
                                    <ReactSelect
                                        isDisabled={list?.cities?.length < 1}
                                        options={list?.cities}
                                        placeholder="Pilih Kota/Kab"
                                        maxMenuHeight={200}
                                        onChange={(e: any) => { getDistrict(e) }}
                                        id='city'
                                        defaultValue={{ value: detail?.city_id || "", label: detail?.city_name || "Pilih Kota/Kab" }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label className='text-gray-500' htmlFor="district">Kecamatan</label>
                                    <ReactSelect
                                        isDisabled={list?.districts?.length < 1}
                                        options={list?.districts}
                                        placeholder="Pilih Kecamatan"
                                        maxMenuHeight={200}
                                        onChange={(e: any) => { getVillage(e) }}
                                        id='district'
                                        defaultValue={{ value: detail?.district_id || "", label: detail?.district_name || "Pilih Kecamatan" }}
                                    />
                                </div>
                                <Button color='info' type='button' onClick={() => { handleGeolocation(selected) }} >Selanjutnya</Button>
                            </div>
                        </div> : ""
                }

                {/* Image */}
                {
                    isMoved == 4 ?
                        <div
                            className='mt-20'
                        >
                            <button className='text-blue-700' type='button' onClick={handlePreviousButtonClick}>
                                <ArrowLeft />
                            </button>
                            <div className='bg-green-300 p-2 w-full rounded'>
                                <p className='text-center'>Pastikan ukuran gambar tidak lebih dari 2mb</p>
                            </div>
                            <p className='m-2'>Pilih Gambar:</p>
                            <div className='mt-5'>
                                <input type="file" className='hidden' ref={fileInputRef} onChange={handleImage} accept='image/*' />
                                <button disabled={images?.length == 10} type='button' onClick={handleButtonClick} className='border rounded p-2 w-full flex gap-2 items-center justify-center'>
                                    <PlusIcon className='w-4' />
                                    Tambah
                                </button>
                                {
                                    progress ? <p className={progress ? "block" : "hidden"}>Loading Upload....</p> : ""
                                }
                                <div className='flex flex-wrap mt-5'>
                                    {
                                        images?.map((v: any) => (
                                            <button key={v} onClick={() => { setImages(images.filter((val: any) => val !== v)) }} className='relative group w-1/3'>
                                                <Image alt='images' src={v} layout='relative' width={300} height={300} className='w-full h-[100px]' />
                                                <div className='absolute inset-0 bg-red-700 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-50 transition-opacity duration-300'>
                                                    <TrashIcon className='text-white' /> <p className='text-white'>Hapus</p>
                                                </div>
                                            </button>
                                        ))
                                    }
                                </div>
                                <Button color='info' className={'mt-4'} onClick={onSubmit}>Selesai</Button>
                            </div>
                        </div> : ""
                }
            </div>
        </div>
    )
}
