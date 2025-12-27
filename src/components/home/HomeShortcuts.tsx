import React from "react";
import { InfoIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/router";

interface HomeShortcutsProps {
    setModal: (modal: any) => void;
    modal: any;
}

const HomeShortcuts: React.FC<HomeShortcutsProps> = ({ setModal, modal }) => {
    const router = useRouter();

    return (
        <div className="p-2 mt-5 md:w-full sm:w-full w-auto lg:w-auto md:px-10 sm:px-7 px-2">
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setModal({ ...modal, open: true, key: "tips", data: null });
                    }}
                    className="w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm"
                >
                    <InfoIcon className="text-blue-700" />
                    Tips Hindari Penipuan
                </button>
                <button
                    type="button"
                    onClick={() => {
                        router.push("/sell");
                    }}
                    className="w-full border border-blue-500 p-2 rounded flex items-center gap-3 text-sm"
                >
                    <PlusCircleIcon className="text-green-700" />
                    Pasang Iklan Baru
                </button>
            </div>
        </div>
    );
};

export default HomeShortcuts;
