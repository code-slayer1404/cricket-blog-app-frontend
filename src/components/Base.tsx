import Header from '@/components/Header'
import React from 'react'
// eslint-disable-next-line no-unused-vars

interface BaseProps{
    children? : React.ReactNode;
    title? : string;

}

export default function Base({ children,title,}: BaseProps) {

    return (
        <>
            <Header></Header>
            <div className='content'>
                {children}
            </div>
        </>
    )
}