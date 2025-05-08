import React from 'react'
import { UserDataType } from '../../../../InterFaces/StateUserSlices'

type props = {
    toggleAddPostModal: (type: number) => void
    UserData: UserDataType
}

export default function page({ toggleAddPostModal, UserData }: props) {

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-4 border-b border-gray-300 pb-3">
                <div className="w-12 h-12">
                    <img
                        className="rounded-full w-full h-full object-cover"
                        alt="User Avatar"
                        src={UserData?.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"} />

                </div>
                <input onClick={() => toggleAddPostModal(1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-300 text-sm px-4 py-2 rounded-full outline-none cursor-pointer"
                    type="text"
                    placeholder="What's on your mind?"
                    readOnly
                />
            </div>

            <div className="flex justify-between items-center mt-3 px-2 text-sm text-gray-600">
                {/* <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <i className="fa-solid fa-video text-red-500" />
            <span>Live Video</span>
        </button> */}
                <button onClick={() => toggleAddPostModal(1)} className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-image text-green-500" />
                    <span>Photo/Video</span>
                </button>
                {/* <button className="flex items-center gap-2 btn btn-ghost hover:bg-gray-300 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Post</span>
                </button> */}
            </div>
        </div>

    )
}
