import React from 'react'
type props = {
    type: string;
    placeholder: string;
    name: string;
    Formik: any
    autoComplete: string
    classType: string
}

export default function InputFiled({ type, placeholder, name, Formik, autoComplete, classType }: props) {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={Formik?.values?.[name]}
                onChange={Formik?.handleChange}
                onBlur={Formik?.handleBlur}
                className={classType === "signin" ? `border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${Formik?.touched?.[name] && Formik?.errors?.[name] ? "border-red-500" : "border-gray-300"
                    }` : `w-full px-3 py-2 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500  ${Formik?.touched?.[name] && Formik?.errors?.[name] ? "border-red-500" : "border-gray-300"
                    } `}

                required
                autoComplete={autoComplete}
            />
            {
                Formik.touched?.[name] && Formik.errors?.[name] && (
                    <p className="text-red-500 text-sm animate-shake">
                        {Formik.errors?.[name]}
                    </p>
                )
            }
        </>
    )
}
