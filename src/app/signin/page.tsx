"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"
import { FormState } from "../../../InterFaces/FormState";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../InterFaces/StateFaces';
import SpinnerLoader from '../_components/SpinnerLoader/page';
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeUserToken, Logging } from "@/lib/UserSlices";
import dotenv from "dotenv"
import { Id, toast } from "react-toastify";
import LoadingPopup from "../_components/LoadingPopup/page";
dotenv.config()

export default function Login() {
    const Router = useRouter()
    const [PageAnmie, setPageAnmie] = useState(false)
    const [BtnLogin, setBtnLogin] = useState(false)
    const { UserToken } = useSelector((state: StateFaces) => state.UserReducer)
    const Dispath = useDispatch()
    const [resError, setresError] = useState(null)
    const errorToastRef = useRef<Id | null>(null);


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
            if (errorToastRef.current) {
                toast.dismiss(errorToastRef.current);
                errorToastRef.current = null
            }
            const waitingToast = toast.loading("Waiting...");
            setresError(null);
            setBtnLogin(true);

            try {
                const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, formValues);
                console.log(response.data);

                Dispath(Logging({
                    UserToken: response.data.UserToken,
                    UserData: response.data.UserData
                }));

                toast.success("Login successfully");
            } catch (err: any) {
                setBtnLogin(false);

                if (err.message === "Network Error") {
                    setresError(err.message);
                    toast.error(err.message);
                    throw new Error(err.message);
                } else {
                    const errorMsg = err.response?.data?.error || "Login failed";
                    setresError(errorMsg);
                    errorToastRef.current = toast.error(errorMsg);
                    throw new Error(errorMsg);
                }
            } finally {
                toast.dismiss(waitingToast);
            }
        }
    };

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
            {BtnLogin ? <LoadingPopup LoadingMessage="Logging in" wigthCard={330} />
                : null}
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
                            className={`bg-blue-600 text-white rounded-md mb-4 py-2 font-bold ${BtnLogin ? "cursor-wait" : "cursor-pointer"} hover:bg-blue-700`}
                        >
                            {BtnLogin ? <>
                                <i className="fa-duotone fa-solid fa-spinner fa-bounce"></i>
                                Loading...
                            </>
                                : "Login"}
                        </button>
                        {resError ? <div className="flex justify-center text-center animate-shake animate-once">
                            <h1 className=" text-error text-lg">{resError}</h1>
                        </div> : null}
                    </form>

                    {/* <div className="text-center mt-4">
                        <a href="#" className="text-blue-600 text-sm hover:underline">
                            forget password?
                        </a>
                    </div> */}

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
