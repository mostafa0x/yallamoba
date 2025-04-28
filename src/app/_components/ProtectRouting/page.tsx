import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../../InterFaces/StateFaces'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeUserToken, ChangeUserData, ChangeUserLoading } from '@/lib/UserSlices'
import SpinnerLoader from '../SpinnerLoader/page'
import { toast } from 'react-toastify'

export default function ProtectRouting({ children }: any) {
    const Router = useRouter()
    const Path = usePathname()
    const { UserToken, UserData, UserLoading } = useSelector((state: StateFaces) => state.UserReducer)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const localToken = localStorage.getItem("UserToken");
    //     const localData = localStorage.getItem("UserData");

    //     if (localToken) {
    //         dispatch(ChangeUserLoading(true));
    //         dispatch(ChangeUserToken(localToken));

    //         if (localData) {
    //             try {
    //                 const userDataJSON = JSON.parse(localData);
    //                 dispatch(ChangeUserData(userDataJSON));
    //             } catch (error) {
    //                 console.error("Failed to parse user data:", error);
    //             }
    //         }

    //         dispatch(ChangeUserLoading(false));
    //     }
    //     if (!localToken) {
    //         dispatch(ChangeUserLoading(false));

    //     }
    // }, []);


    useEffect(() => {
        const localToken = localStorage.getItem("UserToken");
        const localData = localStorage.getItem("UserData");

        if (localToken) {
            dispatch(ChangeUserLoading(true));
            dispatch(ChangeUserToken(localToken));

            if (localData) {
                try {
                    const userDataJSON = JSON.parse(localData);
                    dispatch(ChangeUserData(userDataJSON));
                } catch (error) {
                    console.error("Failed to parse user data:", error);
                }
            }

            dispatch(ChangeUserLoading(false));
        }
        if (!localToken) {
            dispatch(ChangeUserLoading(false));

        }

        if (localToken) {
            if (!localData) {
                toast.error("An error occurred")
                dispatch(ChangeUserToken(null))
                dispatch(ChangeUserData(null))
                localStorage.removeItem("UserToken")
                Router.push("/signin")
            }
        }

        if (Path === "/profile") {
            if (!localToken) {
                Router.push("/signin")
            }
        }
        if (Path === "/signup" || Path === "/signin") {
            if (localToken) {
                Router.push("/")

            }
        }

    }, [Path, UserToken, UserLoading])

    if (UserLoading) {
        return <SpinnerLoader />
    }

    return <div>
        {children}
    </div>
}
