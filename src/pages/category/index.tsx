import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/headers/HeaderHome'
import { CarFrontIcon, CarIcon, ChevronLeftCircleIcon, InfoIcon, LucideHome, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Category() {
    const router = useRouter();
    return (
        <div className='pb-20'>
            <div className=''>
                <HeaderHome />
            </div>

            {/* Kategori */}
            <div className='p-2 mt-[90px]'>
                <button className='flex gap-3 items-center' onClick={() => { router.push('/') }}>
                    <ChevronLeftCircleIcon className='w-6 h-6' />
                    Kembali
                </button>
                <div className='flex flex-wrap gap-5 items-center justify-center mt-5'>
                    <button className='flex flex-col items-center justify-center w-[100px]'>
                        <Image src={'/icons/mobil.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Mobil
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px]'>
                        <Image src={'/icons/motor.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Motor
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px]'>
                        <Image src={'/icons/properti.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Properti
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px]'>
                        <Image src={'/icons/elektronik.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Elektronik
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px]'>
                        <Image src={'/icons/hp.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        HP
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/rumah-tangga.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Rumah Tangga
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/barang-pribadi.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Barang Pribadi
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/makananminuman.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Makanan Minuman
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/bahan-bangunan.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Bahan Bangunan
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/bayi.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Keperluan Bayi Dan Anak
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px]'>
                        <Image src={'/icons/hobi.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Hobi
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/hewantanaman.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Hewan Dan Tanaman
                    </button>
                    <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
                        <Image src={'/icons/jasa-lowongan.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
                        Jasa Lowongan Kantor Industri
                    </button>
                </div>
            </div>

            <BottomTabs />
        </div>
    )
}
