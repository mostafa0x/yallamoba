"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { FormState } from "../../../InterFaces/FormState";
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const avatars = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlNYFmHwzixn-mZOW9UWGgxMvt4Tx0bL_Jw&s',
        'data:image/jpeg;base64,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',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1vJfpPFa8UmAvbPMBBJP7gzQb9SPHXV88A&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp57MXcGWGxi_ULBjl42RSSNAbACa04sfKsw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvcwtvPYIGQjdnAuQ0XibxErTRnokD0EE8Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxBOH2dGYTMJJA9TMXObuSWoDN3jfzBsQA8g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJ1pM8HZ1lLNQxnjIEGvWM67qNwfpcmC2hw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUFJRF5llSzkn71tRg8vtoynAHq19HRnjahg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtFXFK0aLMsqeL62luSSw13WE9fU-vZgNiw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuVHoR6sYcBo2nW9uJhCt--YUnBUutDuIfw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTpEh8aWFWRfM4JeS2sBjxehYwMhxms_kZiw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mGcwK1Doj36_tYvBW0rHUoTk_EBZ4IQWHg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqeFFtCkOWvx3pKiPg8xsssqDPu0foEsC8g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeqT6fZcrrkBO_EfCwuwhUYbsd8asG75RVA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxkadYM8KIeqFfPLX0Mxbys5bptoGzLuCGyw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqqMT-IIvDRO98gGbcwEJ7-h6xWV-YRVUcyw&s'
    ];
    const [AvatarAnmition, setAvatarAnmition] = useState(0)
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
    const [PageAnime, setPageAnime] = useState(false)
    const [BtnSignUp, setBtnSignUp] = useState(false)
    const Router = useRouter()

    const handleGotoSignIn = () => {
        setPageAnime(true)
        Router.push("/signin")
    }

    const validationSchema = yup.object().shape({
        name: yup.string().min(6, "must be 6").max(12, "max 12").required("Required !"),
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
            await setBtnSignUp(true)
            return console.log(formValues);

        }
    }

    const Formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            email: "",
            password: "",
            repassword: "",
            avatar: "",
            role: "",
        }, validationSchema, onSubmit: handleSignUp
    })

    const handlePrev = () => {
        setCurrentAvatarIndex((prevIndex) =>
            prevIndex === 0 ? avatars.length - 1 : prevIndex - 1
        );
        setAvatarAnmition(2)

    };

    const handleNext = () => {
        setCurrentAvatarIndex((prevIndex) =>
            prevIndex === avatars.length - 1 ? 0 : prevIndex + 1

        );
        setAvatarAnmition(1)
    };
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
                setAvatarAnmition(0)
            }, 250);
        }
        return () => {
            clearTimeout(AvaTime)
        }
    }, [AvatarAnmition])


    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-100  ${PageAnime ? "animate-jump-out animate-once" : "animate-fade-up animate-once"}`}>
            <form onSubmit={Formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-blue-600 text-2xl font-bold mb-6 text-center">Create a new account</h2>

                {/* الاسم */}
                <div className="flex gap-2 ">
                    <input
                        type="text"
                        name="name"
                        placeholder="Username in game"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.name}
                        className="w-full px-3 py-2 border rounded"
                        required
                        autoComplete='username'
                    />
                </div>
                <div className=' py-2'>
                    {Formik.errors.name && Formik.touched.name ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.name}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>


                {/* الإيميل والباسورد */}
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

                {/* الجندر */}
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

                {/* الرول */}
                <label className="block text-sm mb-1">Your main role</label>
                <select
                    name="role"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.role}
                    className="w-full px-3 py-2  border rounded"
                    required
                >
                    <option value="">Select your role</option>
                    <option value="Roam">Roam</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="MM">MM</option>
                    <option value="Exp">Exp</option>
                </select>
                <div className=' py-2'>
                    {Formik.errors.role && Formik.touched.role ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.role}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>

                {/* اختيار صورة البروفايل */}
                <label className="block text-sm mb-2">Choose your profile picture</label>
                <div className="flex items-center justify-center gap-4 ">
                    <button type="button" onClick={handlePrev} className="text-lg font-bold">
                        <i className="fa-solid fa-arrow-left cursor-pointer text-3xl"></i>
                    </button>
                    <img
                        src={avatars[currentAvatarIndex]}
                        alt="Selected Avatar"
                        className={`w-20 h-20 object-cover rounded-full border ${AvatarAnmition === 2 ? "animate-fade-left animate-once" : ""} ${AvatarAnmition === 1 ? "animate-fade-right animate-once" : ""}`}
                    />
                    <button type="button" onClick={handleNext} className="text-lg font-bold">
                        <i className="fa-solid fa-arrow-right cursor-pointer text-3xl "></i>
                    </button>
                </div>
                <div className=' py-2'>
                    {Formik.errors.avatar && Formik.touched.avatar ?
                        <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{Formik.errors.avatar}</h1>
                        : <h1 className='invisible '>hidden text</h1>}
                </div>



                {/* الزر */}
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                >
                    {BtnSignUp ? "Loading.." : "Sign up"}
                </button>
                <div className='mt-6 border-t-2 border-gray-300'>
                    <div className='flex justify-center items-center text-center flex-row p-8'>
                        <i className='text-xs text-center'>I have Account !  </i>
                        {/* <Link href={"/signin"}><p className='font-bold underline underline-offset-2 cursor-pointer'>  Sign In</p>
                        </Link> */}
                        <p onClick={() => handleGotoSignIn()} className='font-bold underline underline-offset-2 cursor-pointer'>  Sign In</p>
                    </div>
                </div>
            </form>

        </div>
    );
}
