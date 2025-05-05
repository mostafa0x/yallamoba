import React, { useEffect, useRef, useState } from 'react'
import { StateUserData, TypeRole } from '../../../../InterFaces/StateUserSlices'
import { postData, StatePostData } from '../../../../InterFaces/StatePostsSlices';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../../InterFaces/StateFaces';
import axios from 'axios';
dayjs.extend(relativeTime);
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RemovePostFromUserPosts } from '@/lib/UserSlices';
import { toast } from 'react-toastify';


interface Userdata {
    username: null | string;
    avatar: null | string;
    role: null | TypeRole;
    gender: null | string;
    popularity: number;
    UID: null | number;
}
interface Props {
    UserData: Userdata | null | undefined;
    Post: postData
    myData: Userdata | undefined | null
    myProfile: boolean

}

export default function PostCard({ UserData, Post, myData, myProfile
}: Props) {
    const TimePost = dayjs(Post.updated_at).fromNow();
    const { UserToken } = useSelector((state: StateFaces) => state.UserReducer)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [btnDeletPost, setbtnDeletPost] = useState(false)
    const headers: any = {
        authorization: `Bearer ${UserToken}`
    }
    const dispath = useDispatch()
    async function DeletePost(postID: number) {

        try {
            const data = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postID}`, { headers })
            console.log(data);
            dispath(RemovePostFromUserPosts(postID))
        } catch (err) {
            console.log(err);

        }
    }
    const handleDelete = async (postID: number) => {
        if (!btnDeletPost) {
            const WaitingDelete = toast.loading("Wait to delete post ..")
            setbtnDeletPost(true)
            try {
                await DeletePost(postID);
                toast.success("Post deleted successfully")
                setOpen(false);
            } catch (err) {
                console.log(err);
            } finally {
                setbtnDeletPost(false)
                toast.dismiss(WaitingDelete)

            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={UserData?.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"}
                        alt="Post Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{UserData?.username}</p>
                        <p className="text-sm text-gray-500">{TimePost}</p>
                    </div>
                </div>
                {myProfile ? <div className="relative" ref={dropdownRef}>
                    <div onClick={() => setOpen(prev => !prev)} role="button">
                        <i className="fa-solid fa-ellipsis cursor-pointer text-gray-500 hover:text-gray-700" />
                    </div>

                    {open && (
                        <ul className="absolute right-0 mt-2 menu bg-base-100 rounded-box z-10 gap-3 w-52 p-2 shadow-sm">
                            <li>
                                <a><i className="fa-solid fa-pen"></i> Edit</a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleDelete(Post.id)}
                                    className="text-red-500"
                                >
                                    {btnDeletPost ? <h1><span className="loading loading-spinner loading-xl"></span>
                                        Deleting</h1> : <>
                                        <i className="fa-solid fa-trash"></i>
                                        Delete
                                    </>
                                    }


                                </a>
                            </li>
                        </ul>
                    )}
                </div>

                    : null}
            </div>

            {/* Body text */}
            <p className="mb-3 text-gray-800">
                {Post?.body}
            </p>

            {/* Media (Image or Video) */}
            {Post?.files?.length > 0 && (
                <div className="mb-4">
                    <Slider
                        dots={true}
                        infinite={false}
                        speed={500}
                        slidesToShow={Post.files.length >= 4 ? 4 : Post.files.length}
                        slidesToScroll={1}
                        arrows={true}
                    >
                        {Post.files.map((fileUrl: string, index: number) => {
                            const extension = fileUrl.split('.').pop()?.toLowerCase();
                            const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '');
                            const isVideo = ['mp4', 'mov', 'avi'].includes(extension || '');

                            return (
                                <div key={index} className="w-full">
                                    {isImage && (
                                        <img
                                            src={fileUrl}
                                            alt={`Post media ${index}`}
                                            className="w-full h-auto max-h-[500px] object-contain rounded"
                                        />
                                    )}
                                    {isVideo && (
                                        <video
                                            controls
                                            className="w-full max-h-[500px] rounded"
                                        >
                                            <source src={fileUrl} type={`video/${extension}`} />
                                            المتصفح لا يدعم تشغيل هذا الفيديو.
                                        </video>
                                    )}
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            )}



            {/* Reactions Count */}
            <div className="flex justify-between items-center text-sm text-gray-500  py-2">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-thumbs-up text-blue-600" />
                    {/* <span>{Post.PostData.likes}</span> */}
                </div>
                <div className="flex gap-4">
                    {/* <span>{Post.PostData.commentsCount} Comments</span> */}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-around mt-1 border-b py-1 text-gray-600 text-sm">
                <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                    <i className="fa-regular fa-thumbs-up"></i> Like
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                    <i className="fa-regular fa-comment"></i> Comment
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                    <i className="fa-solid fa-share"></i> Share
                </button>
            </div>

            {/* Add Comment */}
            <div className="flex items-center gap-3 mt-3">
                <img
                    src={myData?.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full"
                />
                <input
                    type="text"
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                    placeholder="Write a comment..."
                />
            </div>
        </div>

    )
}
function dispath(arg0: any) {
    throw new Error('Function not implemented.');
}

