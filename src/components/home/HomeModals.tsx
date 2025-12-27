import React from "react";
import { XCircleIcon, ChevronLeftIcon, ChevronLeftCircleIcon } from "lucide-react";
import Modal from "@/components/Modal";

interface HomeModalsProps {
    modal: any;
    setModal: (modal: any) => void;
    subcat: any[];
    router: any;
    notif: any[];
    mode: any;
    setMode: (mode: any) => void;
    viewNotif: (data: any) => void;
}

const HomeModals: React.FC<HomeModalsProps> = ({
    modal,
    setModal,
    subcat,
    router,
    notif,
    mode,
    setMode,
    viewNotif,
}) => {
    return (
        <>
            {modal?.key === "tips" && (
                <Modal
                    open={modal.open}
                    setOpen={() => setModal({ ...modal, open: false, key: "" })}
                >
                    <div className="p-2">
                        <div className="flex gap-3 items-center justify-between">
                            <h1 className="font-bold text-2xl">Tips Menghindari Penipuan</h1>
                            <button onClick={() => setModal({ ...modal, open: false })}>
                                <XCircleIcon />
                            </button>
                        </div>
                        <p className="mt-2 text-lg">
                            - Hindari pembelian non COD
                            <br />
                            - Hindari DP transfer sebelum bertemu langsung dengan penjual
                            <br />
                            - Periksa surat-surat dan kelengkapan barang
                            <br />- Untuk pembelian properti cek surat-surat dan kondisi
                            situasi tanah dengan teliti sesuai dengan ketentuan yang berlaku
                            <br />
                            <br />
                            <strong>Awas Waspada Penipuan Segitiga</strong>
                            <br /> adalah penipuan di mana si pelaku penipuan tidak pernah
                            bertemu dengan korban nya si penipu menawarkan barang / bisa
                            berupa kendaraan atau lainnya dengan harga murah dimana penipu
                            berpura pura sebagai pemilik atau calo yg menawarkan barang yg
                            dijual oleh seseorang di internet dan penipuan mengiklankan
                            sendiri barang orang penjual dengan harga murah dan si penjual
                            diatur untuk mengikuti permainan nya sedemikian rupa dan calon
                            pembeli ketika bertemu penjual dan merasa cocok dengan barang
                            tersebut kemudian pembeli disuruh transfer ke rekening penipu yg
                            hanya dihubungi oleh whatsapp atau telepon dan jika pembeli
                            mentransfer uang ke rekening penipu maka uang nya akan hilang
                            diambil penipu Jadi untuk menghindari penipuan jenis ini maka
                            pembeli harus menegaskan dan mengkonfirmasi kepada orang yang kita
                            temui secara langsung untuk masalah pembayaran ke rekening yg
                            harus disetujui oleh orang yg kita temui secara langsung karena
                            orang yg kita temui secara langsung adalah orang yg diberi /
                            mempunyai kuasa atas barang kendaraan tersebut.
                        </p>
                    </div>
                </Modal>
            )}

            {modal?.key === "subcat" && (
                <Modal
                    open={modal.open}
                    setOpen={() => setModal({ ...modal, open: false, key: "" })}
                >
                    <div className="flex gap-3 items-center">
                        <button onClick={() => setModal({ ...modal, open: false })}>
                            <ChevronLeftIcon />
                        </button>
                        <h1>{modal?.data?.name?.toUpperCase()}</h1>
                    </div>
                    <div className="mt-5">
                        {subcat
                            ?.sort((a: any, b: any) => (a?.index > b?.index ? 1 : -1))
                            ?.map((v: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => router.push(`/category/${v?.id}`)}
                                    className="border border-gray-500 p-2 w-full"
                                >
                                    {v?.name?.toUpperCase()}
                                </button>
                            ))}
                    </div>
                </Modal>
            )}

            {modal?.key === "notif" && (
                <Modal
                    open={modal.open}
                    setOpen={() => setModal({ ...modal, open: false, key: "" })}
                >
                    <div className="p-2">
                        <div className="flex gap-3 items-center justify-between">
                            <h1 className="font-bold text-xl">Notifikasi</h1>
                            <button onClick={() => setModal({ ...modal, open: false })}>
                                <XCircleIcon />
                            </button>
                        </div>
                        {mode.type === "default" ? (
                            <>
                                {notif?.length > 0 ? (
                                    <div className="my-5">
                                        {notif?.map((v: any) => (
                                            <button
                                                key={v?.id}
                                                onClick={() => viewNotif(v)}
                                                className="flex flex-col gap-2 w-full border-2 rounded p-2 text-left"
                                            >
                                                <p className="font-semibold">{v?.title}</p>
                                                <p className="text-gray-500">
                                                    {v?.content?.substring(0, 30)}
                                                    {v?.content?.length > 30 ? "..." : ""}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-10 text-center text-xl font-semibold">
                                        Belum ada notifikasi!
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className="my-4 border-2 p-2 rounded">
                                <button
                                    className="flex gap-3 items-center"
                                    onClick={() => setMode({ type: "default", data: null })}
                                >
                                    <ChevronLeftCircleIcon className="w-6 h-6" />
                                    Kembali
                                </button>
                                <h5 className="text-center text-xl font-semibold mt-3">
                                    {mode?.data?.title}
                                </h5>
                                <p className="text-justify">{mode?.data?.content}</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};

export default HomeModals;
