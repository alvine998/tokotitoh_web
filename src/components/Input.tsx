import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";
import { NumericFormat } from "react-number-format";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  numericformat?: boolean;
  placeholder?: string;
  onChange?: any;
  defaultValue?: any;
  isPassword?: boolean;
  onEnter?: any;
};

export default function Input(props: Props) {
  const {
    label,
    numericformat,
    placeholder,
    onChange,
    defaultValue,
    isPassword,
    onEnter
  } = props;
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="my-2 flex flex-col w-full">
      {label && (
        <label htmlFor={label} className={"text-gray-500 " + props.className}>
          {label}
        </label>
      )}
      {numericformat ? (
        <NumericFormat
          className={"block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:leading-6 " + props.className}
          id={label}
          thousandSeparator="."
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          decimalSeparator=","
        />
      ) : isPassword ? (
        <div className="flex gap-2 w-full rounded-md border-0 py-1.5 pl-4 pr-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500" onKeyDown={onEnter}>
          <input
            id={label}
            {...props}
            placeholder={placeholder}
            onChange={onChange}
            type={show ? "text" : "password"}
            className="w-full text-gray-900 placeholder:text-gray-400 focus:outline-none text-lg sm:leading-6"
          />
          <button
            type="button"
            onClick={() => {
              setShow(!show);
            }}
            className="text-gray-500"
          >
            {show ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
      ) : (
        <input
          id={label}
          {...props}
          placeholder={placeholder}
          onChange={onChange}
          className={"block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:leading-6 " + props.className}
        />
      )}
    </div>
  );
}
