import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StateFaces } from '../../../../InterFaces/StateFaces'
import { usePathname, useRouter } from 'next/navigation'

export default function ProtectRouting({ children }: any) {
    const Router = useRouter()
    const Path = usePathname()
    const { UserToken, UserData } = useSelector((state: StateFaces) => state.UserReducer)

    useEffect(() => {

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

    }, [Path])


    return <div>
        {children}
    </div>
}
