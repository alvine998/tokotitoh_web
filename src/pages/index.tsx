import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/HeaderHome'
import { CarFrontIcon, CarIcon, InfoIcon, LucideHome, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <div className='pb-20'>
      <div className=''>
        <HeaderHome />
      </div>

      {/* Kategori */}
      <div className='p-2 mt-28'>
        <div className='flex flex-wrap gap-3 items-center justify-center'>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <CarFrontIcon className='w-20 h-20' />
            Mobil
          </button>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <CarFrontIcon className='w-20 h-20' />
            Motor
          </button>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <LucideHome className='w-20 h-20' />
            Properti
          </button>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <CarFrontIcon className='w-20 h-20' />
            Elektronik
          </button>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <CarFrontIcon className='w-20 h-20' />
            HP
          </button>
          <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
            <CarFrontIcon className='w-20 h-20' />
            Rumah Tangga
          </button>
          <button className='flex flex-col items-center justify-center text-xs w-[100px]'>
            <CarFrontIcon className='w-20 h-20' />
            Barang Pribadi Bayi & Anak
          </button>
          <button className='flex flex-col items-center justify-center text-xs w-[100px]'>
            <CarFrontIcon className='w-20 h-20' />
            Jasa Lowongan Kantor Industri
          </button>
          <button className='flex flex-col items-center justify-center w-[100px] text-xs'>
            <CarFrontIcon className='w-20 h-20' />
            Bahan Bangunan
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className='p-2 mt-5'>
        <div className='flex gap-2'>
          <button className='w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm'>
            <InfoIcon className='text-blue-700' />
            Tips Hindari Penipuan
          </button>
          <button className='w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm'>
            <PlusCircleIcon className='text-green-700' />
            Pasang Iklan Baru
          </button>
        </div>
      </div>

      <BottomTabs />
    </div>
  )
}
