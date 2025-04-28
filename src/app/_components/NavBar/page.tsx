import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateFaces } from '../../../../InterFaces/StateFaces';
import MainLogo from '../MainLogo/page';
import { logOut } from '@/lib/UserSlices';


export default function NavBar() {
    const Path = usePathname();
    const { UserToken, UserData, UserLoading } = useSelector((state: StateFaces) => state.UserReducer)
    const dispath = useDispatch()
    const Router = useRouter()

    return (
        UserLoading ? null : <div className="relative flex items-center justify-between pb-1 mt-2 px-6 bg-white shadow-md border-b-2 border-gray-200 animate-fade-down animate-once">
            <div className="flex items-center gap-4 flex-1">
                <Link href={"/"}><MainLogo size={"text-4xl"} /></Link>
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

            {/*دا الجزء الاخير بيخص صوره البروفيل والاشعارت و شكله بعد التسجيل وقبل */}
            {UserToken ? <div className="flex items-center gap-6 flex-1 justify-end">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost text-2xl hover:text-blue-600 cursor-pointer">                     <i className="fa-solid fa-bell"></i>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>Empty</li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={UserData?.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href={"/profile"}>
                                <i className="justify-between">
                                    Profile
                                </i>
                            </Link>
                        </li>
                        <li><i>Settings</i></li>
                        <li><i onClick={() => {
                            dispath(logOut(null))
                            Router.push("/signin")
                        }}>Logout</i></li>
                    </ul>
                </div>
            </div> : <div className='flex justify-end gap-3 animate-fade-down animate-once'>
                <Link href={"/signin"}><button className='btn btn-primary'>Login</button></Link>
                <Link href={"/signup"}><button className='btn text-white bg-green-500'>Sign up</button></Link>
            </div>}

        </div>
    );
}


