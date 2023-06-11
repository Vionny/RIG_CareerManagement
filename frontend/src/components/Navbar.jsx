"use client"
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext} from "./UserContext";
import { useRouter } from "next/navigation";
const axios = require("axios")

const Navbar = () => {

  const [semesters,setSemester] = useState({})
  const [loadSem,setLoadSem] = useState(false)
  const [selectedSem,setSelectedSem] = useState ()
  const { user } = useContext(UserContext);
  const router = useRouter()
  // console.log(user)
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllSemester').then((res) => {
      setSemester(res.data)
      if(sessionStorage.getItem('selectedSemester')==undefined){
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+ '/getCurrSemester').then((res)=>{
          // console.log(res)
          setCurrSemester(res.data[0].semesterid)
          setLoadSem(true)
        })
      }else{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+ '/getSelectedSemester/'+sessionStorage.getItem('selectedSemester')).then((res)=>{
          // console.log(res)
          setSelectedSem(res.data[0])
          setLoadSem(true)
        })
      }
    })
    // console.log()
    
  },[loadSem])

  function setCurrSemester (semesterid){
    // console.log(idid)
    console.log(parent.window.navigation.currentEntry.url)
    const url = parent.window.navigation.currentEntry.url
    const pathname = url.substring(url.indexOf('3000')+4, url.length)
    // console.log(url,pathname)
    setSelectedSem(semesters.find((semester) => semester.semesterid === semesterid))

    console.log(selectedSem)
    sessionStorage.setItem('selectedSemester',semesterid)
    window.location.reload();
  }
  const logoutHandler =()=>{
    sessionStorage.removeItem('selectedSemester')
    sessionStorage.removeItem('initial')
  }

  if(loadSem){
    return (
      <div className="navbar bg-base-100 drop-shadow-md ">
        <div className="navbar-start ">
          <a className="btn btn-ghost normal-case text-lg h-8" href="/home">Career Management</a>
        </div>
  
        <div className=" navbar-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/division">Division</Link>
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
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost normal-case text-base w-40 text-right">Hi, {(user==undefined ? "" : user.initial)}</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
              <li><Link href="/" onClick={logoutHandler} className="h-8">Logout</Link></li>
            </ul>
           </div>
  
  
           <div className="btn btn-ghost">
              <select className="normal-case text-base bg-base-300 p-2" value={selectedSem.semesterid} onChange={(event) => {
                // console.log(event.target.value)
                  setCurrSemester(event.currentTarget.value)
                }}>
                {
                  semesters.map((sem,index)=>{
                      return <option key={index} value={sem.semesterid}>{sem.semestername}</option>
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
