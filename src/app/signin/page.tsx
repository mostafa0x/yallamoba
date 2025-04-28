"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"
import { FormState } from "../../../InterFaces/FormState";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../InterFaces/StateFaces';
import SpinnerLoader from '../_components/SpinnerLoader/page';
import axios from "axios";
import { ChangeUserToken, Logging } from "@/lib/UserSlices";
import dotenv from "dotenv"
dotenv.config()

export default function Login() {
    const Router = useRouter()
    const [PageAnmie, setPageAnmie] = useState(false)
    const [BtnLogin, setBtnLogin] = useState(false)
    const { UserToken } = useSelector((state: StateFaces) => state.UserReducer)
    const Dispath = useDispatch()


    const validationSchema = yup.object().shape({
        identifier: yup.string().required("Required !"),
        password: yup.string().min(8, "To Short").required("Required !")
    })

    const handleGoToSignUp = () => {
        setPageAnmie(true)
        Router.push("/signup")

    }

    const handleLogin = async (formValues: FormState) => {
        if (!BtnLogin) {
            setBtnLogin(true)
            try {
                const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, formValues)
                console.log(data);
                Dispath(Logging({ UserToken: data.data.UserToken, UserData: data.data.UserData }))


            } catch (err) {
                console.log(err);
                setBtnLogin(false)
            } finally {
                // Router.replace("/")
                // setBtnLogin(false)

            }
        }
    }

    const Formik = useFormik({
        initialValues: {
            identifier: "",
            password: ""
        }, validationSchema, onSubmit: handleLogin
    })

    useEffect(() => {
        window.scroll(0, 0)

        return () => {
            setPageAnmie(false)
            setBtnLogin(false)
        }
    }, [])

    if (UserToken) {
        return <SpinnerLoader />
    }

    return (
        <div>
            <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4  ${PageAnmie ? "animate-jump-out animate-once" : "animate-fade-up animate-once"}`}>

                <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Yalla Moba</h1>

                    <form onSubmit={Formik.handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="email"
                            name="identifier"
                            value={Formik.values.identifier}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete="email"
                        />
                        {Formik.errors.identifier && Formik.touched.identifier ? <label className="text-red-600 opacity-70 animate-shake animate-once">{Formik.errors.identifier}</label> : null}
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={Formik.values.password}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete="current-password"
                        />
                        {Formik.errors.password && Formik.touched.password ? <label className="text-red-600 opacity-70 animate-shake animate-once">{Formik.errors.password}</label> : null}


                        <button
                            type="submit"
                            className={`bg-blue-600 text-white rounded-md py-2 font-bold ${BtnLogin ? "cursor-wait" : "cursor-pointer"} hover:bg-blue-700`}
                        >
                            {BtnLogin ? <>
                                <i className="fa-duotone fa-solid fa-spinner fa-bounce"></i>
                                Loading...
                            </>
                                : "Login"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <a href="#" className="text-blue-600 text-sm hover:underline">
                            forget password?
                        </a>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-center">
                        {/* <Link href={"/signup"}><button className="bg-green-600 text-white px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-700">
               Create Account
           </button></Link> */}
                        <button onClick={() => handleGoToSignUp()} className="bg-green-600 text-white px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-700">
                            Create Account
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-sm text-gray-600 text-center">
                    yalla moba
                </p>


            </div>
        </div>

    );
}
