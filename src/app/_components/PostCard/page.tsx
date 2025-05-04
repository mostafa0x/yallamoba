import React from 'react'
import { StateUserData, TypeRole } from '../../../../InterFaces/StateUserSlices'
import { postData, StatePostData } from '../../../../InterFaces/StatePostsSlices';
import { ProfileData } from '@/app/profile/[UID]/page';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import { StateFaces } from '../../../../InterFaces/StateFaces';
import axios from 'axios';
dayjs.extend(relativeTime);

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
    const headers: any = {
        authorization: `Bearer ${UserToken}`
    }

    async function DeletePost(postID: number) {

        try {
            const data = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postID}`, { headers })
            console.log(data);


        } catch (err) {
            console.log(err);

        }
    }

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
                {myProfile ? <div className="dropdown">
                    <div tabIndex={0} role="button" className=""> <i className="fa-solid fa-ellipsis cursor-pointer text-gray-500 hover:text-gray-700" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 gap-3 w-52 p-2 shadow-sm">
                        <li><a><i className="fa-solid fa-pen"></i>Edit</a></li>
                        <li onClick={() => DeletePost(Post.id)}><a className='text-red-500 '><i className="fa-solid fa-trash"></i> Delete</a></li>
                    </ul>
                </div> : null}
            </div>

            {/* Body text */}
            <p className="mb-3 text-gray-800">
                {Post?.body}
            </p>

            {/* Media (Image or Video) */}
            <div className="rounded-lg overflow-hidden mb-3">
                {Post?.files?.length > 0 ? <img
                    src={Post.files[0]}
                    alt="Post"
                    className="w-full h-auto max-h-[400px] object-cover"
                /> : null}

                {/* لو عايز تحط فيديو بدل الصورة:
    <video controls className="w-full rounded-lg">
      <source src="your-video-url.mp4" type="video/mp4" />
    </video> */}
            </div>

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
