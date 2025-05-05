import React, { useEffect } from 'react'


interface props {
    errorMes: string
    CloseErrorPopup: any
}

export default function ErrorPopup({ errorMes, CloseErrorPopup }: props) {

    useEffect(() => {

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }

    }, []);

    return (
        <div className="fixed inset-0 flex items-center backdrop-blur justify-center z-[55] animate-jump-in animate-once"
            style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }} >
            <div className="bg-white p-2 w-80 h-42 text-center rounded shadow-lg  max-w-md">
                <h1 className='p-6 mb-4'>{errorMes}</h1>
                <button onClick={() => CloseErrorPopup()} className='btn btn-info' >Cloes</button>
            </div>
        </div >
    )



}
