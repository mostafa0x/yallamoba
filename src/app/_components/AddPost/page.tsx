import React from 'react'

export default function page(props: any) {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-4 border-b border-gray-300 pb-3">
                <div className="w-12 h-12">
                    <img
                        className="rounded-full w-full h-full object-cover"
                        alt="User Avatar"
                        src={props.UserData.Avatar ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    />
                </div>
                <input
                    className="flex-1 bg-gray-100 hover:bg-gray-300 text-sm px-4 py-2 rounded-full outline-none cursor-pointer"
                    type="text"
                    placeholder="What's on your mind?"
                />
            </div>

            <div className="flex justify-between items-center mt-3 px-2 text-sm text-gray-600">
                {/* <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <i className="fa-solid fa-video text-red-500" />
            <span>Live Video</span>
        </button> */}
                <button className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-image text-green-500" />
                    <span>Photo/Video</span>
                </button>
                <button className="flex items-center gap-2 btn btn-ghost hover:bg-gray-300 p-2 rounded cursor-pointer">
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Post</span>
                </button>
            </div>
        </div>
    )
}
