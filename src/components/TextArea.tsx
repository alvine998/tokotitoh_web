import React, { TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string,
}

export default function TextArea(props: Props) {
    const { label } = props
    return (
        <div className='my-2 flex flex-col w-full'>
            {
                label &&
                <label htmlFor={label} className={'text-gray-500 ' + props.className}>{label}</label>
            }
            <textarea id={label} {...props}
                className={"block w-full rounded-md border-0 py-1.5 pl-4 pr-2 h-[250px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none sm:leading-6 " + props.className}
            />
        </div>
    )
}