import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { CONFIG } from "@/config";
import HeaderHome from "@/components/headers/HeaderHome";
import BottomTabs from "@/components/BottomTabs";
import CategoryGrid from "@/components/home/CategoryGrid";
import HomeShortcuts from "@/components/home/HomeShortcuts";
import HomeModals from "@/components/home/HomeModals";
import { useHomeLogic } from "@/hooks/useHomeLogic";

export async function getServerSideProps(context: any) {
  try {
    const { page, size, search } = context.query;
    const result = await axios.get(
      CONFIG.base_url_api +
      `/categories?page=${page || 0}&size=${size || 99999}`,
      {
        headers: {
          "bearer-token": "tokotitohapi",
          "x-partner-code": "id.marketplace.tokotitoh",
        },
      }
    );
    const { req, res } = context;
    let user: any = getCookie("account", { req, res }) || null;
    let notif: any = [];
    if (user) {
      user = JSON.parse(user);
      notif = await axios.get(
        CONFIG.base_url_api +
        `/notifications?pagination=true&page=${+page || 0}&size=${+size || 5
        }&user_id=${user?.id}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
    }
    let subcategories: any = [];
    if (search) {
      subcategories = await axios.get(
        CONFIG.base_url_api +
        `/subcategories?pagination=true&page=${+page || 0}&size=${+size || 10
        }&search=${search || ""}`,
        {
          headers: {
            "bearer-token": "tokotitohapi",
            "x-partner-code": "id.marketplace.tokotitoh",
          },
        }
      );
    }

    return {
      props: {
        categories: result?.data?.items?.rows,
        notif: notif?.data?.items?.rows || [],
        subcategories: subcategories?.data?.items?.rows || [],
      },
    };
  } catch (error: any) {
    console.log(error);
    if (error?.response?.status == 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        error: error?.response?.data?.message,
      },
    };
  }
}

export default function Home({ categories, notif }: any) {
  const {
    router,
    modal,
    setModal,
    subcat,
    filter,
    setFilter,
    mode,
    setMode,
    filterAds,
    filteredItems,
    filteredItems2,
    searchAds,
    getSubCat,
    viewNotif,
  } = useHomeLogic(categories, notif);

  return (
    <div className="pb-20 flex flex-col justify-center items-center">
      <HeaderHome
        notif={notif}
        items={filterAds}
        modal={modal}
        setModal={setModal}
        filter={filter}
        setFilter={setFilter}
        handleSearch={searchAds}
      />

      <CategoryGrid
        filteredItems={filteredItems}
        filteredItems2={filteredItems2}
        getSubCat={getSubCat}
        setModal={setModal}
        modal={modal}
      />

      {/* <HomeShortcuts setModal={setModal} modal={modal} /> */}

      <HomeModals
        modal={modal}
        setModal={setModal}
        subcat={subcat}
        router={router}
        notif={notif}
        mode={mode}
        setMode={setMode}
        viewNotif={viewNotif}
      />

      <BottomTabs />
    </div>
  );
}
