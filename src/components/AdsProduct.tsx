import { toMoney } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    path: string;
    title: string;
    price: any;
    thumbnail: string;
    status?: any;
}

export default function AdsProduct(props: Props) {
    const { path, price, thumbnail, title, status } = props
    const router = useRouter();
    return (
        <div>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
                onClick={() => { router.push(path) }}
            >
                <Image alt='thumbnail' src={thumbnail} layout='relative' width={300} height={300} className='h-[200px] w-full rounded' />
                <div className='flex justify-between items-center mt-4'>
                    <div>
                        <h5 className='text-left'>{title}</h5>
                        <p className='text-left font-bold text-lg'>Rp {toMoney(price)}</p>
                    </div>
                    {
                        router.pathname == '/myads' ?
                            <div>
                                <p className={
                                    status == 0 ? 'text-orange-700':
                                    status == 1 ? 'text-green-700': "text-red-700"
                                }>{status == 0 ? "Sedang Ditinjau" : status == 1 ? "Disetujui" : "Ditolak"}</p>
                            </div> : ""
                    }
                </div>

            </button>
        </div>
    )
}
