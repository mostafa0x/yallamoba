"use client"
import { setCurrentAvatarIndex } from '@/lib/AvatarSlices'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../../InterFaces/StateFaces'

export default function AvatarIcons(props: any) {
    const Dispath = useDispatch()
    const { avatars, AvatarAnmition, currentAvatarIndex } = useSelector((state: StateFaces) => state.AvatarReducer)
    return (
        <div>
            <label className="block text-sm mb-2">Choose your profile picture</label>
            <div className="flex items-center justify-center gap-4 ">
                <button type="button" onClick={() => Dispath(setCurrentAvatarIndex(-1))} className="text-lg font-bold">
                    <i className="fa-solid fa-arrow-left cursor-pointer text-3xl"></i>
                </button>
                <img
                    src={avatars[currentAvatarIndex]}
                    alt="Selected Avatar"
                    className={`w-20 h-20 object-cover rounded-full border ${AvatarAnmition === 2 ? "animate-fade-left animate-once" : ""} ${AvatarAnmition === 1 ? "animate-fade-right animate-once" : ""}`}
                />
                <button type="button" onClick={() => Dispath(setCurrentAvatarIndex(1))} className="text-lg font-bold">
                    <i className="fa-solid fa-arrow-right cursor-pointer text-3xl "></i>
                </button>
            </div>
            <div className=' py-2'>
                {props.Formik.errors.avatar && props.Formik.touched.avatar ?
                    <h1 className='text-red-500 opacity-70 animate-shake animate-once'>{props.Formik.errors.avatar}</h1>
                    : <h1 className='invisible '>hidden text</h1>}
            </div>
        </div>
    )
}
