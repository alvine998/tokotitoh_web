import BottomTabs from '@/components/BottomTabs'
import Modal, { useModal } from '@/components/Modal'
import HeaderHome from '@/components/headers/HeaderHome'
import { CONFIG } from '@/config'
import axios from 'axios'
import { CarFrontIcon, CarIcon, ChevronLeftCircleIcon, ChevronLeftIcon, InfoIcon, LucideHome, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export async function getServerSideProps(context: any) {
    try {
        const { page, size } = context.query;
        const result = await axios.get(CONFIG.base_url_api + `/categories?page=${page || 0}&size=${size || 99999}`, {
            headers: {
                "bearer-token": "tokotitohapi",
                "x-partner-code": "id.marketplace.tokotitoh"
            }
        })
        return {
            props: {
                categories: result?.data?.items?.rows
            }
        }
    } catch (error: any) {
        console.log(error);
        if (error?.response?.status == 401) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
        return {
            props: {
                error: error?.response?.data?.message,
            }
        }
    }
}

export default function Menu({ categories }: any) {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>()
    const [subcat, setSubcat] = useState<any>([]);

    return (
        <div className='pb-20  flex flex-col justify-center items-center'>
            {/* Kategori */}
            <div className='p-2 mt-5 max-w-sm w-full'>
                <h2 className='text-center font-semibold text-2xl'>Menu</h2>
                <div className='flex flex-col gap-2 items-center justify-center mt-5'>
                    <button type="button" onClick={() => { setModal({ ...modal, open: true, data: "Tips Hindari Penipuan Online", key: "penipuan" }) }}
                        className='bg-white border-2 hover:bg-gray-200 duration-200 transition-all rounded w-full p-2 text-xl'>
                        Tips Hindari Penipuan
                    </button>
                    <button type="button" onClick={() => { setModal({ ...modal, open: true, data: "Cara Beriklan", key: "cara_beriklan" }) }}
                        className='bg-white border-2 hover:bg-gray-200 duration-200 transition-all rounded w-full p-2 text-xl'>
                        Cara Beriklan
                    </button>
                </div>
            </div>


            {/* Modal */}
            {
                modal?.open ?
                    <Modal
                        open={modal.open}
                        setOpen={() => setModal({ ...modal, open: false, key: "" })}
                    >
                        <div className='flex gap-3 items-center'>
                            <button onClick={() => { setModal({ ...modal, open: false }) }}>
                                <ChevronLeftIcon />
                            </button>
                            <h1 className='font-bold text-xl'>{modal?.data}</h1>
                        </div>
                        <div className='mt-5 p-2'>
                            {
                                modal?.key == "penipuan" ?
                                    <p className='text-lg'>
                                        - Hindari pembelian Non COD<br />
                                        - Hindari DP transfer sebelum bertemu langsung dengan penjual. Periksa surat surat dan kelengkapan barang<br />
                                        - Untuk pembelian properti, Cek surat surat dan kondisi situasi tanah dengan teliti sesuai ketentuan yg berlaku<br /><br />

                                        <strong>Awas Waspada Penipuan Segitiga</strong><br />
                                        adalah penipuan di mana si pelaku penipuan tidak pernah bertemu dengan korban nya si penipu menawarkan barang / bisa
                                        berupa kendaraan atau lainnya dengan harga murah dimana penipu berpura pura sebagai pemilik atau calo yg menawarkan
                                        barang yg dijual oleh seseorang di internet dan penipuan mengiklankan sendiri barang orang penjual dengan harga murah
                                        dan si penjual diatur untuk mengikuti permainan nya sedemikian rupa dan calon pembeli ketika bertemu penjual dan merasa
                                        cocok dengan barang tersebut kemudian pembeli disuruh transfer ke rekening penipu yg hanya dihubungi oleh whatsapp atau
                                        telepon dan jika pembeli mentransfer uang ke rekening penipu maka uang nya akan hilang diambil penipu Jadi untuk menghindari
                                        penipuan jenis ini maka pembeli harus menegaskan dan mengkonfirmasi kepada orang yang kita temui secara langsung untuk masalah
                                        pembayaran ke rekening yg harus disetujui oleh orang yg kita temui secara langsung karena orang yg kita temui secara langsung
                                        adalah orang yg diberi / mempunyai kuasa atas barang kendaraan tersebut.
                                    </p> :
                                    <p className='text-lg'>
                                        1. Buat judul iklan yang baik<br/>
                                        2. Cantumkan nomor kontak telepon dan WA yang aktif<br/>
                                        3. Pilih kategori yang sesuai<br/>
                                        4. Pasang foto yang berkualitas<br/>
                                        5. Memberikan detail informasi barang dengan lengkap dan akurat
                                    </p>
                            }
                        </div>
                    </Modal> : ""
            }

            <BottomTabs />
        </div>
    )
}
