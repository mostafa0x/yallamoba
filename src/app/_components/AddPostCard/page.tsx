import { Formik, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../../InterFaces/StateFaces';
import axios, { AxiosError } from 'axios';
import * as yup from "yup"
import { Id, toast } from 'react-toastify';
import ErrorPopup from '../ErrorPopup/page';
import { AddToUserPosts } from '@/lib/UserSlices';
import CashUserPosts from '@/app/_Functions/CashUserPosts';

type formValues = {
    body: string,
    files: File | string
}

export default function AddPostCard({ toggleAddPostModal }: any) {
    const [files, setFiles] = useState<File[]>([]);
    const [errorPopup, seterrorPopup] = useState<string | null>(null)
    const [btnPostLoading, setbtnPostLoading] = useState(false)
    const errorToastRef = useRef<Id | null>(null)

    const { UserData, UserToken, UserPosts } = useSelector((state: StateFaces) => state.UserReducer)
    const dispath = useDispatch()
    const headers: any = {
        authorization: `Bearer ${UserToken}`
    }

    async function ReqAddPost(fromdata: any) {
        console.log(fromdata);
        setbtnPostLoading(true)
        try {
            const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, fromdata, { headers })
            dispath(AddToUserPosts(data.data.newPost))
            toast.success("The post has been added successfully.")
            CashUserPosts(data.data.newPost)
            toggleAddPostModal(-1)
        } catch (err: any) {
            console.log(err);
            toast.error("Error while adding post")
            seterrorPopup(err.response.data.error)

        } finally {
            setbtnPostLoading(false)
        }
    }

    function CloseErrorPopup() {
        seterrorPopup(null)
    }
    function handleAddPost(formValues: formValues) {
        const fromdata = new FormData()
        fromdata.append("body", formValues.body)
        if (Array.isArray(formValues.files)) {
            formValues.files.forEach((file: File) => {
                fromdata.append("files", file);
            });
        } ReqAddPost(fromdata)

    }
    const validationSchema = yup.object().shape({
        body: yup.string().required("Body field is required"),
    })
    const Formik = useFormik({
        initialValues: {
            body: "",
            files: ""
        }, validationSchema, onSubmit: handleAddPost
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            Formik.setFieldValue("files", selectedFiles)
        }
    };

    function showBodyError() {
        if (errorToastRef.current) {
            toast.dismiss(errorToastRef.current)
            errorToastRef.current = null
        }
        if (Formik.errors.body) {
            errorToastRef.current = toast.error(Formik.errors.body)
        }
    }



    return (
        <>
            {errorPopup ? <ErrorPopup errorMes={errorPopup} CloseErrorPopup={CloseErrorPopup} /> : null}
            <div className="fixed inset-0 flex items-center backdrop-blur justify-center z-50 animate-fade animate-once"
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
                    <div className="flex  ">
                        <label htmlFor="file-upload" className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-image text-green-500" />
                            <span>Photo/Video</span>
                        </label>
                        <input
                            multiple
                            name="files"
                            id="file-upload"
                            type="file"
                            accept=".png,.jpg,.jpeg,.gif,.mp4,.mov,.avi"
                            className="hidden"
                            onChange={handleFileChange}

                        />
                        <h1 className='pt-5  opacity-80'>{files.map((file: File, index: number) => {
                            return <p key={index} style={{ fontSize: '10px' }}>{file.name}</p>
                        })}</h1>
                    </div>
                    <div className="flex justify-between mt-6">

                        <button
                            onClick={() => {
                                toggleAddPostModal(-1)
                                Formik.resetForm()
                            }
                            }
                            className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
                        >
                            close
                        </button>
                        {btnPostLoading ? <span className="loading loading-dots loading-xl"></span>
                            : <button
                                onClick={() => {
                                    showBodyError()
                                    Formik.handleSubmit()
                                }}
                                type="button"

                                className="px-4 py-2 cursor-pointer bg-green-500 rounded hover:bg-green-800"
                            >
                                Post
                            </button>}

                    </div>
                </div>
            </div >
        </>
    )


}
