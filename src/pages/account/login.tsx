import BottomTabs from "@/components/BottomTabs";
import Button from "@/components/Button";
import HeaderHome from "@/components/headers/HeaderHome";
import Input from "@/components/Input";
import LoginForm from "@/components/LoginForm";
import Modal, { useModal } from "@/components/Modal";
import { CONFIG } from "@/config";
import { storage } from "@/config/firebase";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imageCompression from "browser-image-compression";
import {
  CarFrontIcon,
  CarIcon,
  ChevronLeftIcon,
  InfoIcon,
  LucideHome,
  PlusCircleIcon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export async function getServerSideProps(context: any) {
    try {
      const { page, size, search } = context.query;
      const { req, res } = context;
      let user: any = getCookie("account", { req, res }) || null;
      if (user) {
        return {
          redirect: {
            destination: "/account",
            permanent: false,
          },
        };
      }
      user = JSON.parse(user);
  
      return {
        props: {
          user: user || null,
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

export default function Account() {
  const router = useRouter();
  const [modal, setModal] = useState<useModal>();
  const [user, setUser] = useState<any>(null);

  const [images, setImages] = useState<any>(user?.image || []);
  const [progress, setProgress] = useState<boolean>(false);

  useEffect(() => {
    let user: any = getCookie("account");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);
  return (
    <div className="pb-20 flex flex-col justify-center items-center">
      <LoginForm />
      <BottomTabs />
    </div>
  );
}
