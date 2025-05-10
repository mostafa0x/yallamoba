"use client"
import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

interface ProfileContextType {
    isAddPostModalVisible: boolean;
    isPostLoading: boolean;
    isMyProfile: boolean;
    isPageLoading: boolean;
    isEditProfileEnabled: boolean;
    toggleProfileEdit: (type: number) => void;
    toggleAddPostModal: (type: number) => void;
    toggleIsMyProfile: (type: number) => void;
    toggleIsPageLoading: (type: number) => void;
    toggleIsPostLoading: (type: number) => void;

};

export const ProfileContext = createContext<ProfileContextType>({
    isAddPostModalVisible: false,
    isPostLoading: true,
    isMyProfile: false,
    isPageLoading: true,
    isEditProfileEnabled: false,

    toggleProfileEdit: (type: number) => { },
    toggleAddPostModal: (type: number) => { },
    toggleIsMyProfile: (type: number) => { },
    toggleIsPageLoading: (type: number) => { },
    toggleIsPostLoading: (type: number) => { },

});


export function ProfileContextProvider({ children }: any) {
    const [isAddPostModalVisible, setIsAddPostModalVisible] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isEditProfileEnabled, setIsEditProfileEnabled] = useState(false);



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
        toggleProfileEdit,
        toggleAddPostModal,
        toggleIsMyProfile,
        toggleIsPostLoading,
        toggleIsPageLoading,
    }}>{children}</ProfileContext.Provider>
}