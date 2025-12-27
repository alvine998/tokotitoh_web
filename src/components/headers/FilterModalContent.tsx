import React from "react";
import { XCircleIcon, XIcon, SquareCheck, Square, CheckIcon } from "lucide-react";
import Input from "../Input";
import Button from "../Button";
import Image from "next/image";

interface FilterModalContentProps {
    ads: any;
    modal: any;
    setModal: (modal: any) => void;
    selected: any;
    setSelected: (selected: any) => void;
    filter: any;
    setFilter: (filter: any) => void;
    filterName: string;
    setFilterName: (name: string) => void;
    list: any;
    setList: (list: any) => void;
    brands: any[];
    categories: any[];
    subcat_id?: any;
    searchString: string;
    setSearchString: (search: string) => void;
    params: any;
    router: any;
    getType: (id: any) => void;
    getSubcategory: (v: any) => void;
    resetFilters: (categories: any[]) => void;
    setLoading: (loading: boolean) => void;
    navsCar: any[];
    navsProperty: any[];
    navsBusTruck: any[];
    navsFoodPet: any[];
    navs: any[];
}

const FilterModalContent: React.FC<FilterModalContentProps> = ({
    ads,
    modal,
    setModal,
    selected,
    setSelected,
    filter,
    setFilter,
    filterName,
    setFilterName,
    list,
    setList,
    brands,
    categories,
    subcat_id,
    searchString,
    setSearchString,
    params,
    router,
    getType,
    getSubcategory,
    resetFilters,
    setLoading,
    navsCar,
    navsProperty,
    navsBusTruck,
    navsFoodPet,
    navs,
}) => {
    return (
        <div className="p-2">
            <div className="flex justify-between items-start">
                <p className="text-lg">
                    Filter: {ads?.category_name || "Semua Kategori"} {">"}{" "}
                    {ads?.name || "Semua Sub Kategori"}
                </p>
                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={() => setModal({ ...modal, open: false })}
                        className="justify-end items-end flex"
                    >
                        <XCircleIcon className="w-7" />
                    </button>
                    <button
                        type="button"
                        onClick={() => resetFilters(categories)}
                        className="text-blue-700 mr-2 border-2 border-black rounded py-1 px-4 mt-1 text-lg"
                    >
                        Reset
                    </button>
                </div>
            </div>
            {/* Filter Selected Tokens */}
            <div className="w-full overflow-y-auto mt-2 gap-2 flex">
                {Object.entries(selected)
                    ?.filter(([key, value]: any) => value !== "" && !key?.includes("_id"))
                    ?.map(([key, value]: any) => (
                        <div
                            key={key}
                            className="flex bg-blue-500 rounded-full py-1 px-2 items-end w-auto"
                        >
                            <p className="text-white text-lg">{value}</p>
                            <button
                                className="ml-2"
                                onClick={() => setSelected({ ...selected, [key]: "" })}
                            >
                                <XIcon className="text-white w-4" />
                            </button>
                        </div>
                    ))}
            </div>
            <div className="flex mt-2">
                {/* Navigation Sidebar */}
                <div className="lg:w-auto w-auto flex flex-col gap-2">
                    {((ads?.category_name?.toLowerCase()?.includes("mobil") &&
                        ads?.name?.toLowerCase()?.includes("mobil")) ||
                        (ads?.category_name?.toLowerCase()?.includes("motor") &&
                            ads?.name?.toLowerCase()?.includes("motor"))) &&
                        navsCar.map((v, i) => (
                            <button
                                key={i}
                                onClick={() => setFilterName(v.name)}
                                className={`border-2 w-auto p-2 rounded text-lg ${filterName === v.name ? "bg-gray-300" : ""
                                    } hover:bg-gray-300 duration-200 transition-all`}
                            >
                                {v.name}
                            </button>
                        ))}
                    {ads?.category_name?.toLowerCase()?.includes("properti") &&
                        navsProperty.map((v, i) => (
                            <button
                                key={i}
                                onClick={() => setFilterName(v.name)}
                                className={`border-2 p-2 rounded text-lg ${filterName === v.name ? "bg-gray-300" : ""
                                    } hover:bg-gray-300 duration-200 transition-all`}
                            >
                                {v.name}
                            </button>
                        ))}
                    {(ads?.name?.toLowerCase() === "alat berat di sewakan" ||
                        ads?.name?.toLowerCase() === "alat berat di jual" ||
                        ads?.name?.toLowerCase() === "bus dan truk dijual" ||
                        ads?.name?.toLowerCase() === "bus dan truk di sewakan") &&
                        navsBusTruck.map((v, i) => (
                            <button
                                key={i}
                                onClick={() => setFilterName(v.name)}
                                className={`border-2 p-2 rounded text-lg ${filterName === v.name ? "bg-gray-300" : ""
                                    } hover:bg-gray-300 duration-200 transition-all`}
                            >
                                {v.name}
                            </button>
                        ))}
                    {(ads?.category_name?.toLowerCase()?.includes("makanan") ||
                        ads?.category_name?.toLowerCase()?.includes("hewan")) &&
                        navsFoodPet.map((v, i) => (
                            <button
                                key={i}
                                onClick={() => setFilterName(v.name)}
                                className={`border-2 p-2 rounded text-lg ${filterName === v.name ? "bg-gray-300" : ""
                                    } hover:bg-gray-300 duration-200 transition-all`}
                            >
                                {v.name}
                            </button>
                        ))}
                    {!ads?.category_name?.toLowerCase()?.includes("mobil") &&
                        !ads?.category_name?.toLowerCase()?.includes("motor") &&
                        !ads?.category_name?.toLowerCase()?.includes("properti") &&
                        !ads?.category_name?.toLowerCase()?.includes("makanan") &&
                        !ads?.category_name?.toLowerCase()?.includes("hewan") &&
                        navs.map((v, i) => (
                            <button
                                key={i}
                                onClick={() => setFilterName(v.name)}
                                className={`border-2 p-2 rounded text-lg ${filterName === v.name ? "bg-gray-300" : ""
                                    } hover:bg-gray-300 duration-200 transition-all`}
                            >
                                {v.name}
                            </button>
                        ))}
                    <button
                        onClick={() => setFilterName("KATEGORI")}
                        className={`border-2 w-auto p-2 rounded text-lg hover:bg-gray-300 duration-200 transition-all ${filterName === "KATEGORI" ? "bg-gray-300" : ""
                            }`}
                    >
                        KATEGORI
                    </button>
                </div>

                {/* Content Area */}
                <div className={`w-full ${list?.types?.length > 0 ? "pb-12" : "pb-0"}`}>
                    {filterName === "KATEGORI" && (
                        <div className="lg:h-[60vh] h-[70vh] overflow-auto">
                            <div className="flex flex-col gap-2 pl-2 mt-4">
                                {list?.subcategories?.length > 0
                                    ? list.subcategories.map((v: any, i: number) => (
                                        <button
                                            key={i}
                                            className="w-full px-2 py-1 text-lg text-left border-b"
                                            onClick={() => {
                                                if (v.id !== 0) {
                                                    setModal({ ...modal, open: false });
                                                    setList({ ...list, subcategories: [] });
                                                    router.push(
                                                        `/category/${v.id}?size=6&search=${searchString}`
                                                    );
                                                } else {
                                                    setList({ ...list, subcategories: [] });
                                                }
                                            }}
                                        >
                                            {v.name}
                                        </button>
                                    ))
                                    : categories?.map((v: any, i: number) => (
                                        <button
                                            key={i}
                                            className="w-full px-2 py-1 text-lg text-left border-b"
                                            onClick={() => getSubcategory(v)}
                                        >
                                            {v.name}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    {filterName === "MEREK" && (
                        <div>
                            <div className="grid grid-cols-3 gap-2 justify-center items-center flex-wrap pl-2">
                                {brands
                                    ?.filter((v: any) => v.image !== null)
                                    ?.map((val: any) => (
                                        <button
                                            key={val.id}
                                            onClick={() => {
                                                let brand_ids = filter?.brand_id || [];
                                                if (!brand_ids.includes(val.id)) {
                                                    brand_ids.push(val.id);
                                                    getType(val.id);
                                                    setFilter({ ...filter, brand_id: brand_ids });
                                                } else {
                                                    brand_ids = brand_ids.filter((v: any) => v !== val.id);
                                                    setFilter({
                                                        ...filter,
                                                        brand_id: brand_ids,
                                                        type_id: filter?.type_id?.filter(
                                                            (tid: any) =>
                                                                !list?.types?.some(
                                                                    (lt: any) => lt.id === tid && lt.brand_id === val.id
                                                                )
                                                        ),
                                                    });
                                                    setList({
                                                        ...list,
                                                        types: list.types?.filter((v: any) => v.brand_id !== val.id),
                                                    });
                                                }
                                            }}
                                            className={`border rounded flex justify-center items-center p-2 ${filter?.brand_id?.includes(val.id)
                                                ? "border-blue-500"
                                                : "border-gray-200"
                                                }`}
                                        >
                                            <div className="lg:h-[40px] md:h-[100px] w-[140px] h-[40px] relative">
                                                <Image
                                                    src={val.image}
                                                    alt="logo-brand"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </button>
                                    ))}
                            </div>
                            <div className="lg:h-[40vh] h-[40vh] overflow-auto mt-4">
                                <div className="flex flex-col gap-2 pl-2 mt-2">
                                    {brands?.map((v: any, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                let brand_ids = filter?.brand_id || [];
                                                if (!brand_ids.includes(v.id)) {
                                                    brand_ids.push(v.id);
                                                    getType(v.id);
                                                    setFilter({ ...filter, brand_id: brand_ids });
                                                } else {
                                                    brand_ids = brand_ids.filter((val: any) => val !== v.id);
                                                    setFilter({
                                                        ...filter,
                                                        brand_id: brand_ids,
                                                        type_id: filter?.type_id?.filter(
                                                            (tid: any) =>
                                                                !list?.types?.some(
                                                                    (lt: any) => lt.id === tid && lt.brand_id === v.id
                                                                )
                                                        ),
                                                    });
                                                    setList({
                                                        ...list,
                                                        types: list.types?.filter((val: any) => val.brand_id !== v.id),
                                                    });
                                                }
                                            }}
                                            type="button"
                                            className="flex items-center justify-start"
                                        >
                                            {filter?.brand_id?.includes(v.id) ? (
                                                <SquareCheck className="text-green-600" />
                                            ) : (
                                                <Square />
                                            )}
                                            <span className="ml-2 text-lg">{v.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {filterName === "MODEL" && (
                        <div>
                            {list?.types?.length > 0 ? (
                                <div className="lg:h-[70vh] h-[70vh] overflow-auto mt-4">
                                    <div className="flex flex-col gap-2 pl-2 mt-2">
                                        {list.types.map((v: any, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    let type_ids = filter?.type_id || [];
                                                    if (!type_ids.includes(v.id)) {
                                                        type_ids.push(v.id);
                                                        setFilter({ ...filter, type_id: type_ids });
                                                    } else {
                                                        type_ids = type_ids.filter((val: any) => val !== v.id);
                                                        setFilter({ ...filter, type_id: type_ids });
                                                    }
                                                }}
                                                type="button"
                                                className="flex items-center justify-start"
                                            >
                                                {filter?.type_id?.includes(v.id) ? (
                                                    <SquareCheck className="text-green-600" />
                                                ) : (
                                                    <Square />
                                                )}
                                                <span className="ml-2 text-lg">{v.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-xl mt-4">Silahkan pilih merek terlebih dahulu</p>
                            )}
                        </div>
                    )}

                    {filterName === "HARGA" && (
                        <div className="flex flex-col items-center justify-center pl-2 mt-4">
                            <Input
                                numericformat
                                label=""
                                placeholder="Dari Harga"
                                defaultValue={filter?.min || 1}
                                onChange={(e: any) =>
                                    setFilter({ ...filter, min: e.target.value.replaceAll(",", "") })
                                }
                                className="text-2xl"
                            />
                            <Input
                                numericformat
                                label=""
                                placeholder="Sampai Harga"
                                defaultValue={filter?.max || 10000000000}
                                onChange={(e: any) =>
                                    setFilter({ ...filter, max: e.target.value.replaceAll(",", "") })
                                }
                                className="text-2xl"
                            />
                        </div>
                    )}

                    {filterName === "LUAS TANAH" && (
                        <div className="flex flex-col items-center justify-center pl-2 mt-4">
                            <Input
                                numericformat
                                label=""
                                placeholder="Mulai Dari"
                                defaultValue={filter?.minArea}
                                onChange={(e: any) =>
                                    setFilter({ ...filter, minArea: e.target.value.replaceAll(",", "") })
                                }
                                className="text-2xl"
                            />
                            <Input
                                numericformat
                                label=""
                                placeholder="Sampai"
                                defaultValue={filter?.maxArea}
                                onChange={(e: any) =>
                                    setFilter({ ...filter, maxArea: e.target.value.replaceAll(",", "") })
                                }
                                className="text-2xl"
                            />
                        </div>
                    )}

                    {filterName === "LUAS BANGUNAN" && (
                        <div className="flex flex-col items-center justify-center pl-2 mt-4">
                            <Input
                                numericformat
                                label=""
                                placeholder="Mulai Dari"
                                defaultValue={filter?.minBuilding}
                                onChange={(e: any) =>
                                    setFilter({ ...filter, minBuilding: e.target.value.replaceAll(",", "") })
                                }
                                className="text-2xl"
                            />
                            <Input
                                numericformat
                                label=""
                                placeholder="Sampai"
                                defaultValue={filter?.maxBuilding}
                                onChange={(e: any) =>
                                    setFilter({ ...filter, maxBuilding: e.target.value.replaceAll(",", "") })
                                }
                                className="text-2xl"
                            />
                        </div>
                    )}

                    {filterName === "TAHUN" && (
                        <div className="flex flex-col items-center justify-center pl-2 mt-2">
                            <Input
                                label=""
                                placeholder={"1945"}
                                maxLength={4}
                                type="tel"
                                onChange={(e: any) => setFilter({ ...filter, year_start: e.target.value })}
                                className="text-2xl"
                            />
                            <Input
                                label=""
                                placeholder={`${new Date().getFullYear()}`}
                                maxLength={4}
                                type="tel"
                                onChange={(e: any) => setFilter({ ...filter, year_end: e.target.value })}
                                className="text-2xl"
                            />
                        </div>
                    )}

                    {filterName === "TRANSMISI" && (
                        <div className="flex flex-col gap-2 items-start pl-2 mt-4">
                            {[
                                { value: "", label: "Semua Transmisi" },
                                { value: "MT", label: "Manual" },
                                { value: "AT", label: "Automatic" },
                                { value: "CVT", label: "CVT" },
                            ].map((opt) => (
                                <div key={opt.value}>
                                    <input
                                        type="radio"
                                        name="transmission"
                                        value={opt.value}
                                        defaultChecked={filter?.transmission === opt.value || (!filter?.transmission && opt.value === "")}
                                        onChange={(e) => setFilter({ ...filter, transmission: e.target.value })}
                                    />
                                    <span className="ml-2 text-2xl">{opt.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {filterName === "KONDISI" && (
                        <div className="flex flex-col gap-2 items-start pl-2 mt-4">
                            {[
                                { value: "", label: "Semua Kondisi" },
                                { value: "new", label: "Baru" },
                                { value: "second", label: "Bekas" },
                            ].map((opt) => (
                                <div key={opt.value}>
                                    <input
                                        type="radio"
                                        name="condition"
                                        value={opt.value}
                                        defaultChecked={filter?.condition === opt.value || (!filter?.condition && opt.value === "")}
                                        onChange={(e) => setFilter({ ...filter, condition: e.target.value })}
                                    />
                                    <span className="ml-2 text-2xl">{opt.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {filterName === "BAHAN BAKAR" && (
                        <div className="flex flex-col gap-2 items-start pl-2 mt-4">
                            {[
                                { value: "", label: "Semua Bahan Bakar" },
                                { value: "bensin", label: "Bensin" },
                                { value: "diesel", label: "Solar" },
                                { value: "hybrid", label: "Hybrid" },
                                { value: "ev", label: "Listrik" },
                            ].map((opt) => (
                                <div key={opt.value}>
                                    <input
                                        type="radio"
                                        name="fuel_type"
                                        value={opt.value}
                                        defaultChecked={filter?.fuel_type === opt.value || (!filter?.fuel_type && opt.value === "")}
                                        onChange={(e) => setFilter({ ...filter, fuel_type: e.target.value })}
                                    />
                                    <span className="ml-2 text-2xl">{opt.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {filterName === "URUTKAN" && (
                        <div className="pl-2 mt-4 flex flex-col gap-2">
                            {[
                                { value: "newest", label: "IKLAN TERBARU" },
                                { value: "minprice", label: "IKLAN PALING MURAH" },
                                { value: "maxprice", label: "IKLAN PALING MAHAL" },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setFilter({ ...filter, sort: opt.value })}
                                    className={`border-2 w-full p-2 rounded text-lg ${filter?.sort === opt.value || (!filter?.sort && opt.value === "newest") ? "bg-gray-300" : ""
                                        } hover:bg-gray-300 duration-200 transition-all items-center flex gap-2`}
                                >
                                    {(filter?.sort === opt.value || (!filter?.sort && opt.value === "newest")) && (
                                        <CheckIcon className="w-4 text-green-700" />
                                    )}
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="fixed bottom-0 w-full px-4 left-0">
                {filterName !== "KATEGORI" && (
                    <Button
                        color="info"
                        onClick={() => {
                            setModal({ ...modal, open: false });
                            setLoading(true);
                        }}
                    >
                        Terapkan
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FilterModalContent;
