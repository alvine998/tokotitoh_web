import Image from 'next/image'
import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import axios from 'axios';
import { CONFIG } from '@/config';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [type, setType] = useState<string>('login');
    const [payload, setPayload] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setPayload({ ...payload, [name]: value })
    }

    const onSubmit = async () => {
        setLoading(true)
        try {
            if (type == "login") {
                const result = await axios.post(CONFIG.base_url_api + `/user/login`, payload, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh"
                    }
                })
                setLoading(false)
                Swal.fire({
                    icon: "success",
                    text: "Selamat Datang " + result?.data?.user?.name
                })
                localStorage.setItem('usertokotitoh', JSON.stringify(result?.data?.user))
                router.push("")
            }
            if (type == "register") {
                const result = await axios.post(CONFIG.base_url_api + `/user`, { ...payload, role: "customer" }, {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh"
                    }
                })
                setLoading(false)
                Swal.fire({
                    icon: "success",
                    text: "Pendaftaran Berhasil"
                })
                setPayload({})
                setType("login")
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <div>
            {
                type == "login" ?
                    <div className='flex-col flex justify-center items-center mt-20'>
                        <Image alt='logo' src={'/images/tokotitoh.png'} layout='relative' width={250} height={250} className='w-[150px] h-[150px]' />
                        <div className='mt-2 w-full px-8'>
                            <h2 className='text-center text-xl font-semibold'>Login Tokotitoh</h2>
                            <Input label='' placeholder='Email / No Telepon' name='identity' onChange={handleChange} />
                            <Input label='' placeholder='Password' name='password' type={show ? "text" : "password"} onChange={handleChange} />
                            <div className='flex items-center gap-2 pb-2'>
                                <input type="checkbox" onChange={(e) => setShow(e.target.checked)} defaultChecked={show} />
                                <span className='text-xs'>Tampilkan password</span>
                            </div>
                            <Button onClick={onSubmit} disabled={loading}>{loading ? "Memproses..." : "Masuk"}</Button>
                            <p className='text-center'>Atau</p>
                            <Button color='warning' type='button' onClick={() => setType('register')} >Daftar</Button>
                        </div>
                    </div> :
                    <div className='flex-col flex justify-center items-center mt-10'>
                        <Image alt='logo' src={'/images/tokotitoh.png'} layout='relative' width={250} height={250} className='w-[150px] h-[150px]' />
                        <div className='mt-2 w-full px-8'>
                            <h2 className='text-center text-xl font-semibold'>Daftar Tokotitoh</h2>
                            <Input label='' placeholder='Nama' name='name' onChange={handleChange} />
                            <Input label='' placeholder='No Telepon' name='phone' onChange={handleChange} type='number' maxLength={13} />
                            <Input label='' placeholder='Email' name='email' onChange={handleChange} type='email' />
                            <Input label='' placeholder='Password' name='password' type={show ? "text" : "password"} onChange={handleChange} />
                            <div className='flex items-center gap-2 pb-2'>
                                <input type="checkbox" onChange={(e) => setShow(e.target.checked)} defaultChecked={show} />
                                <span className='text-xs'>Tampilkan password</span>
                            </div>
                            <Button onClick={onSubmit} disabled={loading}>{loading ? "Mendaftarkan..." : "Daftar"}</Button>
                            <p className='text-center'>Atau</p>
                            <Button color='warning' onClick={() => setType('login')} >Login</Button>
                        </div>
                    </div>
            }

        </div>
    )
}
