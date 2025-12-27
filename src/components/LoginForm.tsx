import React from "react";
import Image from "next/image";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import { useLoginFormLogic } from "@/hooks/useLoginFormLogic";

const LoginView = ({
  show, setShow, setType, loginByGoogle, onSubmit, loading, handleChange
}: any) => (
  <div className="flex-col flex justify-center items-center mt-10">
    <Image
      alt="logo"
      src={"/images/tokotitoh.png"}
      width={150}
      height={150}
      className="w-[150px] h-[150px]"
    />
    <div className="mt-2 w-full px-8">
      <h2 className="text-center text-2xl font-semibold">Login Tokotitoh</h2>
      <Input
        label=""
        placeholder="Email / No Telepon"
        name="identity"
        onChange={handleChange}
        defaultValue={""}
      />
      <Input
        label=""
        placeholder="Password"
        name="password"
        type={show ? "text" : "password"}
        defaultValue={""}
        onChange={handleChange}
      />
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 pb-2">
          <input
            type="checkbox"
            onChange={(e) => setShow(e.target.checked)}
            defaultChecked={show}
          />
          <span className="text-md">Tampilkan password</span>
        </div>
        <button
          className="text-md text-blue-700"
          onClick={() => setType("forget")}
        >
          Lupa Password
        </button>
      </div>
      <Button onClick={onSubmit} disabled={loading} className={'text-lg'}>
        {loading ? "Memproses..." : "Masuk"}
      </Button>
      <p className="text-center text-lg">Atau</p>
      <Button
        color="warning"
        type="button"
        onClick={() => setType("register")}
        className={'text-lg'}
      >
        Daftar
      </Button>
      <Button
        onClick={loginByGoogle}
        className={"mt-5 flex gap-2 justify-center items-center text-lg"}
        color="white"
        disabled={loading}
      >
        <Image
          src={"/icons/google.png"}
          alt="icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        {loading ? "Memproses..." : "Login Dengan Google"}
      </Button>
    </div>
    <div className="px-6 mt-2 text-lg text-center">
      <p>
        Dengan mendaftar atau login anda meyetujui{" "}
        <a className="text-blue-600" href="/helps/term-condition" target="_blank">
          syarat & ketentuan
        </a>{" "}
        dan{" "}
        <a className="text-blue-600" href="/helps/privacy-policy" target="_blank">
          kebijakan privasi tokotitoh
        </a>
      </p>
    </div>
  </div>
);

const RegisterView = ({
  show, setShow, setType, onSubmit, loading, handleChange
}: any) => (
  <div className="flex-col flex justify-center items-center mt-10">
    <Image
      alt="logo"
      src={"/images/tokotitoh.png"}
      width={150}
      height={150}
      className="w-[150px] h-[150px]"
    />
    <div className="mt-2 w-full px-8">
      <h2 className="text-center text-xl font-semibold">Daftar Tokotitoh</h2>
      <Input label="" placeholder="Nama" name="name" onChange={handleChange} />
      <Input
        label=""
        placeholder="No Telepon"
        name="phone"
        onChange={handleChange}
        type="number"
        maxLength={13}
      />
      <Input label="" placeholder="Email" name="email" onChange={handleChange} type="email" />
      <Input
        label=""
        placeholder="Password"
        name="password"
        type={show ? "text" : "password"}
        onChange={handleChange}
      />
      <Input
        label=""
        placeholder="Konfirmasi Password"
        name="password_confirm"
        type={show ? "text" : "password"}
        onChange={handleChange}
      />
      <div className="flex items-center gap-2 pb-2">
        <input
          type="checkbox"
          onChange={(e) => setShow(e.target.checked)}
          defaultChecked={show}
        />
        <span className="text-xs">Tampilkan password</span>
      </div>
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Mendaftarkan..." : "Daftar"}
      </Button>
      <p className="text-center">Atau</p>
      <Button color="warning" onClick={() => setType("login")}>
        Login
      </Button>
    </div>
    <div className="px-6 mt-2">
      <p>
        Dengan mendaftar atau login anda meyetujui{" "}
        <a href="/helps/term-condition" target="_blank" className="text-blue-600">syarat & ketentuan</a> dan{" "}
        <a href="/helps/privacy-policy" target="_blank" className="text-blue-600">kebijakan privasi tokotitoh</a>
      </p>
    </div>
  </div>
);

const ForgotView = ({ setType, onSubmit, loading, handleChange, payload }: any) => (
  <div className="flex-col flex justify-center items-center mt-10">
    <Image
      alt="logo"
      src={"/images/tokotitoh.png"}
      width={150}
      height={150}
      className="w-[150px] h-[150px]"
    />
    <div className="mt-2 w-full px-8">
      <h2 className="text-center text-xl font-semibold">Lupa Password</h2>
      <Input
        label=""
        placeholder="Email"
        name="email"
        onChange={handleChange}
        defaultValue={payload?.email}
      />
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Mengirim..." : "Kirim"}
      </Button>
      <p className="text-center">Atau</p>
      <Button color="warning" onClick={() => setType("login")}>
        Login
      </Button>
    </div>
  </div>
);

export default function LoginForm() {
  const {
    show, setShow,
    type, setType,
    payload,
    loading,
    modal, setModal,
    handleChange,
    loginByGoogle,
    registByGoogle,
    onSubmit,
  } = useLoginFormLogic();

  return (
    <div className="w-full lg:w-1/4">
      {type === "login" ? (
        <LoginView
          show={show}
          setShow={setShow}
          setType={setType}
          loginByGoogle={loginByGoogle}
          onSubmit={onSubmit}
          loading={loading}
          handleChange={handleChange}
        />
      ) : type === "register" ? (
        <RegisterView
          show={show}
          setShow={setShow}
          setType={setType}
          onSubmit={onSubmit}
          loading={loading}
          handleChange={handleChange}
        />
      ) : (
        <ForgotView
          setType={setType}
          onSubmit={onSubmit}
          loading={loading}
          handleChange={handleChange}
          payload={payload}
        />
      )}

      {modal?.key === "term" && (
        <Modal open={modal.open} setOpen={() => { }}>
          <div className="px-2">
            <h1 className="text-center font-bold text-xl">Persetujuan Kebijakan</h1>
            <p className="text-justify mt-2">
              Saya menyetujui{" "}
              <a href="/helps/term-condition" target="_blank" className="text-blue-500 hover:text-blue-600">
                Syarat dan Ketentuan
              </a>{" "}
              Tokotitoh dan data saya untuk diproses sesuai dengan Tokotitoh{" "}
              <a href="/helps/privacy-policy" target="_blank" className="text-blue-500 hover:text-blue-600">
                Kebijakan Privasi.
              </a>
            </p>
            <div className="flex gap-10 justify-end items-center mt-4">
              <button
                type="button"
                onClick={() => setModal({ ...modal, open: false })}
                className="font-semibold text-blue-700"
              >
                Batalkan
              </button>
              <button
                type="button"
                onClick={() => {
                  setModal({ ...modal, open: false });
                  registByGoogle();
                }}
                className="font-semibold text-blue-700"
              >
                Setuju
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
