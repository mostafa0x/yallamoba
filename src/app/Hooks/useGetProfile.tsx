'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFaces } from '../../../InterFaces/StateFaces'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SetProfileData } from '@/lib/ProfileSlices'
import { toast } from 'react-toastify'
import { ChangeUserPosts } from '@/lib/UserSlices'
import FillUserState from '../_Functions/FillUserState'
import useProfileUI from './useProfileUI'
import { log } from 'console'

export default function useGetProfile() {
    const { UID } = useParams()
    const dispath = useDispatch()
    const { UserToken, UserData, headers } = useSelector((state: StateFaces) => state.UserReducer)
    const GetProfile = async () => {
        try {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${UID}`, { headers })
            dispath(SetProfileData(data.data))
            if (UserData?.UID === UID) {
                dispath(ChangeUserPosts(data.data.ownerPosts))
                FillUserState(data.data, dispath)
            }
            return data
        } catch (err: any) {
            if (err.message === "Network Error") {
                console.log(err.message);
                return toast.error("Network Error")

            } else {
                console.log(err.response.data.error);
                return toast.error(err.response.data.error)

            }
        }
    }
    const query = useQuery({ queryKey: ['profile', UID], queryFn: GetProfile, enabled: !!UID && !!headers })


    return query

}
