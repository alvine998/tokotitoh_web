import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { SelectHTMLAttributes, useState } from "react";
import { NumericFormat } from "react-number-format";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: any[];
  numericformat?: boolean;
  placeholder?: string;
  onChange?: any;
  defaultValue?: any;
  isPassword?: boolean;
  onEnter?: any;
};

export default function Select(props: Props) {
  const {
    label,
    numericformat,
    placeholder,
    onChange,
    defaultValue,
    isPassword,
    onEnter,
    options,
  } = props;
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="my-2 flex flex-col w-full">
      {label && (
        <label htmlFor={label} className="text-gray-500">
          {label}
        </label>
      )}
      <select onChange={onChange} defaultValue={defaultValue} {...props} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6">
        <option value="">Pilih {label}</option>
        {options?.map((val: any, idx: number) => (
          <option key={idx} value={val?.value}>{val?.label}</option>
        ))}
      </select>
    </div>
  );
}
