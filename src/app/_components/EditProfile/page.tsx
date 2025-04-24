import React from 'react'
import RoleSelector from '../RoleSelector/page'
import { useFormik } from 'formik'
import AvatarIcons from '../AvatarIcons/page'

export default function EditProfile() {

    const handleEditProfile = async () => { }

    const Formik = useFormik({
        initialValues: {
            name: "",
            role: "",
            avatar: "",
        }, onSubmit: handleEditProfile
    })
    return (
        <div className='flex justify-center mt-40 bg-base-200'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='py-12 font-bold text-4xl flex flex-row'>Edit <p className=' opacity-65 '> Profile</p></h1>

                <label className='font-bold text-2xl'>UserName</label>
                <input className='border border-black' type="text" />
                <RoleSelector Formik={Formik} />
                <AvatarIcons Formik={Formik} />
            </div>
        </div>
    )
}
