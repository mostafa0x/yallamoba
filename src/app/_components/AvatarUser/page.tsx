import React from 'react'
import { StateProfileSlices } from '../../../../InterFaces/StateProfileSlices'


type Props = {
    Avatar: string | null | undefined
    Size: {
        Width: number
        , higth: number
    }
}

export default function AvatarUser({ Avatar, Size }: Props) {
    return (
        <img className={`rounded-full w-${Size.Width} h-${Size.higth} object-fill`}
            alt="User Avatar"
            src={Avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s"} />
    )
}
