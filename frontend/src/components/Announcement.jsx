'use client'

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import SimpleInformationModal from "./Modals/Information/SimpleInformationModal";
const axios = require('axios');
const AnnouncementComponent = ()=>{

    const { user }= useContext(UserContext)
    const [content ,setContent] = useState()
    const [showInfoModal,setShowInfoModal] = useState(false)
    const [message,setMessage] = useState()
    const [announcement ,setAnnouncement] = useState()
    useEffect(()=>{

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getAnnouncement/'+sessionStorage.getItem('selectedSemester'))
            .then((res) =>{
                setAnnouncement(res.data)
            }
        )

    })

    const handleInsertAnnouncement = ()=>{
        if(content ==""||!content){
            setMessage("Input the announcement's content")
        }else {
            const data = {
                initial : sessionStorage.getItem('initial'),
                semesterid : sessionStorage.getItem('selectedSemester'),
                announcementcontent : content
            }
    
            axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/insertAnnouncement', data)
            .then((res) =>{
                console.log(res)
                if(res.data== 'Success'){
                    setShowInfoModal(true)
                    
                }
            })

        }
    }

    const refresh = ()=>{
        window.location.reload();
    }

    if(!user) return <div></div>
    else {
        if(!(user.roleid.includes("RL006") || user.roleid.includes("RL005"))) 
        return <div className="card w-full bg-base-100 max-h-screen shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Announcement</h2>
                        <div className="overflow-y-auto">
                            <div className="card bg-gray-100 p-5 h-fit gap-2 max-h-96 overflow-y-auto">
                                <div className="flex gap-2">
                                    <label>Announcement 1</label>
                                    
                                </div>
                                <label className= "text-end">- SX22-1</label>
                            </div> 
                        </div>
                    </div>  
                </div>
        else return(
            <div className="card w-full bg-base-100 max-h-screen shadow-xl">
                {showInfoModal && (
                    <SimpleInformationModal
                        title = "Success"
                        message = "You have successfully added a new announcement !"
                        onConfirm = {refresh}
                    />
                )}
                <div className="card-body">
                    <h2 className="card-title">Announcement</h2>
                    <div className="overflow-y-auto">
                        {announcement && (<div >
                            {announcement.map((a,index)=>{
                                return <div className="card mt-5 bg-gray-100 p-5 h-fit gap-2 max-h-96 overflow-y-auto">
                                    <div className="flex gap-2">
                                        <label>{a.announcementcontent}</label>
                                    </div>
                                    <label className= "min-w-full text-end self-end justify-end">- {a.initial}</label>
                                </div>
                            })
                            }
                            
                        </div> )}
                    </div>

                    <div>
                        <div className="card bg-base-200 p-2 h-fit gap-2 max-h-96 overflow-y-auto">
                            <div className="flex gap-2">
                                <textarea className="textarea-md w-full m-2 h-28 border rounded resize-none bg-white" 
                                placeholder="Announcement Content here.." onChange={(e)=>{setContent(e.target.value)}}></textarea>
                            </div>
                        </div>   
                    </div>
                    {message && 
                    <div id="toast-danger" className="toast toast-danger mr-7 z-50 flex flex-row items-center w-full max-w-xs p-4 mb-7 text-gray-500 bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">                 
                            <div className="ml-3 font-normal text-white text-lg">{message}</div>
                            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-red-400" data-dismiss-target="#toast-danger" aria-label="Close" onClick={()=>{setMessage("")}}>
                                <span className="sr-only">Close</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>}
                    <div className="card-actions justify-end mt-2">
                        <button className="btn btn-primary" onClick={handleInsertAnnouncement}>Insert New Announcement</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnnouncementComponent;