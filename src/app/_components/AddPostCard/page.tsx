import { AddPostTouserPost } from '@/lib/PostsSlices';
import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StatePostData } from '../../../../InterFaces/StatePostsSlices';
import { StateFaces } from '../../../../InterFaces/StateFaces';
type formValues = {
    body: string,
    files: File | string
}

export default function AddPostCard(props: any) {
    const [files, setFiles] = useState<File[]>([]);
    const { UserData } = useSelector((state: StateFaces) => state.UserReducer)
    const dispath = useDispatch()
    function handleAddPost(formValues: formValues) {
        props.SetFromChild()
        console.log(formValues);
        const fromdata = new FormData()
        fromdata.append("body", formValues.body)
        fromdata.append("files", formValues.files)

        const FinalData: StatePostData = {
            OwenData: {
                userName: UserData?.username ?? "",
                avatar: UserData?.avatar ?? "",
                UID: ""
            }, PostData: {
                body: formValues.body,
                files: formValues.files,
                likes: 0,
                commentsCount: 0,
                commentsBody: ""
            }
        }
        console.log(FinalData);

        dispath(AddPostTouserPost(FinalData))
    }
    const Formik = useFormik({
        initialValues: {
            body: "",
            files: ""
        }, onSubmit: handleAddPost
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            Formik.setFieldValue("files", selectedFiles)
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
                    name='body'
                    value={Formik.values.body}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
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
                        name="files"
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
                        onClick={() => Formik.handleSubmit()}
                        type="button"

                        className="px-4 py-2 cursor-pointer bg-green-500 rounded hover:bg-green-800"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div >
    )


}
