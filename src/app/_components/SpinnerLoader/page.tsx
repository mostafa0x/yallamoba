import React from "react";
import MainLogo from "../MainLogo/page";

const SpinnerLoader = () => {


    return (
        <div className="flex justify-center items-center mt-42 flex-col text-center  animate-bounce animate-infinite">
            <MainLogo size={"text-8xl"} />
            <h1 className="text-2xl font-bold opacity-60">Loading....</h1>
        </div>
    )
}

export default SpinnerLoader;