"use client"
import React, { useEffect, useState } from 'react'
import PostCard from '../../_components/PostCard/page'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../../InterFaces/StateFaces'
import SpinnerLoader from '../../_components/SpinnerLoader/page'
import EditProfile from '../../_components/EditProfile/page'
import AddPost from '../../_components/AddPost/page'
import AddPostCard from '../../_components/AddPostCard/page'
import { StateRole } from '../../../../InterFaces/StateRoleTypes'
import { StatePostData } from '../../../../InterFaces/StatePostsSlices'
import { useParams } from 'next/navigation'
import { TypeRole } from '../../../../InterFaces/StateUserSlices'
import axios from 'axios'
import dotenv from "dotenv"
import ErrorPopup from '@/app/_components/ErrorPopup/page'
import { SetProfileData } from '@/lib/ProfileSlices'
import { ChangeUserPosts } from '@/lib/UserSlices'
dotenv.config()



export default function Profile() {
    const { UID } = useParams()
    const dispath = useDispatch()
    const [EditProfileBool, setEditProfileBool] = useState(false)
    const { UserToken, UserData, UserPosts } = useSelector((state: StateFaces) => state.UserReducer)
    const { ProfileData } = useSelector((state: StateFaces) => state.ProfileReducer)
    const [pageLoading, setpageLoading] = useState(true)
    const [myProfile, setmyProfile] = useState(false)
    const roleIcons: StateRole = {
        Roam: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEyr-9XP3T94ExZMEJ2J8hg14xy_EWv0hmjHl0F7BNWj77uX_P7W0X00msjDKG6UADPQ&usqp=CAU",
        Exp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJW9ariSN-A0F8ZSWzFPXrWeXyET8yc66DySpavga2uCrme6dkHfVFs1vcAPcVW69l3vI&usqp=CAU",
        MM: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfiqZUsGABjbdBe49bxL1YgRTa67R6f6tqdn2zY0tdo1dI80dx403mfNmAOW9CoyhbcLM&usqp=CAU",
        Jungle: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq08kFjpruyAJrrmJG0uJv8wHY5EJk53CTJAyI3htJLiuOkyzi65FowBduAVLUzhj4byA&usqp=CAU",
        Mid: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV5jAqEnMlYpNsYlLgvRD4Lzi6Q4Glvquh2OYYeMVReFlcO6M8DraebBGUweWYlgV1qU&usqp=CAU"
    }
    const headers: any = {
        authorization: `Bearer ${UserToken}`
    }
    const popularity: string = "https://sin1.contabostorage.com/0a986eb902c4469cb860e43985eb18a1:vocapanel/sabishopgaming/10-5b75-original.png"


    function SetFromChild() {
        setShowModal(false)
    }
    function OpenCard() {
        setShowModal(true)
    }

    async function GetProfile() {
        try {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${UID}`, { headers })
            dispath(SetProfileData(data.data))
            if (UserData?.UID === UID) {
                dispath(ChangeUserPosts(data.data.ownerPosts))
            }
            setpageLoading(false)

        } catch (err) {
            console.log(err);
        }
    }


    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (UID === UserData?.UID) {
            // UserData && setprofileData({ ownerData: { username: UserData?.username, avatar: UserData?.avatar, role: UserData?.role, gender: UserData?.gender, popularity: UserData?.popularity, UID: UserData?.UID }, ownerPosts: userPosts })
            setmyProfile(true)
            // setpageLoading(false)
            GetProfile()

        } else {
            setmyProfile(false)
            GetProfile()
        }


        return () => {
            setpageLoading(true)
            setmyProfile(false)
        }
    }, [])
    useEffect(() => {

        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal, setShowModal]);




    function EditProfileFromChild() {
        setEditProfileBool(false)
    }



    if (!UserToken) {
        return <SpinnerLoader />
    }

    if (EditProfileBool) {
        return <EditProfile EditProfileFromChild={EditProfileFromChild} />
    }

    if (pageLoading) {
        return <SpinnerLoader />
    }

    return (
        <>
            {showModal && myProfile ? <AddPostCard SetFromChild={SetFromChild} /> : null}
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
                        {myProfile ? <button onClick={() => setEditProfileBool(true)} className='btn btn-primary'> Edit Profile</button> : null}
                    </div>

                </div>
                {myProfile ? <AddPost OpenCard={OpenCard} UserData={ProfileData?.ownerData} /> : null}
                <div className='mt-12'>
                    {myProfile ? UserPosts?.map((post: any, index: number) => {
                        return <div key={index}><PostCard Post={post} myProfile={myProfile} myData={UserData} UserData={ProfileData.ownerData} /></div>

                    }) : ProfileData?.ownerPosts.map((post: any, index: number) => {
                        return <div key={index}><PostCard Post={post} myProfile={myProfile} myData={UserData} UserData={ProfileData.ownerData} /></div>
                    })}

                </div>

            </div>
        </>
    )
}
