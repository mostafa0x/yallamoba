"use client"
import React, { useContext, useEffect, useState } from 'react'
import PostCard from '../../../_components/PostCard/page'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../../../InterFaces/StateFaces'
import SpinnerLoader from '../../../_components/SpinnerLoader/page'
import EditProfile from '../../../_components/EditProfile/page'
import AddPost from '../../../_components/AddPost/page'
import AddPostCard from '../../../_components/AddPostCard/page'
import { StateRole } from '../../../../../InterFaces/StateRoleTypes'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { SetProfileData } from '@/lib/ProfileSlices'
import { ChangeUserPosts } from '@/lib/UserSlices'
import FillUserState from '@/app/_Functions/FillUserState'
import Image from 'next/image'
import { toast } from 'react-toastify'
import useGetProfile from '@/app/Hooks/useGetProfile'
import TypeHookGetProfile from '../../../../../InterFaces/TypeHookGetProfile'
import ErrorPopup from '@/app/_components/ErrorPopup/page'
import { ProfileContext } from '@/app/Contexts/ProfileContext'



export default function Profile() {
    const dispath = useDispatch()
    const { UID } = useParams()
    const { UserToken, UserData, UserPosts, headers } = useSelector((state: StateFaces) => state.UserReducer)
    const { ProfileData } = useSelector((state: StateFaces) => state.ProfileReducer)
    const { data, error, isError, isLoading }: TypeHookGetProfile = useGetProfile()
    const {
        isAddPostModalVisible,
        toggleAddPostModal,
        isPostLoading,
        toggleIsPostLoading,
        isMyProfile,
        toggleIsMyProfile,
        isPageLoading,
        toggleIsPageLoading,
        isEditProfileEnabled,
        toggleProfileEdit,
    } = useContext(ProfileContext)

    const roleIcons: StateRole = {
        Roam: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEyr-9XP3T94ExZMEJ2J8hg14xy_EWv0hmjHl0F7BNWj77uX_P7W0X00msjDKG6UADPQ&usqp=CAU",
        Exp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJW9ariSN-A0F8ZSWzFPXrWeXyET8yc66DySpavga2uCrme6dkHfVFs1vcAPcVW69l3vI&usqp=CAU",
        MM: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfiqZUsGABjbdBe49bxL1YgRTa67R6f6tqdn2zY0tdo1dI80dx403mfNmAOW9CoyhbcLM&usqp=CAU",
        Jungle: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq08kFjpruyAJrrmJG0uJv8wHY5EJk53CTJAyI3htJLiuOkyzi65FowBduAVLUzhj4byA&usqp=CAU",
        Mid: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV5jAqEnMlYpNsYlLgvRD4Lzi6Q4Glvquh2OYYeMVReFlcO6M8DraebBGUweWYlgV1qU&usqp=CAU"
    }

    const popularity: string = "https://sin1.contabostorage.com/0a986eb902c4469cb860e43985eb18a1:vocapanel/sabishopgaming/10-5b75-original.png"

    useEffect(() => {
        if (UID === UserData?.UID) {
            dispath(SetProfileData({ ownerData: UserData, ownerPosts: null }))
            toggleIsMyProfile(1)
            toggleIsPageLoading(-1)
        }
        return () => {
            toggleIsMyProfile(-1)
            toggleIsPageLoading(1)
            toggleIsPostLoading(1)
            toggleProfileEdit(-1)
            toggleAddPostModal(-1)
        }
    }, [])

    useEffect(() => {
        if (data) {
            if (UID === UserData?.UID) {
                dispath(SetProfileData({ ownerData: UserData, ownerPosts: null }))
            }
            toggleIsPostLoading(-1)
            toggleIsPageLoading(-1)

        }

    }, [data])


    if (!UserToken) {
        return <SpinnerLoader />
    }

    if (isEditProfileEnabled) {
        return <EditProfile toggleProfileEdit={toggleProfileEdit} />
    }

    if (isPageLoading) {
        return <SpinnerLoader />
    }


    return (
        <>

            {isAddPostModalVisible && isMyProfile ? <AddPostCard toggleAddPostModal={toggleAddPostModal} /> : null}
            <div className='my-12 mx-40 animate-fade-up animate-once '>
                <div className='flex justify-between border-b-2 pb-2 border-gray-400 items-center mb-12 '>
                    <div className='flex flex-row gap-8 items-center'>
                        <div className="">
                            <img className='rounded-full w-35 h-28 object-fill '
                                alt="User Avatar"
                                src={ProfileData?.ownerData.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"} />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <h1 className='text-4xl'>{ProfileData?.ownerData.username ?? "Player Name"}</h1>
                                <i className='pl-4 font-bold'>{ProfileData?.ownerData.gender === "Male" ? <i className="fa-solid fa-mars text-xl text-green-600"></i> : <i className="fa-solid fa-venus text-xl text-pink-600"></i>}</i>
                                <img className='w-8 ml-6 object-cover ' src={roleIcons[ProfileData?.ownerData?.role ?? "Roam"]} alt="Role Icon" />

                            </div>
                            <div className='flex flex-col pt-4'>
                                {ProfileData?.ownerData?.popularity ?? 0 <= 0 ? <i className="fa-solid fa-gift pl-1.5 text-lg"></i> : <img className='w-14 object-fill ' src={popularity} alt="popularity" />
                                }
                            </div>
                            <h1 className={`${ProfileData?.ownerData?.popularity ?? 0 <= 0 ? "pl-2.5" : "pl-5"}`}>0</h1>
                            {/* <h4 className='text-xl opacity-50'>Friends : {UserData.friends}</h4> */}
                        </div>
                    </div>
                    <div className='mr-32'>
                        {isMyProfile ? <button onClick={() => toggleProfileEdit(1)} className='btn btn-primary'> Edit Profile</button> : null}
                    </div>

                </div>
                {isMyProfile ? <AddPost toggleAddPostModal={toggleAddPostModal} UserData={ProfileData?.ownerData} /> : null}
                {isPostLoading ?
                    <div className="flex items-center justify-center mt-20 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <div className="px-3 py-1 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                        <Image src={"/kaguraGif.gif"} unoptimized width={100} height={100} alt="Loading" />
                    </div>
                    : <div className='mt-12'>
                        {isMyProfile ? UserPosts?.map((post: any, index: number) => {
                            return <div key={index}><PostCard Post={post} myProfile={isMyProfile} myData={UserData} OwnerData={ProfileData.ownerData} /></div>

                        }) : ProfileData?.ownerPosts.map((post: any, index: number) => {
                            return <div key={index}><PostCard Post={post} myProfile={isMyProfile} myData={UserData} OwnerData={ProfileData.ownerData} /></div>
                        })}

                    </div>}



            </div>
        </>
    )
}
