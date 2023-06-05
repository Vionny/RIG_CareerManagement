"use client"
import React, { createContext, useEffect, useState } from 'react';
const axios = require('axios');
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL +'/getUser/'+sessionStorage.getItem('initial')).then((res)=>{
            setUser(res.data[0])
        })
    }, [user])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
