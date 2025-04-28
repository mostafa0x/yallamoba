import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../../InterFaces/StateFaces'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeUserToken, ChangeUserData } from '@/lib/UserSlices'

export default function ProtectRouting({ children }: any) {
    const Router = useRouter()
    const Path = usePathname()
    const { UserToken, UserData } = useSelector((state: StateFaces) => state.UserReducer)
    const Dispath = useDispatch()

    useEffect(() => {

        if (localStorage.getItem("UserToken")) {

            Dispath(ChangeUserToken(localStorage.getItem("UserToken")))

            if (localStorage.getItem("UserData")) {
                const UserDataJSON = JSON.parse(localStorage.getItem("UserData") ?? "")
                Dispath(ChangeUserData(UserDataJSON))
            }
        }

    }, [])

    useEffect(() => {
        if (localStorage.getItem("UserToken")) {
            if (!localStorage.getItem("UserData")) {
                Dispath(ChangeUserToken(null))
                Dispath(ChangeUserData(null))
                localStorage.removeItem("UserToken")
                Router.push("/signin")
            }
        }

        if (Path === "/profile") {
            if (!UserToken) {
                Router.push("/signin")
            }
        }
        if (Path === "/signup" || Path === "/signin") {
            if (UserToken) {
                Router.push("/")
            }
        }

    }, [Path, UserToken, UserData])



    return <div>
        {children}
    </div>
}
