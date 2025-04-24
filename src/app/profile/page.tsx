"use client"
import React, { useState } from 'react'
import PostCard from '../_components/PostCard/page'
import { useSelector } from 'react-redux'
import { StateFaces } from '../../../InterFaces/StateFaces'
import SpinnerLoader from '../_components/SpinnerLoader/page'
import EditProfile from '../_components/EditProfile/page'

export default function Profile() {
    const [EditProfileBool, setEditProfileBool] = useState(false)
    const { UserToken, UserData } = useSelector((state: StateFaces) => state.UserReducer)



    if (!UserToken) {
        return <SpinnerLoader />
    }

    if (EditProfileBool) {
        return <EditProfile />
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
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-4 border-b border-gray-300 pb-3">
                <div className="w-12 h-12">
                    <img
                        className="rounded-full w-full h-full object-cover"
                        alt="User Avatar"
                        src={UserData.Avatar ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    />
                </div>
                <input
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-full outline-none cursor-pointer"
                    type="text"
                    placeholder="What's on your mind?"
                />
            </div>

            <div className="flex justify-between items-center mt-3 px-2 text-sm text-gray-600">
                {/* <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-video text-red-500" />
                    <span>Live Video</span>
                </button> */}
                <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-image text-green-500" />
                    <span>Photo/Video</span>
                </button>
                <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Post</span>
                </button>
            </div>
        </div>
        <div className='mt-12'>
            <PostCard />

        </div>

    </div>
    )
}
