import Image from 'next/image';
import React, { useEffect } from 'react'


interface props {
    LoadingMessage: string
    wigthCard: number

}

export default function LoadingPopup({ LoadingMessage, wigthCard }: props) {

    useEffect(() => {

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }

    }, []);

    return (
        <div className="fixed inset-0 flex items-center backdrop-blur justify-center z-[55] animate-jump-in animate-once"
            style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }} >
            <div className={`flex flex-row bg-white ml-2 p-2 w-[${wigthCard}px] h-42 items-center text-center rounded shadow-lg  max-w-md`}>
                <Image src={"/yzong.gif"} alt='yzong icon' width={120} height={120} unoptimized />
                <h1 className='flex p-6 mb-4 text-center mt-12 text-lg font-semibold flex-row'>{LoadingMessage}  <span className="loading loading-dots loading-sm ml-1"></span>
                </h1>
            </div>
        </div >
    )



}
