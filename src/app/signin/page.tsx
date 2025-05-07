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
import InputFiled from "../_components/Form/InputFiled";
import ButtonSign from "../_components/Form/ButtonSign";

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
                        <InputFiled type="text" placeholder="email or username" name="identifier" Formik={Formik} autoComplete="email" classType="signin" />
                        <InputFiled type="password" placeholder="password" name="password" Formik={Formik} autoComplete="current-password" classType="signin" />
                        <ButtonSign isSubmitting={isSubmitting} buttonText="Login" classType="signin" errorMessage={errorMessage} />
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
