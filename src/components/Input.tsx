import React, { InputHTMLAttributes } from 'react'
import { NumericFormat } from 'react-number-format'

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    numericformat?: boolean,
    placeholder?: string,
    onChange?: any
}

export default function Input(props: Props) {
    const { label, numericformat, placeholder, onChange } = props
    return (
        <div className='my-2 flex flex-col w-full'>
            {
                label &&
                <label htmlFor={label} className='text-gray-500'>{label}</label>
            }
            {
                numericformat ?
                    <NumericFormat
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                        id={label}
                        thousandSeparator
                        placeholder={placeholder}
                        onChange={onChange}
                    /> :
                    <input
                        id={label}
                        {...props}
                        placeholder={placeholder}
                        onChange={onChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
                    />
            }
        </div>
    )
}