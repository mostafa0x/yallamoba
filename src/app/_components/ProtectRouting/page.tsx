import React, { MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../../InterFaces/StateFaces'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ChangeUserToken, ChangeUserData, ChangeUserLoading, logOut, ChangeCashPosts } from '@/lib/UserSlices'
import SpinnerLoader from '../SpinnerLoader/page'
import { toast } from 'react-toastify'
import { PostDataType } from '../../../../InterFaces/StateProfileSlices'

export default function ProtectRouting({ children }: any) {
    const Router = useRouter()
    const Path = usePathname()
    const { UID } = useParams()
    const { UserToken, UserData, UserLoading } = useSelector((state: StateFaces) => state.UserReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        const localToken = localStorage.getItem("UserToken");
        const localData = localStorage.getItem("UserData");
        const localPosts = localStorage.getItem("UserPosts");

        if (localPosts) {
            const parsedPosts: PostDataType[] = JSON.parse(localPosts);
            parsedPosts.length <= 0 ? localStorage.removeItem("UserPosts") : dispatch(ChangeCashPosts(JSON.parse(localPosts)))
        } else {
            //empty 
        }

        if (localToken == "null") {
            localStorage.removeItem("UserToken")
            localStorage.removeItem("UserData")
            localStorage.removeItem("UserPosts")
            dispatch(logOut(null))
        }
        if (localToken) {

            dispatch(ChangeUserLoading(true));
            dispatch(ChangeUserToken(localToken));

            if (localData) {
                if (localData == "null") {
                    dispatch(logOut(null))
                    return
                }
                try {

                    const userDataJSON = JSON.parse(localData);
                    dispatch(ChangeUserData(userDataJSON));


                } catch (error) {
                    toast.error("Something error , login ")
                    console.error("Failed to parse user data:", error);
                    dispatch(logOut(null))
                }
            }

            dispatch(ChangeUserLoading(false));
        }
        if (!localToken) {
            localStorage.removeItem("UserToken")
            localStorage.removeItem("UserData")
            localStorage.removeItem("UserPosts")
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

        if (Path === `/profile/${UID}`) {
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
