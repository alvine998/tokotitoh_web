import React, { useState, useEffect } from "react";
import { Settings2Icon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Modal from "../Modal";
import ModalFilter from "../ModalFilter";
import Input from "../Input";
import { useHeaderAdsLogic } from "@/hooks/useHeaderAdsLogic";
import FilterModalContent from "./FilterModalContent";
import LocationModalContent from "./LocationModalContent";
import {
  navsCar,
  navsProperty,
  navsBusTruck,
  navsFoodPet,
  navsDefault,
} from "./constants";

interface Props {
  ads: any;
  filter: any;
  setFilter: any;
  brands?: any;
  types?: any;
  provinces?: any;
  setLoading: any;
  items?: any;
  subcat_id?: any;
  categories: any[];
  handleSearch?: any;
  modal: any;
  setModal: any;
}

export default function HeaderAds(props: Props) {
  const {
    ads,
    filter,
    setFilter,
    brands,
    provinces,
    setLoading,
    subcat_id,
    categories,
    modal,
    setModal,
  } = props;

  const router = useRouter();
  const params = useParams();

  const {
    adress,
    list,
    setList,
    searchString,
    setSearchString,
    getCity,
    getDistrict,
    getType,
    getSubcategory,
    handleKeyPress,
    resetFilters,
  } = useHeaderAdsLogic({
    filter,
    setFilter,
    ads,
    subcat_id,
    setLoading,
  });

  const [filterName, setFilterName] = useState<any>(
    (ads?.category_name?.toLowerCase()?.includes("mobil") &&
      ads?.name?.toLowerCase()?.includes("mobil")) ||
      (ads?.category_name?.toLowerCase()?.includes("motor") &&
        ads?.name?.toLowerCase()?.includes("motor"))
      ? navsCar[0].name
      : ads?.category_name?.toLowerCase()?.includes("properti")
        ? navsProperty[0].name
        : ads?.name?.toLowerCase() === "alat berat di sewakan" ||
          ads?.name?.toLowerCase() === "alat berat di jual" ||
          ads?.name?.toLowerCase() === "bus dan truk dijual" ||
          ads?.name?.toLowerCase() === "bus dan truk di sewakan"
          ? navsBusTruck[0].name
          : ads?.category_name?.toLowerCase()?.includes("makanan") ||
            ads?.category_name?.toLowerCase()?.includes("hewan")
            ? navsFoodPet[0].name
            : navsDefault[0].name
  );

  const [selected, setSelected] = useState<any>({}); // Simplified for now

  return (
    <div
      className={`w-full lg:w-1/3 lg:max-w-sm md:max-w-full sm:max-w-full max-w-full fixed top-0 bg-white p-2 ${modal?.open ? "z-0" : "z-[999]"
        }`}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setModal({ ...modal, data: ads, open: true, key: "filter" });
            }}
            className="flex gap-2 items-center text-lg"
          >
            <Settings2Icon className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => {
              setModal({ ...modal, data: ads, open: true, key: "location" });
            }}
            type="button"
            className="flex gap-2 items-center"
          >
            <MapPinIcon className="w-4 h-4" />
            <h5 className="text-sm">
              {adress?.substring(0, 30)}
              {adress?.length > 30 ? "..." : ""}
            </h5>
          </button>
        </div>

        <div>
          <Image
            alt="logo"
            src={"/images/tokotitoh.png"}
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <div className="w-full">
          <Input
            placeholder="Cari disini"
            label=""
            value={searchString}
            onChange={(e: any) => setSearchString(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      <div className="mt-2">
        <p className="text-lg">
          {ads?.category_name || "Semua Kategori"} {">"}{" "}
          {ads?.name || "Semua Sub Kategori"}
        </p>
      </div>

      {modal?.key === "filter" && (
        <div className="relative z-[100]">
          <ModalFilter open={modal.open} setOpen={() => { }} type="filters">
            <FilterModalContent
              ads={ads}
              modal={modal}
              setModal={setModal}
              selected={selected}
              setSelected={setSelected}
              filter={filter}
              setFilter={setFilter}
              filterName={filterName}
              setFilterName={setFilterName}
              list={list}
              setList={setList}
              brands={brands}
              categories={categories}
              subcat_id={subcat_id}
              searchString={searchString}
              setSearchString={setSearchString}
              params={params}
              router={router}
              getType={getType}
              getSubcategory={getSubcategory}
              resetFilters={resetFilters}
              setLoading={setLoading}
              navsCar={navsCar}
              navsProperty={navsProperty}
              navsBusTruck={navsBusTruck}
              navsFoodPet={navsFoodPet}
              navs={navsDefault}
            />
          </ModalFilter>
        </div>
      )}

      {modal?.key === "location" && (
        <div>
          <ModalFilter open={modal.open} setOpen={() => { }} type="location">
            <LocationModalContent
              modal={modal}
              setModal={setModal}
              list={list}
              setList={setList}
              filter={filter}
              setFilter={setFilter}
              provinces={provinces}
              getCity={getCity}
              getDistrict={getDistrict}
              setLoading={setLoading}
            />
          </ModalFilter>
        </div>
      )}
    </div>
  );
}
