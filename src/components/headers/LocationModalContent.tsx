import React from "react";
import { XCircleIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../Button";

interface LocationModalContentProps {
    modal: any;
    setModal: (modal: any) => void;
    list: any;
    setList: (list: any) => void;
    filter: any;
    setFilter: (filter: any) => void;
    provinces: any[];
    getCity: (data: any) => void;
    getDistrict: (data: any) => void;
    setLoading: (loading: boolean) => void;
}

const LocationModalContent: React.FC<LocationModalContentProps> = ({
    modal,
    setModal,
    list,
    setList,
    filter,
    setFilter,
    provinces,
    getCity,
    getDistrict,
    setLoading,
}) => {
    return (
        <div className="bg-white h-[90vh] w-full overflow-auto pb-4">
            <div className="flex justify-end pr-4">
                <button onClick={() => setModal({ ...modal, open: false })}>
                    <XCircleIcon />
                </button>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center p-4">
                <h1 className="text-3xl text-black font-bold mb-4">Pilih Lokasi</h1>

                {list?.districts?.length > 0 ? (
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={() => {
                                setFilter({ ...filter, district_id: "", city_id: "" });
                                setList({ ...list, districts: [] });
                            }}
                            className="py-1 px-2 border-b-2 w-full flex gap-2 items-center"
                        >
                            <ChevronLeft />
                            <p>Kembali</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter({ ...filter, district_id: "" })}
                            className={`py-1 px-2 w-full flex justify-between items-center ${filter?.district_id === "" ? "border-2 border-blue-400 rounded" : "border-b-2"
                                }`}
                        >
                            <p>Semua Kecamatan</p>
                            <ChevronRight />
                        </button>
                        {list.districts.map((v: any, i: number) => (
                            <button
                                type="button"
                                onClick={() => setFilter({ ...filter, district_id: v.id })}
                                className={`py-1 px-2 w-full flex justify-between items-center ${filter?.district_id === v.id ? "border-2 border-blue-400 rounded" : "border-b-2"
                                    }`}
                                key={i}
                            >
                                <p>{v.name}</p>
                                <ChevronRight />
                            </button>
                        ))}
                    </div>
                ) : list?.cities?.length > 0 ? (
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={() => {
                                getDistrict({ id: "" });
                                setFilter({ ...filter, province_id: "" });
                                setList({ ...list, cities: [] });
                            }}
                            className="py-1 px-2 border-b-2 w-full flex gap-2 items-center"
                        >
                            <ChevronLeft />
                            <p>Kembali</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => getDistrict({ id: "" })}
                            className={`py-1 px-2 w-full flex justify-between items-center ${filter?.city_id === "" ? "border-2 border-blue-400 rounded" : "border-b-2"
                                }`}
                        >
                            <p>Semua Kota/Kab</p>
                            <ChevronRight />
                        </button>
                        {list.cities.map((v: any, i: number) => (
                            <button
                                type="button"
                                onClick={() => getDistrict(v)}
                                className="py-1 px-2 border-b-2 w-full flex justify-between items-center"
                                key={i}
                            >
                                <p>{v.name}</p>
                                <ChevronRight />
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={() => getCity({ id: "" })}
                            className={`py-1 px-2 w-full flex justify-between items-center ${filter?.province_id === "" ? "border-2 border-blue-400 rounded" : "border-b-2"
                                }`}
                        >
                            <p>Semua Provinsi</p>
                            <ChevronRight />
                        </button>
                        {provinces?.map((v: any, i: number) => (
                            <button
                                type="button"
                                onClick={() => getCity(v)}
                                className="py-1 px-2 border-b-2 w-full flex justify-between items-center"
                                key={i}
                            >
                                <p>{v.name}</p>
                                <ChevronRight />
                            </button>
                        ))}
                    </div>
                )}

                <div className="fixed bottom-0 w-full px-4 left-0">
                    <Button
                        color="info"
                        onClick={() => {
                            setModal({ ...modal, open: false });
                            setLoading(true);
                        }}
                    >
                        Terapkan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LocationModalContent;
