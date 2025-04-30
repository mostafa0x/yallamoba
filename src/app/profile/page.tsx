"use client"
import React, { useEffect, useState } from 'react'
import PostCard from '../_components/PostCard/page'
import { useSelector } from 'react-redux'
import { StateFaces } from '../../../InterFaces/StateFaces'
import SpinnerLoader from '../_components/SpinnerLoader/page'
import EditProfile from '../_components/EditProfile/page'
import AddPost from '../_components/AddPost/page'
import AddPostCard from '../_components/AddPostCard/page'
import { StateRole } from '../../../InterFaces/StateRoleTypes'
import { StatePostData } from '../../../InterFaces/StatePostsSlices'
export default function Profile() {
    const [EditProfileBool, setEditProfileBool] = useState(false)
    const { UserToken, UserData } = useSelector((state: StateFaces) => state.UserReducer)
    const { userPosts } = useSelector((state: StateFaces) => state.PostsReducer)
    const roleIcons: StateRole = {
        Roam: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEyr-9XP3T94ExZMEJ2J8hg14xy_EWv0hmjHl0F7BNWj77uX_P7W0X00msjDKG6UADPQ&usqp=CAU",
        Exp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJW9ariSN-A0F8ZSWzFPXrWeXyET8yc66DySpavga2uCrme6dkHfVFs1vcAPcVW69l3vI&usqp=CAU",
        MM: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfiqZUsGABjbdBe49bxL1YgRTa67R6f6tqdn2zY0tdo1dI80dx403mfNmAOW9CoyhbcLM&usqp=CAU",
        Jungle: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq08kFjpruyAJrrmJG0uJv8wHY5EJk53CTJAyI3htJLiuOkyzi65FowBduAVLUzhj4byA&usqp=CAU",
        Mid: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV5jAqEnMlYpNsYlLgvRD4Lzi6Q4Glvquh2OYYeMVReFlcO6M8DraebBGUweWYlgV1qU&usqp=CAU"
    }
    const popularity: string = "https://sin1.contabostorage.com/0a986eb902c4469cb860e43985eb18a1:vocapanel/sabishopgaming/10-5b75-original.png"


    function SetFromChild() {
        setShowModal(false)
    }
    function OpenCard() {
        setShowModal(true)
    }


    const [showModal, setShowModal] = useState(false);

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

    return (
        <>
            {showModal ? <AddPostCard SetFromChild={SetFromChild} /> : null}
            <div className='my-12 mx-40 animate-fade-up animate-once '>
                <div className='flex justify-between border-b-2 pb-2 border-gray-400 items-center mb-12 '>
                    <div className='flex flex-row gap-8 items-center'>
                        <div className="w-35">
                            <img className='rounded-full'
                                alt="User Avatar"
                                src={UserData?.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"} />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <h1 className='text-4xl'>{UserData?.username ?? "Player Name"}</h1>
                                <i className='pl-4 font-bold'>{UserData?.gender === "Male" ? <i className="fa-solid fa-mars text-xl text-green-600"></i> : <i className="fa-solid fa-venus text-xl text-pink-600"></i>}</i>
                                <img className='w-8 ml-6 object-cover ' src={roleIcons[UserData?.role ?? "Roam"]} alt="Role Icon" />

                            </div>
                            <div className='flex flex-col pt-4'>
                                {UserData?.popularity ?? 0 <= 0 ? <i className="fa-solid fa-gift pl-1.5 text-lg"></i> : <img className='w-14 object-fill ' src={popularity} alt="popularity" />
                                }
                            </div>
                            <h1 className={`${UserData?.popularity ?? 0 <= 0 ? "pl-2.5" : "pl-5"}`}>0</h1>
                            {/* <h4 className='text-xl opacity-50'>Friends : {UserData.friends}</h4> */}
                        </div>
                    </div>
                    <div className='mr-32'>
                        <button onClick={() => setEditProfileBool(true)} className='btn btn-primary'> Edit Profile</button>
                    </div>

                </div>
                <AddPost OpenCard={OpenCard} UserData={UserData} />
                <div className='mt-12'>
                    {userPosts.map((post: any) => {
                        return <PostCard PostData={post} UserData={UserData} />

                    })}

                </div>

            </div>
        </>
    )
}
