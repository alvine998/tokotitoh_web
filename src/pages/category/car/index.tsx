import BottomTabs from '@/components/BottomTabs'
import HeaderHome from '@/components/headers/HeaderHome'
import Modal, { useModal } from '@/components/Modal'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Home() {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>()
  return (
    <div className='pb-20'>
      <div className=''>
        <HeaderHome />
      </div>


      {/* Kategori */}
      <div className='p-2 mt-28'>
        
      </div>

      {/* Modal */}
      {
        modal?.key == "car" ?
          <Modal
            open={modal.open}
            setOpen={() => setModal({ ...modal, open: false, key: "" })}
          >
            <div className='flex gap-3 items-center'>
              <button onClick={() => { setModal({ ...modal, open: false }) }}>
                <ChevronLeftIcon />
              </button>
              <h1>Mobil</h1>
            </div>
            <div className='mt-5'>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Dijual
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Kredit / TT
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Disewakan
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Mobil Baru / Promosi
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Sparepart
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Aksesoris & Audio
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Velg & Ban
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Bengkel / Montir
              </button>
              <button className='border border-gray-500 p-2 w-full'>
                Karoseri
              </button>
            </div>
          </Modal> : ""
      }

      <BottomTabs />
    </div>
  )
}
