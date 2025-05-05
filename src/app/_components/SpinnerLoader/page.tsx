import React from "react";
import MainLogo from "../MainLogo/page";
import { PulseLoader } from "react-spinners"
import Image from "next/image";
const SpinnerLoader = () => {


    return (
        <div className="flex justify-center items-center mt-42 flex-col text-center  animate-bounce animate-infinite animate-duration-[2000ms] animate-ease-linear">
            {/* <MainLogo size={"text-8xl"} /> */}
            <Image src={"/Loading.gif"} alt="Loading" width={224} height={224} />
            {/* <h1 className="text-2xl font-bold opacity-60">Loading....</h1> */}
            <PulseLoader className="opacity-60 mt-1"
                loading
                margin={5}
                size={15}
                speedMultiplier={1}
            />

        </div>
    )
}

export default SpinnerLoader;