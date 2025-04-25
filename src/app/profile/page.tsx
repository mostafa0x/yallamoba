"use client"
import React, { useState } from 'react'
import PostCard from '../_components/PostCard/page'
import { useSelector } from 'react-redux'
import { StateFaces } from '../../../InterFaces/StateFaces'
import SpinnerLoader from '../_components/SpinnerLoader/page'
import EditProfile from '../_components/EditProfile/page'
import AddPost from '../_components/AddPost/page'
export default function Profile() {
    const [EditProfileBool, setEditProfileBool] = useState(false)
    const { UserToken, UserData } = useSelector((state: StateFaces) => state.UserReducer)

    function EditProfileFromChild() {
        setEditProfileBool(false)
    }


    if (!UserToken) {
        return <SpinnerLoader />
    }

    if (EditProfileBool) {
        return <EditProfile EditProfileFromChild={EditProfileFromChild} />
    }

    return (<div className='my-12 mx-40 animate-fade-up animate-once '>
        <div className='flex justify-between border-b-2 pb-2 border-gray-400 items-center mb-12 '>
            <div className='flex flex-row gap-8 items-center'>
                <div className="w-35">
                    <img className='rounded-full'
                        alt="User Avatar"
                        src={UserData.Avatar ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <h1 className='text-4xl'>{UserData.Username ?? "Player Name"}</h1>
                        <i className='pl-4 font-bold'>{UserData.Gender === "Mele" ? "M" : "F"}</i>

                    </div>
                    <h4 className='text-xl opacity-50'>Friends : {UserData.Friends}</h4></div>
            </div>
            <div className='mr-32'>
                <button onClick={() => setEditProfileBool(true)} className='btn btn-primary'> Edit Profile</button>
            </div>

        </div>
        <AddPost UserData={UserData} />
        <div className='mt-12'>
            <PostCard />

        </div>

    </div>
    )
}
