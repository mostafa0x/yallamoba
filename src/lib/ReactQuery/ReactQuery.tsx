"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Query = new QueryClient();

export default function ReactQuery({ children }: any) {
    return (
        <QueryClientProvider client={Query}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>

    )
}
