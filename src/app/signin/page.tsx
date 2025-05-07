"use client";
import React from "react";
import { useFormik } from "formik"
import { FormState } from "../../../InterFaces/FormState";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../InterFaces/StateFaces';
import SpinnerLoader from '../_components/SpinnerLoader/page';
import axios from "axios";
import { Logging } from "@/lib/UserSlices";
import { toast } from "react-toastify";
import LoadingPopup from "../_components/LoadingPopup/page";
import { validationSchema } from "../../lib/validationSchemas/signinSchema"
import useSigninUI from "../Hooks/useSigninUI";

export default function Login() {
    const Router = useRouter()
    const { UserToken } = useSelector((state: StateFaces) => state.UserReducer)
    const Dispath = useDispatch()
    const {
        isAnimating,
        isSubmitting,
        errorMessage,
        handleSetSubmit,
        handleSetAnimating,
        seterrorMessage,

    } = useSigninUI()

    const handleLogin = async (formValues: FormState) => {
        if (!isSubmitting) {
            seterrorMessage(null);
            handleSetSubmit(1);
            toast.promise(
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, formValues),
                {
                    pending: 'Logging in...',
                    success: 'Login successful',
                    error: {
                        render({ data }: any) {
                            return data?.response?.data?.error || "Login failed";
                        },
                    }
                }
            ).then(response => {
                Dispath(Logging({ UserToken: response.data.UserToken, UserData: response.data.UserData }));
                handleSetSubmit(-1);

            }).catch((err => {
                if (err?.response?.data?.error) {
                    seterrorMessage(err.response.data.error)
                } else {
                    seterrorMessage(err.message)
                }
                handleSetSubmit(-1);
            }))

        }
    };

    const Formik = useFormik({
        initialValues: {
            identifier: "",
            password: ""
        }, validationSchema, onSubmit: handleLogin
    })

    if (UserToken) {
        return <SpinnerLoader />
    }
    return (
        <div>
            {isSubmitting ? <LoadingPopup LoadingMessage="Logging in" wigthCard={330} />
                : null}
            <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4  ${isAnimating ? "animate-jump-out animate-once" : "animate-fade-up animate-once"}`}>

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
                            className={`bg-blue-600 text-white rounded-md mb-4 py-2 font-bold ${isSubmitting ? "cursor-wait" : "cursor-pointer"} hover:bg-blue-700`}
                        >
                            {isSubmitting ? <>
                                <i className="fa-duotone fa-solid fa-spinner fa-bounce"></i>
                                Loading...
                            </>
                                : "Login"}
                        </button>
                        {errorMessage ? <div className="flex justify-center text-center animate-shake animate-once">
                            <h1 className=" text-error text-lg">{errorMessage}</h1>
                        </div> : null}
                    </form>

                    {/* <div className="text-center mt-4">
                        <a href="#" className="text-blue-600 text-sm hover:underline">
                            forget password?
                        </a>
                    </div> */}
                    <hr className="my-4" />
                    <div className="flex justify-center">
                        <button onClick={() => {
                            handleSetAnimating(1)
                            Router.push("/signup")
                        }} className="bg-green-600 text-white px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-700">
                            Create Account
                        </button>
                    </div>
                </div>
                <p className="mt-6 text-sm text-gray-600 text-center">
                    yalla moba
                </p>
            </div>
        </div >
    );
}
