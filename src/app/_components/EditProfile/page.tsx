import React, { useEffect } from 'react'
import RoleSelector from '../RoleSelector/page'
import { useFormik } from 'formik'
import AvatarIcons from '../AvatarIcons/page'

export default function EditProfile(props: any) {
    const { EditProfileFromChild } = props

    const handleEditProfile = async () => { }

    const Formik = useFormik({
        initialValues: {
            name: "",
            role: "",
            avatar: "",
        }, onSubmit: handleEditProfile
    })

    return (
        <div className='flex justify-center min-h-screen bg-base-200 animate-fade-up animate-once'>
            <div className='flex flex-col items-center gap-2 border-b-2 mb-15 border-b-gray-400'>
                <h1 className=' font-bold text-4xl flex flex-row border-b-2 mb-10 mt-15'>Edit <p className=' opacity-65 '> Profile</p></h1>

                <label className='text-xl'>UserName</label>
                <input className='border border-black py-2 px-2 rounded-2xl text-center mb-7' type="text" placeholder='New Username' />
                <RoleSelector Formik={Formik} />
                <p className='mb-7'></p>
                <AvatarIcons Formik={Formik} />
                <div className='flex justify-between gap-6'>
                    <button onClick={() => EditProfileFromChild()} className='btn btn-warning hover:bg-base-600'>cancel</button>
                    <button className='btn btn-info hover:bg-base-600'>Update</button>


                </div>
            </div>
        </div>
    )
}
