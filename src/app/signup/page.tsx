"use client";
import React, { useEffect, useRef } from "react";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { Id, toast } from "react-toastify";
import { signupSchema } from "@/lib/validationSchemas/signupSchema";
import useSignUpUI from "../Hooks/useSignUpUI";
import { Logging } from "@/lib/UserSlices";
import { setAvatarAnmition } from "@/lib/AvatarSlices";
import SpinnerLoader from "../_components/SpinnerLoader/page";
import RoleSelector from "../_components/RoleSelector/page";
import AvatarIcons from "../_components/AvatarIcons/page";
import LoadingPopup from "../_components/LoadingPopup/page";
import { StateFaces } from "../../../InterFaces/StateFaces";
import { FormState } from "../../../InterFaces/FormState";
import InputFiled from "../_components/Form/InputFiled";
import InputGender from "../_components/Form/InputGender";

export default function SignUp() {
    const {
        isAnimating,
        isSubmitting,
        errorMessage,
        setErrorMessage,
        triggerAnimation,
        endSubmit,
        startSubmit
    } = useSignUpUI();

    const router = useRouter();
    const dispatch = useDispatch();

    const { UserToken } = useSelector((state: StateFaces) => state.UserReducer);
    const { avatars, currentAvatarIndex, AvatarAnmition } = useSelector(
        (state: StateFaces) => state.AvatarReducer
    );

    const formik = useFormik({
        initialValues: {
            username: "",
            gender: "",
            email: "",
            password: "",
            repassword: "",
            avatar: "",
            role: "",
        },
        validationSchema: signupSchema,
        onSubmit: handleSignUp,
    });

    async function handleSignUp(values: FormState) {
        if (!isSubmitting) {
            startSubmit();
            toast.promise(
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, values),
                {
                    pending: "Registering...",
                    success: "Registration successful",
                    error: {
                        render({ data }: any) {
                            return data?.response?.data?.error || "Registration failed";
                        },
                    },
                }
            )
                .then((res: AxiosResponse) => {
                    dispatch(
                        Logging({
                            UserToken: res.data.UserToken,
                            UserData: res.data.UserData,
                        })
                    );
                })
                .catch((err) => {
                    if (err?.response?.data?.error) {
                        setErrorMessage(err.response.data.error)
                    } else {
                        setErrorMessage(err.message)
                    }
                })
                .finally(() => {
                    endSubmit();
                });
        }
    }

    useEffect(() => {
        formik.setFieldValue("avatar", avatars[currentAvatarIndex]);

        if (AvatarAnmition !== 0) {
            const timeout = setTimeout(() => {
                dispatch(setAvatarAnmition(0));
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [AvatarAnmition]);

    if (UserToken) return <SpinnerLoader />;

    return (
        <>
            {isSubmitting && (
                <LoadingPopup LoadingMessage={"Registering now"} wigthCard={390} />
            )}

            <div
                className={`min-h-screen flex items-center justify-center bg-gray-100 ${isAnimating
                    ? "animate-jump-out animate-once"
                    : "animate-fade-up animate-once"
                    }`}
            >
                <form
                    onSubmit={formik.handleSubmit}
                    className="bg-white p-8 rounded shadow-md w-full max-w-md"
                >
                    <h2 className="text-blue-600 text-2xl font-bold mb-6 text-center">
                        Create a new account
                    </h2>
                    <InputFiled type="text" placeholder="username" name="username" Formik={formik} autoComplete="username" classType="signup" />
                    <InputFiled type="email" placeholder="email" name="email" Formik={formik} autoComplete="email" classType="signup" />
                    <InputFiled type="password" placeholder="password" name="password" Formik={formik} autoComplete="new-password" classType="signup" />
                    <InputFiled type="password" placeholder="Confirm password" name="repassword" Formik={formik} autoComplete="new-password" classType="signup" />
                    <InputGender Formik={formik} />
                    <RoleSelector Formik={formik} />
                    <AvatarIcons Formik={formik} />

                    <button
                        type="submit"
                        className={`w-full bg-green-600 ${isSubmitting ? "cursor-wait" : "hover:bg-green-700"
                            } text-white font-semibold py-2 mt-4 rounded`}
                    >
                        {isSubmitting ? "Loading..." : "Sign up"}
                    </button>

                    {errorMessage && (
                        <div className="text-red-600 text-center mt-4 animate-shake">
                            {errorMessage}
                        </div>
                    )}

                    <div className="mt-6 border-t-2 border-gray-300 pt-4 text-center">
                        <span className="text-sm">Already have an account?</span>
                        <button
                            type="button"
                            onClick={() => {
                                triggerAnimation();
                                router.push("/signin");
                            }}
                            className="ml-2 font-bold underline"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
