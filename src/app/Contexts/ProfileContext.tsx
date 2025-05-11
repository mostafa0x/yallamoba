"use client"
import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import { PostDataType } from "../../../InterFaces/StateProfileSlices";

interface ProfileContextType {
    isAddPostModalVisible: boolean;
    isPostLoading: boolean;
    isMyProfile: boolean;
    isPageLoading: boolean;
    isEditProfileEnabled: boolean;
    isViewPost: PostDataType | null
    toggleProfileEdit: (type: number) => void;
    toggleAddPostModal: (type: number) => void;
    toggleIsMyProfile: (type: number) => void;
    toggleIsPageLoading: (type: number) => void;
    toggleIsPostLoading: (type: number) => void;
    toggleIsViewPost: (post: PostDataType | null) => void;

};

export const ProfileContext = createContext<ProfileContextType>({
    isAddPostModalVisible: false,
    isPostLoading: true,
    isMyProfile: false,
    isPageLoading: true,
    isEditProfileEnabled: false,
    isViewPost: null,

    toggleProfileEdit: (type: number) => { },
    toggleAddPostModal: (type: number) => { },
    toggleIsMyProfile: (type: number) => { },
    toggleIsPageLoading: (type: number) => { },
    toggleIsPostLoading: (type: number) => { },
    toggleIsViewPost: (post: PostDataType | null) => { },

});


export function ProfileContextProvider({ children }: any) {
    const [isAddPostModalVisible, setIsAddPostModalVisible] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isEditProfileEnabled, setIsEditProfileEnabled] = useState(false);
    const [isViewPost, setIsViewPost] = useState<PostDataType | null>(null);


    const toggleIsViewPost = (post: PostDataType |null) => {
        setIsViewPost(post)
    };
    const toggleAddPostModal = (type: number) => {
        type === 1
            ? setIsAddPostModalVisible(true)
            : setIsAddPostModalVisible(false);
    };
    const toggleProfileEdit = (type: number) => {
        type === 1 ? setIsEditProfileEnabled(true) : setIsEditProfileEnabled(false);
    };
    const toggleIsMyProfile = (type: number) => {
        type == 1 ? setIsMyProfile(true) : setIsMyProfile(false);
    };
    const toggleIsPostLoading = (type: number) => {
        type === 1 ? setIsPostLoading(true) : setIsPostLoading(false);
    };
    const toggleIsPageLoading = (type: number) => {
        type == 1 ? setIsPageLoading(true) : setIsPageLoading(false);
    };
    useEffect(() => {
        if (isAddPostModalVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isAddPostModalVisible, setIsAddPostModalVisible]);




    return <ProfileContext.Provider value={{
        isAddPostModalVisible,
        isPostLoading,
        isMyProfile,
        isPageLoading,
        isEditProfileEnabled,
        isViewPost,
        toggleProfileEdit,
        toggleAddPostModal,
        toggleIsMyProfile,
        toggleIsPostLoading,
        toggleIsPageLoading,
        toggleIsViewPost,
    }}>{children}</ProfileContext.Provider>
}