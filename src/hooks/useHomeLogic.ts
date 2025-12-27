import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CONFIG } from "@/config";
import { useModal } from "@/components/Modal";

export const useHomeLogic = (categories: any, notif: any) => {
    const router = useRouter();
    const [modal, setModal] = useState<useModal>();
    const [subcat, setSubcat] = useState<any>([]);
    const [filter, setFilter] = useState<any>(router.query);
    const [mode, setMode] = useState<any>({
        type: "default",
        data: null,
    });
    const [filterAds, setFilterAds] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState(categories);
    const [filteredItems2, setFilteredItems2] = useState(categories);

    useEffect(() => {
        const queryFilter = new URLSearchParams(filter).toString();
        const currentQuery = new URLSearchParams(router.query as any).toString();

        if (queryFilter !== currentQuery) {
            router.push(`?${queryFilter}`, undefined, { shallow: true });
        }
    }, [filter]);

    useEffect(() => {
        const handleResize = () => {
            setFilteredItems(categories?.slice(0, 2));
            setFilteredItems2(categories?.slice(2, 5));
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [categories]);

    const searchAds = async (q: string) => {
        try {
            const result = await axios.get(
                CONFIG.base_url_api +
                `/ads?status=1&pagination=true&page=${0}&size=${10}&search=${q || ""}`,
                {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh",
                    },
                }
            );
            setFilterAds(result?.data?.items?.rows);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubCat = async (cat_id: any) => {
        try {
            const result = await axios.get(
                CONFIG.base_url_api +
                `/subcategories?category_id=${cat_id}&page=0&size=99999`,
                {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh",
                    },
                }
            );
            setSubcat(result?.data?.items?.rows);
        } catch (error) {
            console.log(error);
        }
    };

    const viewNotif = async (data: any) => {
        try {
            await axios.patch(
                CONFIG.base_url_api + `/notification`,
                { id: data?.id, status: 1 },
                {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh",
                    },
                }
            );
            setMode({ type: "read", data: data });
            router.push("");
        } catch (error) {
            console.log(error);
        }
    };

    return {
        router,
        modal,
        setModal,
        subcat,
        setSubcat,
        filter,
        setFilter,
        mode,
        setMode,
        filterAds,
        setFilterAds,
        filteredItems,
        filteredItems2,
        searchAds,
        getSubCat,
        viewNotif,
    };
};
