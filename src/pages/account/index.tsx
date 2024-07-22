import BottomTabs from '@/components/BottomTabs'
import Button from '@/components/Button'
import HeaderHome from '@/components/headers/HeaderHome'
import Input from '@/components/Input'
import LoginForm from '@/components/LoginForm'
import Modal, { useModal } from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { CarFrontIcon, CarIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon, UserCircleIcon, UserIcon, XCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Account() {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    const [user, setUser] = useState<any>(null)

    const logout = async () => {
        localStorage.removeItem('usertokotitoh')
        deleteCookie('account')
        router.reload()
    }

    const update = async (e: any) => {
        e?.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target))
        try {
            if (formData?.password) {
                if (formData?.password !== formData?.password_confirm) {
                    return Swal.fire({
                        icon: "warning",
                        text: "Password tidak sesuai"
                    })
                }
            }
            const payload = {
                ...formData
            }
            const result = await axios.patch(CONFIG.base_url_api + `/user`, payload, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
            Swal.fire({
                icon: "success",
                text: "Data Berhasil Disimpan"
            })
            setCookie('account', {
                ...user,
                name: formData?.name,
                phone: formData?.phone,
                email: formData?.email
            })
            setModal({ ...modal, open: false })
            router.reload()
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                text: "Data Gagal Disimpan"
            })
        }
    }

    useEffect(() => {
        let user: any = getCookie('account')
        if (user) {
            user = JSON.parse(user)
            setUser(user)
        }
    }, [])
    return (
        <div className='pb-20 flex flex-col justify-center items-center'>
            {
                user == null ?
                    <LoginForm /> :
                    <div className='p-2 pt-10 lg:max-w-sm'>
                        <div className='flex gap-3 items-center'>
                            <UserCircleIcon className='w-20 h-20' />
                            <div>
                                <h5 className='font-bold text-lg'>{user?.name}</h5>
                                <h5 className='text-lg'>{user?.email || user?.phone}</h5>
                            </div>
                        </div>
                        <button onClick={() => {
                            setModal({ ...modal, open: true, key: "edit", data: null })
                        }} className='w-full bg-blue-500 p-2 rounded text-white mt-4'>
                            Edit Akun
                        </button>
                        <div className='py-2'>
                            <Link href={'https://play.google.com/'}>
                                <button type='button' className='border p-2 w-full' >Download Aplikasi</button>
                            </Link>
                            <button type='button' onClick={() => {
                                router.push('helps/help-center')
                            }} className='border p-2 w-full' >Pusat Bantuan</button>
                            <button type='button' onClick={() => {
                                router.push('helps/call-us')
                            }} className='border p-2 w-full' >Hubungi Kami</button>
                            <button type='button' onClick={() => {
                                router.push('helps/about-us')
                            }} className='border p-2 w-full' >Tentang Kami</button>
                            <button type='button' onClick={() => {
                                router.push('helps/term-condition')
                            }} className='border p-2 w-full' >Syarat & Ketentuan</button>
                            <button type='button' onClick={() => {
                                router.push('helps/privacy-policy')
                            }} className='border p-2 w-full' >Kebijakan Privasi</button>
                        </div>
                        <button onClick={logout} className='w-full bg-red-500 p-2 rounded text-white mt-2'>
                            Logout
                        </button>

                        {
                            modal?.key == "edit" ?
                                <Modal
                                    open={modal.open}
                                    setOpen={() => { }}
                                >
                                    <form onSubmit={update}>
                                        <h2 className='text-xl font-semibold text-center'>Ubah Profil</h2>
                                        <div>
                                            <Input placeholder='Masukkan Nama' label='Nama' defaultValue={user?.name || ""} name='name' required />
                                            <Input placeholder='Masukkan Email' label='Email' defaultValue={user?.email || ""} name='email' type='email' />
                                            <Input placeholder='Masukkan No Telepon' label='No Telepon' defaultValue={user?.phone || ""} name='phone' type='number' />
                                            <Input placeholder='********' minLength={8} label='Password' defaultValue={""} name='password' type='password' />
                                            <Input placeholder='********' minLength={8} label='Konfirmasi Password' defaultValue={""} name='password_confirm' type='password' />
                                            <input type="hidden" name="id" value={user?.id} />
                                        </div>
                                        <Button type='submit'>Simpan</Button>
                                        <Button type='button' onClick={() => { setModal({ ...modal, open: false }) }} color='white' >Keluar</Button>
                                    </form>
                                </Modal> : ""
                        }
                    </div>
            }
            <BottomTabs />
        </div>
    )
}
