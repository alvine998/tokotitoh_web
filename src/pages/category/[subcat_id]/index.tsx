import AdsProduct from '@/components/AdsProduct'
import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Ads() {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()
  return (
    <div className='pb-20'>
      <div className=''>
        <HeaderHome />
      </div>


      {/* Kategori */}
      <div className='p-2 mt-28'>
        <AdsProduct />
      </div>

      <BottomTabs />
    </div>
  )
}
