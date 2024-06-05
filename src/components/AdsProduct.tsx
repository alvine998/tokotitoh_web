import { useRouter } from 'next/router'
import React from 'react'

interface Props {

}

export default function AdsProduct() {
    const router = useRouter();
    return (
        <div>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
                onClick={() => { router.push('') }}
            >
                <div className='h-32 w-full bg-blue-500 rounded'></div>
                <h5 className='text-left'>Iklan 1</h5>
                <p className='text-left font-bold text-lg'>Rp 100.000</p>
            </button>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
            >
                <div className='h-32 w-full bg-blue-500 rounded'></div>
                <h5 className='text-left'>Iklan 2</h5>
                <p className='text-left font-bold text-lg'>Rp 100.000</p>
            </button>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
            >
                <div className='h-32 w-full bg-blue-500 rounded'></div>
                <h5 className='text-left'>Iklan 3</h5>
                <p className='text-left font-bold text-lg'>Rp 100.000</p>
            </button>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
            >
                <div className='h-32 w-full bg-blue-500 rounded'></div>
                <h5 className='text-left'>Iklan 4</h5>
                <p className='text-left font-bold text-lg'>Rp 100.000</p>
            </button>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
            >
                <div className='h-32 w-full bg-blue-500 rounded'></div>
                <h5 className='text-left'>Iklan 5</h5>
                <p className='text-left font-bold text-lg'>Rp 100.000</p>
            </button>
        </div>
    )
}
