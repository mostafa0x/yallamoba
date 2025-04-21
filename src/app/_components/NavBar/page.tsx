import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export default function NavBar() {
    const Path = usePathname();

    useEffect(() => {
        console.log(Path);
    }, []);

    return (
        <div className="relative flex items-center justify-between pb-1 mt-2 px-6 bg-white shadow-md border-b-2 border-gray-200">
            <div className="flex items-center gap-4 flex-1">
                <Link href={"/"}><i className="fa-solid fa-gamepad text-3xl text-blue-600" /></Link>
                <input
                    type="text"
                    className="input input-bordered input-sm w-64"
                    placeholder="Search Yalla Moba"
                />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 text-gray-600 text-2xl">
                <div className={`flex justify-center ${Path === "/" ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} pt-2 pb-1 w-22`}>
                    <Link href={"/"}><i className="fa-solid fa-house hover:text-blue-600 cursor-pointer" /> </Link>
                </div>
                <div className={`flex justify-center ${Path === "/watch" ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} pt-2 pb-1 w-22`}>
                    <Link href={"/watch"}><i className="fa-solid fa-film hover:text-blue-600 cursor-pointer" />
                    </Link>
                </div>
                {/* <div className={`flex justify-center ${Path === "/friends" ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} pt-2 pb-1 w-22`}>
                    <i className="fa-solid fa-users hover:text-blue-600 cursor-pointer" />
                </div>
                <div className={`flex justify-center ${Path === "/store" ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} pt-2 pb-1 w-22`}>
                    <i className="fa-solid fa-store hover:text-blue-600 cursor-pointer" />
                </div> */}
            </div>


            <div className="flex items-center gap-6 flex-1 justify-end">
                <button className="btn btn-circle btn-ghost text-2xl hover:text-blue-600 cursor-pointer">
                    <i className="fa-solid fa-bell"></i>
                </button>
                <button className="btn btn-circle btn-ghost text-2xl hover:text-blue-600 cursor-pointer">
                    <i className="fa-solid fa-user-circle" />
                </button>
            </div>
        </div>
    );
}
