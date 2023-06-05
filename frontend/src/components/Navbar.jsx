"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
const axios = require("axios")

const Navbar = () => {

  const [semesters,setSemester] = useState({})
  const [loadSem,setLoadSem] = useState(false)
  const [initial,setInitial] = useState("Profile Name")
    
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllSemester').then((res) => {
      // console.log(res.data)
      setSemester(res.data)
      setLoadSem(true)
    })
  },[!loadSem])


  useEffect(() => {
    // Get initial data from session storage
    const initialData = sessionStorage.getItem('initial');
    setInitial(initialData);
    // console.log('Initial data:', initialData);
  }, []);

  if(loadSem){
    return (
      <div className="navbar bg-base-100 drop-shadow-md ">
        <div className="navbar-start ">
          <a className="btn btn-ghost normal-case text-lg h-8" href="/home">Career Management</a>
        </div>
  
        <div className=" navbar-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Division</Link>
            </li>
            <li>
              <Link href="/promotion/register">Promotion</Link>
            </li>
            <li>
              <Link href="/career/inputChoice">Career Choice</Link>
            </li>
          </ul>
        </div>
  
        <div className="navbar-end">
          <div className="dropdown  dropdown-hover">
            <label tabIndex={0} className="btn btn-ghost normal-case text-base w-40">Hi, {initial}
             </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50">
              <li className="z-50"><Link href="/" className="h-8">Logout</Link></li>
            </ul>
           </div>
  
  
           <div className="btn btn-ghost">
              <select className="normal-case text-base bg-base-100">
                {
                  semesters.map((sem,index)=>{
                    return(<option key={index}>{sem.semestername}</option>)
                  })
                }
              </select>
          </div>
           
        </div>
      </div>
    );
  }else{
    return <div></div>
  }
  
};
export default Navbar;
