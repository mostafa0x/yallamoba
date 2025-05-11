import React from 'react'
import { PostDataType } from '../../../../InterFaces/StateProfileSlices'
import Slider from 'react-slick'

interface props {
    post: PostDataType
    toggleIsViewPost: (post: PostDataType | null) => void
}

export default function ViewPosts({ post, toggleIsViewPost }: props) {
    return (
        <div className="fixed inset-0 flex items-center backdrop-blur justify-center z-[55] animate-jump-in animate-once"
            style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }} >
            <div className=" relative  p-2 w-[1524px] h-[520px] text-center rounded shadow-lg  max-w-md">
                <h1 className='p-6 mb-4'>{post.body}</h1>
                <Slider
                    dots={true}
                    infinite={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={true}
                >
                    {post.files.map((fileUrl: string, index: number) => {
                        const extension = fileUrl.split('.').pop()?.toLowerCase();
                        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '');
                        const isVideo = ['mp4', 'mov', 'avi'].includes(extension || '');

                        return (
                            <div key={index} className="w-full">
                                {isImage && (
                                    <img
                                        src={fileUrl}
                                        alt={`Post media ${index}`}
                                        className="w-full h-auto max-h-[500px] object-contain rounded items-center"
                                    />
                                )}
                                {isVideo && (
                                    <video
                                        controls
                                        className="w-full max-h-[500px] rounded"
                                    >
                                        <source src={fileUrl} type={`video/${extension}`} />
                                        Not supported video
                                    </video>
                                )}
                            </div>
                        );
                    })}
                </Slider >
                <button className=' btn btn-circle absolute top-2 right-2 text-gray-500 hover:text-gray-700' onClick={() => { toggleIsViewPost(null) }}>X</button>
            </div>
        </div >)
}
