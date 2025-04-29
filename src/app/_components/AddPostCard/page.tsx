import React, { useEffect, useState } from 'react'

export default function AddPostCard(props: any) {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
        }
    };

    useEffect(() => {
        console.log(files);

    }, [files])

    return (
        <div className="fixed inset-0 flex items-center backdrop-blur justify-center z-50"
            style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }} >
            <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Post</h2>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="What's on your mind?"
                />
                <div className="flex justify-between">
                    <label htmlFor="file-upload" className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer">
                        <i className="fa-solid fa-image text-green-500" />
                        <span>Photo/Video</span>
                    </label>
                    <input
                        multiple
                        id="file-upload"
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileChange}

                    />
                </div>
                <div className="flex justify-between mt-6">

                    <button
                        onClick={() => props.SetFromChild()}
                        className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
                    >
                        close
                    </button>
                    <button
                        onClick={() => props.SetFromChild()}
                        className="px-4 py-2 cursor-pointer bg-green-500 rounded hover:bg-green-800"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div >
    )


}
