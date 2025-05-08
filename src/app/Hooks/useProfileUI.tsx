import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function useProfileUI() {
  const [isAddPostModalVisible, setIsAddPostModalVisible] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isEditProfileEnabled, setIsEditProfileEnabled] = useState(false);
  const { UID } = useParams();

  const toggleAddPostModal = (type: number) => {
    type === 1
      ? setIsAddPostModalVisible(true)
      : setIsAddPostModalVisible(false);
  };
  const toggleProfileEdit = (type: number) => {
    type === 1 ? setIsEditProfileEnabled(true) : setIsEditProfileEnabled(false)
  }
  const toggleIsMyProfile = (type: number) => {
    type === 1 ? setIsMyProfile(true) : setIsMyProfile(false)
  }
  const toggleIsPostLoading = (type: number) => {
    type === 1 ? setIsPostLoading(true) : setIsPostLoading(false)
  }
  const toggleIsPageLoading = (type: number) => {
    type === 1 ? setIsPageLoading(true) : setIsPageLoading(false)
  }
  useEffect(() => {
    if (isAddPostModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAddPostModalVisible, setIsAddPostModalVisible]);

  useEffect(() => {

    return () => {
      setIsPostLoading(true)
      setIsPageLoading(true)
      setIsEditProfileEnabled(false)
      setIsMyProfile(false)
      setIsAddPostModalVisible(false)
    }
  }, [])
  return (
    {
      isAddPostModalVisible,
      toggleAddPostModal,
      isPostLoading,
      toggleIsPostLoading,
      isMyProfile,
      toggleIsMyProfile,
      isPageLoading,
      toggleIsPageLoading,
      isEditProfileEnabled,
      toggleProfileEdit,
      UID
    }
  )
}
