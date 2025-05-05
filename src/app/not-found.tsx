import Image from 'next/image'
import React from 'react'

export default function Notfound() {
    return (
        <div className="flex justify-center items-center ">
            <div style={{ position: "relative", width: "100vw", height: "90vh" }}>
                <Image
                    src="/NotFound.gif"
                    alt="Not Found"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
            <h1 className="absolute top-70 left-[900px] text-black text-4xl font-bold animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-linear">
                Page not found

            </h1>
        </div>



    )
}
