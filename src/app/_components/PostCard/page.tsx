import React from 'react'

export default function PostCard() {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">PLayer Name</p>
                        <p className="text-sm text-gray-500">2 hours ago · <i className="fa-solid fa-earth-americas" /></p>
                    </div>
                </div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=""> <i className="fa-solid fa-ellipsis cursor-pointer text-gray-500 hover:text-gray-700" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 gap-3 w-52 p-2 shadow-sm">
                        <li><a><i className="fa-solid fa-pen"></i>Edit</a></li>
                        <li><a className='text-red-500 '><i className="fa-solid fa-trash"></i> Delete</a></li>
                    </ul>
                </div>
            </div>

            {/* Body text */}
            <p className="mb-3 text-gray-800">
                Just had the best time at the beach 🌊☀️ Can’t wait to go back!
            </p>

            {/* Media (Image or Video) */}
            <div className="rounded-lg overflow-hidden mb-3">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                    alt="Post"
                    className="w-full h-auto max-h-[400px] object-cover"
                />
                {/* لو عايز تحط فيديو بدل الصورة:
    <video controls className="w-full rounded-lg">
      <source src="your-video-url.mp4" type="video/mp4" />
    </video> */}
            </div>

            {/* Reactions Count */}
            <div className="flex justify-between items-center text-sm text-gray-500  py-2">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-thumbs-up text-blue-600" />
                    <span>150</span>
                </div>
                <div className="flex gap-4">
                    <span>45 Comments</span>
                    <span>10 Shares</span>
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User"
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
