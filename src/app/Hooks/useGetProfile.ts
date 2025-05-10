"use client";
import { useParams } from "next/navigation";
import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateFaces } from "../../../InterFaces/StateFaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SetProfileData } from "@/lib/ProfileSlices";
import { Id, toast } from "react-toastify";
import { ChangeUserPosts } from "@/lib/UserSlices";
import FillUserState from "../_Functions/FillUserState";
import { ProfileContext } from "../Contexts/ProfileContext";

export default function useGetProfile() {
  const { UID } = useParams();
  const dispath = useDispatch();
  const errorToast = useRef<Id | null>(null);
  const { UserToken, UserData, headers } = useSelector(
    (state: StateFaces) => state.UserReducer
  );

  const GetProfile = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${UID}`,
        { headers }
      );
      dispath(SetProfileData(data.data));
      if (UserData?.UID === UID) {
        dispath(ChangeUserPosts(data.data.ownerPosts));
        FillUserState(data.data, dispath);
      }
      return data.data;
    } catch (err: any) {
      if (errorToast.current) toast.dismiss(errorToast.current);
      errorToast.current = toast.error(
        err.message === "Network Error"
          ? "Network Error"
          : err.response?.data?.error || "Unknown Error"
      );
      throw err;
    }
  };

  const query = useQuery({
    queryKey: ["profile", UID],
    queryFn: GetProfile,
    enabled: !!UID && !!headers,
  });

  return query;
}
