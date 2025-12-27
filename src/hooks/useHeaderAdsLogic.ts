import { useState, useRef } from "react";
import axios from "axios";
import { CONFIG } from "@/config";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

export interface HeaderAdsLogicProps {
    filter: any;
    setFilter: (filter: any) => void;
    ads: any;
    subcat_id?: any;
    setLoading: (loading: boolean) => void;
}

export const useHeaderAdsLogic = ({
    filter,
    setFilter,
    ads,
    subcat_id,
    setLoading,
}: HeaderAdsLogicProps) => {
    const router = useRouter();
    const params = useParams();
    const [location, setLocation] = useState<any>({
        latitude: null,
        longitude: null,
    });
    const [category, setCategory] = useState<any>();
    const [adress, setAddress] = useState<any>("Indonesia");
    const [list, setList] = useState<any>({
        cities: [],
        districts: [],
        villages: [],
        types: [],
        subcategories: [],
    });
    const [searchString, setSearchString] = useState(filter?.search);
    const checkboxRef = useRef<HTMLInputElement>(null);

    const getCity = async (data: any) => {
        try {
            if (data?.id !== "") {
                const result = await axios.get(
                    CONFIG.base_url_api + `/cities?province_id=${data?.id}`,
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                setList({
                    ...list,
                    cities: result?.data?.items?.rows,
                    districts: [],
                    villages: [],
                });
                setFilter({ ...filter, province_id: data?.id, city_id: "" });
                setAddress(data?.name);
            } else {
                setList({
                    ...list,
                    cities: [],
                    districts: [],
                    villages: [],
                });
                setFilter({ ...filter, province_id: "", city_id: "" });
                setAddress("Indonesia");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDistrict = async (data: any) => {
        try {
            if (data?.id !== "") {
                const result = await axios.get(
                    CONFIG.base_url_api + `/districts?city_id=${data?.id}`,
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                setList({
                    ...list,
                    districts: result?.data?.items?.rows,
                    villages: [],
                });
                setFilter({ ...filter, city_id: data?.id, district_id: "" });
                setAddress(`${data?.name}, ${adress}`);
            } else {
                setList({
                    ...list,
                    districts: [],
                    villages: [],
                });
                setFilter({ ...filter, city_id: "", district_id: "" });
                setAddress(adress.split(",")[1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getType = async (brand_id: any) => {
        try {
            if (brand_id !== "") {
                let listtypes = list.types || [];
                const result = await axios.get(
                    CONFIG.base_url_api + `/types?brand_id=${brand_id}`,
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                listtypes.push(...result.data.items.rows);
                setList({
                    ...list,
                    types: listtypes?.sort((a: any, b: any) =>
                        a.name.localeCompare(b.name)
                    ),
                });
            } else {
                setList({
                    ...list,
                    types: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSubcategory = async (data: any) => {
        try {
            if (data?.id !== 0) {
                const result = await axios.get(
                    CONFIG.base_url_api + `/subcategories?category_id=${data?.id}`,
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                setList({
                    ...list,
                    subcategories: [
                        { id: 0, name: "Kembali" },
                        ...result.data.items.rows,
                    ],
                });
            } else {
                setList({
                    ...list,
                    subcategories: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            setLoading(true);
            setFilter({ ...filter, search: searchString, size: 6 });
            router.push(`/category/${subcat_id}?search=${searchString}&size=6`);
        }
    };

    const resetFilters = (categories: any[]) => {
        setLoading(true);
        setList({ ...list, types: [], subcategories: [] });
        setFilter({ size: 6, search: "" });
        setSearchString("");
        const id = subcat_id || ads?.id || params?.subcat_id;
        if (id) {
            router.push(`/category/${id}`);
        }
    };

    return {
        location,
        setLocation,
        category,
        setCategory,
        adress,
        setAddress,
        list,
        setList,
        searchString,
        setSearchString,
        checkboxRef,
        getCity,
        getDistrict,
        getType,
        getSubcategory,
        handleKeyPress,
        resetFilters,
    };
};
