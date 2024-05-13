import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/HeaderHome'
import { CarFrontIcon, CarIcon, InfoIcon, LucideHome, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter();
  return (
    <div className='pb-20'>
      <div className=''>
        <HeaderHome />
      </div>


      {/* Kategori */}
      <div className='p-2 mt-28'>
        <div className='flex flex-wrap gap-5 items-center justify-center'>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <Image src={'/icons/mobil.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
            Mobil
          </button>
          <button className='flex flex-col items-center justify-center w-[100px]'>
            <Image src={'/icons/motor.webp'} layout='relative' width={100} height={100} alt='icon' className='w-20 h-20' />
            Motor
          </button>
          <button onClick={() => { router.push('/category') }} className='flex flex-col items-center justify-center w-[100px] text-sm uppercase text-blue-700 font-semibold'>
            Lihat Semua Kategori
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
