"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { FormState } from "../../../InterFaces/FormState";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../InterFaces/StateFaces';
import SpinnerLoader from '../_components/SpinnerLoader/page';
import RoleSelector from '../_components/RoleSelector/page';
import { setCurrentAvatarIndex, setAvatarAnmition } from '@/lib/AvatarSlices';
import AvatarIcons from '../_components/AvatarIcons/page';
import axios, { AxiosResponse } from 'axios';
import dotenv from "dotenv"
import { Logging } from '@/lib/UserSlices';
import { toast } from 'react-toastify';
dotenv.config()

export default function SignUp() {
    const [PageAnime, setPageAnime] = useState(false)
    const [BtnSignUp, setBtnSignUp] = useState(false)
    const [resError, setresError] = useState(null)

    const Router = useRouter()
    const { UserToken } = useSelector((state: StateFaces) => state.UserReducer)
    const { avatars, currentAvatarIndex, AvatarAnmition } = useSelector((state: StateFaces) => state.AvatarReducer)
    const Dispath = useDispatch()
    const handleGotoSignIn = () => {
        setPageAnime(true)
        Router.push("/signin")
    }

    const validationSchema = yup.object().shape({
        username: yup.string().min(6, "must be 6").max(12, "max 12").required("Required !"),
        gender: yup.string().required("Required !"),
        email: yup.string().email("Invild email").required("Required !"),
        password: yup.string().min(8, "To Short").required("Required !"),
        repassword: yup.string()
            .oneOf([yup.ref('password')], "not same password")
            .required("Required !"),
        avatar: yup.string().required("Required !"),
        role: yup.string().required("Required !")
    })


    async function handleSignUp(formValues: FormState) {
        if (!BtnSignUp) {
            const WaitingToast = toast.loading("Waiting...")
            setresError(null)
            setBtnSignUp(true)
            try {
                const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, formValues)
                Dispath(Logging({ UserToken: data.data.UserToken, UserData: data.data.UserData }))
                toast.success("Registration completed successfully")

            } catch (err: any) {
                setBtnSignUp(false)
                setresError(err.response.data.error)
                toast.error(err.response.data.error)
                throw new Error(err.response.data.error)

            } finally {
                toast.dismiss(WaitingToast)
            }

        }
    }

    const Formik = useFormik({
        initialValues: {
            username: "",
            gender: "",
            email: "",
            password: "",
            repassword: "",
            avatar: "",
            role: "",
        }, validationSchema, onSubmit: handleSignUp
    })



    useEffect(() => {
        window.scroll(0, 0)

        return () => {
            setPageAnime(false)
        }
    }, [])

    useEffect(() => {
        Formik.setFieldValue("avatar", avatars[currentAvatarIndex])

        if (AvatarAnmition !== 0) {
            var AvaTime = setTimeout(() => {
                Dispath(setAvatarAnmition(0))
            }, 250);
        }
        return () => {
            clearTimeout(AvaTime)
        }
    }, [AvatarAnmition])

    if (UserToken) {
        return <SpinnerLoader />
    }

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-100  ${PageAnime ? "animate-jump-out animate-once" : "animate-fade-up animate-once"}`}>
            <form onSubmit={Formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-blue-600 text-2xl font-bold mb-6 text-center">Create a new account</h2>

                <div className="flex gap-2 ">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username in game"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.username}
                        className="w-full px-3 py-2 border rounded"
                        required
                        autoComplete='username'
                    />
                </div>
                <div className=' py-2'>
                    {Formik.errors.username && Formik.touched.username ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.username}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.email}
                    className="w-full px-3 py-2 border rounded"
                    required
                    autoComplete='email'

                />
                <div className=' py-2'>
                    {Formik.errors.email && Formik.touched.email ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.email}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>

                <input
                    type="password"
                    name="password"
                    placeholder="New password"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.password}
                    className="w-full px-3 py-2  border rounded"
                    required
                    autoComplete='new-password'
                />
                <div className=' py-2'>
                    {Formik.errors.password && Formik.touched.password ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.password}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>
                <input
                    type="password"
                    name="repassword"
                    placeholder="New password"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.repassword}
                    className="w-full px-3 py-2 border rounded"
                    required
                    autoComplete='new-password'
                />
                <div className=' py-2'>
                    {Formik.errors.repassword && Formik.touched.repassword ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.repassword}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>

                <label className="block text-sm mb-1">Gender</label>
                <div className="flex justify-between  px-26">
                    <label className="flex items-center gap-2">
                        <input type="radio" onChange={() => Formik.setFieldValue("gender", "Male")}

                            value={Formik.values.gender} name="gender" required />
                        Male
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" onChange={() => Formik.setFieldValue("gender", "Female")}

                            value={Formik.values.gender} name="gender" />
                        Female
                    </label>
                </div>
                <div className=' py-2'>
                    {Formik.errors.gender && Formik.touched.gender ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.gender}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>

                <RoleSelector Formik={Formik} />

                <div className=' py-2'>
                    {Formik.errors.role && Formik.touched.role ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.role}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>
                <AvatarIcons Formik={Formik} />

                <button
                    type="submit"
                    className={`w-full  bg-green-600  ${BtnSignUp ? "cursor-wait" : "cursor-pointer"} hover:bg-green-700 text-white font-semibold py-2 rounded`}>
                    {BtnSignUp ? "Loading.." : "Sign up"}
                </button>
                {resError ? <div className="flex justify-center text-center animate-shake animate-once">
                    <h1 className=" text-error text-lg">{resError}</h1>
                </div> : null}
                <div className='mt-6 border-t-2 border-gray-300'>
                    <div className='flex justify-center items-center text-center flex-row p-8'>
                        <i className='text-xs text-center'>I have Account !  </i>

                        <p onClick={() => handleGotoSignIn()} className='font-bold underline underline-offset-2 cursor-pointer'>  Sign In</p>
                    </div>
                </div>
            </form>

        </div>
    );
}
