"use client"

export const isAuth = (req, res, next) =>{

    if(!(sessionStorage.getItem('initial'))){
        return false
    }else{
        return true
    }
}