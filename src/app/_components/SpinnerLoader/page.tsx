import React from "react";

const SpinnerLoader = () => {


    return (
        <div className="flex justify-center items-center mt-42 flex-col text-center  animate-bounce animate-infinite">
            <i className="fa-solid fa-gamepad text-8xl text-blue-600" />
            <h1 className="text-2xl font-bold opacity-60">Loading....</h1>
        </div>
    )
}

export default SpinnerLoader;