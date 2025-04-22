"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"
import { FormState } from "../../../InterFaces/FormState";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const validationSchema = yup.object().shape({
        email: yup.string().email("Invild email").required("Required !"),
        password: yup.string().min(8, "To Short").required("Required !")
    })


    const handleLogin = (formValues: FormState) => { }

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, validationSchema, onSubmit: handleLogin
    })

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 animate-fade-up animate-once">
            <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Yalla Moba</h1>

                <form onSubmit={Formik.handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="email"
                        name="email"
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {Formik.errors.email && Formik.touched.email ? <label className="text-red-600 opacity-70 animate-shake animate-once">{Formik.errors.email}</label> : null}
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={Formik.values.password}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {Formik.errors.password && Formik.touched.password ? <label className="text-red-600 opacity-70 animate-shake animate-once">{Formik.errors.password}</label> : null}


                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a href="#" className="text-blue-600 text-sm hover:underline">
                        forget password?
                    </a>
                </div>

                <hr className="my-4" />

                <div className="flex justify-center">
                    <Link href={"/signup"}><button className="bg-green-600 text-white px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-700">
                        Create Account
                    </button></Link>
                </div>
            </div>

            <p className="mt-6 text-sm text-gray-600 text-center">
                yalla moba
            </p>
        </div>
    );
}
