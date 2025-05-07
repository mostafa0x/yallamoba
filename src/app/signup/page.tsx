"use client";

import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
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

                    <input
                        type="text"
                        name="username"
                        placeholder="Username in game"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        className="w-full px-3 py-2 border rounded"
                        autoComplete="username"
                        required
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="text-red-500 text-sm animate-shake">
                            {formik.errors.username}
                        </p>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full px-3 py-2 border rounded mt-4"
                        autoComplete="email"
                        required
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm animate-shake">
                            {formik.errors.email}
                        </p>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="New password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="w-full px-3 py-2 border rounded mt-4"
                        autoComplete="new-password"
                        required
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm animate-shake">
                            {formik.errors.password}
                        </p>
                    )}

                    <input
                        type="password"
                        name="repassword"
                        placeholder="Confirm password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repassword}
                        className="w-full px-3 py-2 border rounded mt-4"
                        autoComplete="new-password"
                        required
                    />
                    {formik.touched.repassword && formik.errors.repassword && (
                        <p className="text-red-500 text-sm animate-shake">
                            {formik.errors.repassword}
                        </p>
                    )}

                    <label className="block text-sm mt-4 mb-1">Gender</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                checked={formik.values.gender === "Male"}
                                onChange={() => formik.setFieldValue("gender", "Male")}
                            />
                            Male
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                checked={formik.values.gender === "Female"}
                                onChange={() => formik.setFieldValue("gender", "Female")}
                            />
                            Female
                        </label>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="text-red-500 text-sm animate-shake">
                            {formik.errors.gender}
                        </p>
                    )}

                    <RoleSelector Formik={formik} />
                    {formik.touched.role && formik.errors.role && (
                        <p className="text-red-500 text-sm animate-shake">
                            {formik.errors.role}
                        </p>
                    )}

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
