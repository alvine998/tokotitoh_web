import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { CONFIG } from "@/config";
import Swal from "sweetalert2";
import { setCookie } from "cookies-next";
import { normalizePhoneNumber } from "@/utils";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { provider } from "@/config/firebase";
import { useModal } from "../components/Modal";

export const useLoginFormLogic = () => {
    const router = useRouter();
    const queryString = useSearchParams();
    const [show, setShow] = useState<boolean>(false);
    const [type, setType] = useState<string>(
        queryString?.get("type") === "reset" ? "reset" : "login"
    );
    const [payload, setPayload] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<useModal>();
    const [checkEmail, setCheckEmail] = useState<any>();
    const [googlePayload, setGooglePayload] = useState<any>(null);

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setPayload({ ...payload, [name]: value });
    };

    const loginByGoogle = async () => {
        setLoading(true);
        try {
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;

            const payloads = { ...user };

            const checking = await axios.get(
                `${CONFIG.base_url_api}/users?search=${user?.email}`,
                {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh",
                    },
                }
            );

            let checkEmailStatus =
                checking?.data?.items?.rows?.length > 0 ? "checked" : "unchecked";

            if (checkEmailStatus === "checked") {
                const result2 = await axios.post(
                    `${CONFIG.base_url_api}/user/login/by/google`,
                    payloads,
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );

                localStorage.setItem(
                    "usertokotitoh",
                    JSON.stringify(result2?.data?.user)
                );
                setCookie("account", JSON.stringify(result2?.data?.user), {
                    secure: true,
                });

                setLoading(false);
                Swal.fire({
                    icon: "success",
                    text: `Selamat Datang ${result2?.data?.user?.name}`,
                });

                setPayload({});

                setTimeout(() => {
                    try {
                        router.push("/account");
                    } catch (error) {
                        window.location.href = "/account";
                    }
                }, 500);
            } else {
                setModal({ ...modal, open: true, key: "term" });
                setGooglePayload(user);
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            console.error("Google Login Error:", error);
            Swal.fire({
                icon: "error",
                text: `Login gagal: ${error.message}`,
            });
        }
    };

    const registByGoogle = async () => {
        setLoading(true);
        try {
            const result2 = await axios.post(
                CONFIG.base_url_api + `/user/login/by/google`,
                googlePayload,
                {
                    headers: {
                        "bearer-token": "tokotitohapi",
                        "x-partner-code": "id.marketplace.tokotitoh",
                    },
                }
            );
            setLoading(false);
            Swal.fire({
                icon: "success",
                text: "Selamat Datang " + result2?.data?.user?.name,
            });
            setPayload({});
            localStorage.setItem(
                "usertokotitoh",
                JSON.stringify(result2?.data?.user)
            );
            setCookie("account", JSON.stringify(result2?.data?.user), {
                secure: true,
            });
            router.push("/account");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            if (type === "login") {
                const result = await axios.post(
                    CONFIG.base_url_api + `/user/login`,
                    payload,
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                setLoading(false);
                const notVerified = await localStorage.getItem("userVerificationRegistration")
                if (notVerified) {
                    Swal.fire({
                        icon: "success",
                        text: "Harap verifikasi email otp",
                    });
                    router.push("/account/registration/verification");
                    return;
                }
                Swal.fire({
                    icon: "success",
                    text: "Selamat Datang " + result?.data?.user?.name,
                });
                setPayload({});
                localStorage.setItem(
                    "usertokotitoh",
                    JSON.stringify(result?.data?.user)
                );
                setCookie("account", JSON.stringify(result?.data?.user), {
                    secure: true,
                });
                router.push("/account");
            }
            if (type === "register") {
                if (payload?.password !== payload?.password_confirm) {
                    setLoading(false);
                    return Swal.fire({
                        icon: "warning",
                        text: "Password tidak sesuai",
                    });
                }
                const result = await axios.post(
                    CONFIG.base_url_api + `/user`,
                    {
                        ...payload,
                        role: "customer",
                        phone: normalizePhoneNumber(payload?.phone),
                    },
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                if (result?.status === 200) {
                    await axios.post(
                        CONFIG.base_url_api + `/sendmail/verification/registration`,
                        {
                            from: "tokotitoh2024@gmail.com",
                            to: payload?.email,
                        },
                        {
                            headers: {
                                "bearer-token": "tokotitohapi",
                                "x-partner-code": "id.marketplace.tokotitoh",
                            },
                        }
                    );
                }
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    text: "Pendaftaran Berhasil, Silahkan Periksa Email Anda Untuk Verifikasi Akun",
                });
                localStorage.setItem("userVerificationRegistration", JSON.stringify(result?.data?.items));
                router.push("/account/registration/verification");
            }
            if (type === "forget") {
                const result = await axios.post(
                    CONFIG.base_url_api + `/sendmail`,
                    {
                        from: "tokotitoh2024@gmail.com",
                        to: payload?.email,
                    },
                    {
                        headers: {
                            "bearer-token": "tokotitohapi",
                            "x-partner-code": "id.marketplace.tokotitoh",
                        },
                    }
                );
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    text: "Kami telah mengirimkan kode OTP melalui email!",
                });
                setPayload({});
                localStorage.setItem("userReset", JSON.stringify(result?.data?.items));
                router.push("/account/verification");
            }
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: "error",
                text:
                    error?.response?.data?.error_message ||
                    error?.response?.data?.message,
            });
            setLoading(false);
        }
    };

    return {
        router,
        show,
        setShow,
        type,
        setType,
        payload,
        setPayload,
        loading,
        setLoading,
        modal,
        setModal,
        checkEmail,
        setCheckEmail,
        googlePayload,
        handleChange,
        loginByGoogle,
        registByGoogle,
        onSubmit,
    };
};
