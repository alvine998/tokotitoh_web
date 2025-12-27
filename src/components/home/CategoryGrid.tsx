import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CategoryGridProps {
    filteredItems: any[];
    filteredItems2: any[];
    getSubCat: (id: any) => void;
    setModal: (modal: any) => void;
    modal: any;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
    filteredItems,
    filteredItems2,
    getSubCat,
    setModal,
    modal,
}) => {
    const router = useRouter();

    return (
        <div className="mt-28">
            <div className="grid grid-cols-3 gap-4 items-center justify-center">
                {filteredItems?.map((v: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => {
                            getSubCat(v?.id);
                            setModal({ ...modal, open: true, data: v, key: "subcat" });
                        }}
                        className="flex flex-col items-center justify-center w-auto"
                    >
                        <div className="lg:w-[100px] lg:h-[60px] md:w-[230px] md:h-[150px] sm:w-[170px] sm:h-[100px] w-[100px] h-[60px] relative">
                            <Image
                                src={v?.icon}
                                fill
                                alt="icon"
                                className="object-contain"
                            />
                        </div>
                        {v?.name}
                    </button>
                ))}
                <button
                    onClick={() => {
                        router.push("/category");
                    }}
                    className="flex flex-col items-center justify-center md:w-[230px] sm:w-[170px] lg:w-[100px] w-[100px] text-sm uppercase text-blue-700 font-semibold"
                >
                    Lihat Semua Kategori
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center justify-center mt-4">
                {filteredItems2?.map((v: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => {
                            getSubCat(v?.id);
                            setModal({ ...modal, open: true, data: v, key: "subcat" });
                        }}
                        className="flex flex-col items-center justify-center md:w-auto sm:w-auto lg:w-[100px] w-[100px]"
                    >
                        <div className="lg:w-[100px] lg:h-[60px] md:w-[230px] md:h-[150px] sm:w-[170px] sm:h-[100px] w-[100px] h-[60px] relative">
                            <Image
                                src={v?.icon}
                                fill
                                alt="icon"
                                className="object-contain"
                            />
                        </div>
                        {v?.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;
