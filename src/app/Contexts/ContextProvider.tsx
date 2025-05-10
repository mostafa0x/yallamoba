"use client"
import React, { createContext, useContext, useState } from "react";
import { ProfileContextProvider } from "./ProfileContext";

export const Context = createContext<any>(null);
export const ContextProvider = ({ children }: any) => {

    return (
        <Context.Provider value={{}}>
            <ProfileContextProvider>{children}</ProfileContextProvider>
        </Context.Provider>
    )
}