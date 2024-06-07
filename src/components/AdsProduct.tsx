import { toMoney } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    path: string;
    title: string;
    price: any;
    thumbnail: string;
}

export default function AdsProduct(props: Props) {
    const {path, price, thumbnail, title} = props
    const router = useRouter();
    return (
        <div>
            <button
                type='button'
                className='shadow border p-2 rounded lg:h-auto w-full'
                onClick={() => { router.push(path) }}
            >
                <Image alt='thumbnail' src={thumbnail} layout='relative' width={300} height={300} className='h-[200px] w-full rounded' />
                <h5 className='text-left'>{title}</h5>
                <p className='text-left font-bold text-lg'>Rp {toMoney(price)}</p>
            </button>
        </div>
    )
}
