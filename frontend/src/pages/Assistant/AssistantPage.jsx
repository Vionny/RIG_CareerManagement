"use client"
import { createAssistantInsertTemplate, createInputAssistantLeaderTemplate } from "@/CSVRelated/TemplateCreate"
import "@/app/globals.css"
// import {useRouter} from 'next/router'
import { EditAssistantModal } from "@/components/Modals/Edit/EditAssistantModal"
import {useEffect, useState} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import SimpleInformationModal from "@/components/Modals/Information/SimpleInformationModal"
import ConfirmationModal from "@/components/Modals/Confirmation/ConfirmationModal";
import Link from "next/link";

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AssistantPage= ()=>{
    // const router = useRouter()

    const [AssistantInputFile, setAssistantInputFile] = useState(null);
    const [LeaderInputFile, setLeaderInputFile] = useState(null);
    const [users, setUsers] = useState();
    const [loadUser, setLoadUser] = useState(false);
    const [selectedAst, setSelectedAst] = useState();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [keyword, setKeyword] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('None');
    const [filtered, setFiltered] = useState(false);
    const [title,setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ast, setAst] = useState('');
    const [selectedId, setSelectedId] = useState();
    

    const [generation, setGeneration] = useState(['None','23-1','22-1','21-1','20-1','19-1','18-1','22-2','21-2','20-2','19-2','18-2'])

    const [showInfoModal,setShowInfoModal] = useState(false);



    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllUser').then((res) => {
            console.log(res.data)
            setUsers(res.data)  
            setLoadUser(true)
        })
        
    },[loadUser])

    useEffect(()=>{
        if(users){
            console.log(users);

            if(selectedOption === "None" && keyword === "") setFiltered(false);
            else if(selectedOption === "None" && keyword !== ""){
                // console.log("no selection optin");
                setFilteredData( users.filter(user => user.initial.toLowerCase().includes(keyword.toLowerCase()) || user.assistantname.toLowerCase().includes(keyword.toLowerCase())) || user.rolename.toLowerCase().includes(keyword.toLowerCase()));
                setFiltered(true);
            }
            else if(selectedOption !== "None" && keyword !== ""){
                // console.log("filter and search");
                setFiltered(true);
                setFilteredData( 
                    users.filter( user => user.initial.toLowerCase().includes(keyword.toLowerCase()) || user.assistantname.toLowerCase().includes(keyword.toLowerCase()) || user.rolename.toLowerCase().includes(keyword.toLowerCase())
                    ).filter((user) => user.initial.includes(selectedOption))
                );
                
            }
            else{              
                setFiltered(true);
                setFilteredData(users.filter(user => user.initial.includes(selectedOption)));

            }
        }
        
    },[keyword, selectedOption])
      
      const handleAssistantFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setAssistantInputFile(selectedFile);
      };
    
      const handleAssistantInsert = async (event) => {
        event.preventDefault();
      
        if (AssistantInputFile) {
          const formData = new FormData();
          formData.append('file', AssistantInputFile);
      
          try {
            await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/readAstLeaderInput', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((res)=>{
                if(res.data.message == 'Success'){
                    setTitle("Success !")
                    setMessage("You have successfully inserted new assistants !")
                    setShowInfoModal(true)
                }
            })
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
      };

      const handleLeaderFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setLeaderInputFile(selectedFile);
      };
    
      const handleLeaderInsert = async (event) => {
        console.log('here')
        event.preventDefault();
      
        if (LeaderInputFile) {
          const formData = new FormData();
          formData.append('file', LeaderInputFile);
      
          try {
            await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/readAstLeaderInput', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((res)=>{
                if(res.data.message == 'Success'){
                    setTitle("Success !")
                    setMessage("You have successfully assistant's leaders !")
                    setShowInfoModal(true)
                }
            })
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
      };
    const refreshPage = ()=>{
        
        setShowInfoModal(false)
        window.location.reload()
    }


    const openModal = (astId) => {
        console.log("open");
        console.log(astId);
        setAst(astId);
        setIsModalOpen(true);
      }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const clickDelete = (astId) =>{
        setShowConfirmModal(true)
        setSelectedAst(astId)
    }

    const handleCancel =()=>{
        setShowConfirmModal(false)
    }

    const deleteAssistant = (astId) =>{
        axios
        .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAssistant/${astId}`)
        .then((res) =>{
            console.log(res)
            if(res.data== 'Success'){

                window.location.reload();
              }
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    console.log(selectedId);

    const selectAst = (astId) =>{

        setSelectedId(astId)
        
    }

    if(!loadUser) return <div></div>
    else
    return(

        <div className="bg-base-200 flex flex-col pl-10 pr-10 py-5 w-full min-h-screen">
            <article className="prose base mb-5">
                <h2>Assistant Management</h2>
            </article>
            {showInfoModal &&(<SimpleInformationModal
                title = {title}
                message= {message}
                onConfirm={refreshPage}
            />)}

           

            {showConfirmModal && (
                <ConfirmationModal
                  show = {showConfirmModal}
                  title="Confirmation"
                  message="Are you sure you want to finalize your choice ?"
                  onConfirm={() =>{deleteAssistant(selectedAst)}}
                  onCancel={handleCancel}
                />
              )}
            <div className="flex gap-5">
                <input type="text" placeholder="Search" className="input w-52 max-w-xs " onChange={e => setKeyword(e.target.value)}/>

                <div className="dropdown justify-start w-52">

                    <label tabIndex={0} className="btn btn-ghost bg-base-100 flex justify-start  normal-case card-title ">{(selectedOption !== "None" ? selectedOption : "Generation")}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max">
                        {
                            generation.map((gen,index)=>{
                                return(<li key={index} onClick={()=>{
                                    setSelectedOption(gen)
                                    console.log(gen);

                                    
                                }}><a className="h-8">{gen}</a></li>)
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-5 my-2">         
                <div>
                    <button className="btn btn-outline btn-info bg-blue-600 btn-sm" onClick={()=>{createInputAssistantLeaderTemplate()}}>Download Input Leader Template</button>
                    <form onSubmit={handleLeaderInsert}  method="post" encType="multipart/form-data">
                        <input type="file" name="file" accept=".csv" onChange={handleLeaderFileChange} />
                        <button className="btn btn-outline btn-info bg-blue-600 btn-sm" type="submit">Upload</button>
                    </form>
                </div>                      

                <div>
                    <button className="btn btn-outline btn-info bg-blue-600 btn-sm" onClick={()=>{createAssistantInsertTemplate()}}>Download Template</button>
                    <form onSubmit={handleAssistantInsert}  method="post" encType="multipart/form-data">
                        <input type="file" name="file" accept=".csv" onChange={handleAssistantFileChange} />
                        <button className="btn btn-outline btn-info bg-blue-600 btn-sm" type="submit">Upload</button>
                    </form>
                </div>
            </div>

            


            <div className="card w-full bg-base-100 ">
                    <div className="card-body w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-2">Assistant List</p>
                            
                        </div>

                        <div>

                        </div>

                        <div className="max-h-96 overflow-auto">

                            <table className="table table-compact w-full">
                                {/* head */}
                                <thead className="sticky top-0 text-center">
                                <tr>                                 
                                    <th>Initial</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Leader</th>
                                    <th>CareerChoice</th>
                                    <th>EligibleForResign</th>
                                    <th>EligibleForPromotion</th>
                                    <th>Action</th>                                   
                                </tr>
                                </thead>
                                <tbody>
                                {!filtered
                                ?
                                users.map((us, index) => (
                                    <tr className="hover"
                                    key={index}>
                                        <td>
                                            {us.initial}
                                        </td>
                                        <td>{us.assistantname}</td>
                                        <td>{us.rolename}</td>
                                        <td>{us.assistantleader ? us.assistantleader : 'None'}</td>
                                        <td>{us.careerchoice=="" ? 'Unknown' : us.careerchoice}</td>
                                        <td>{us.eligibleforresign ? 'Eligible' : 'Not Eligible'}</td>
                                        <td>{us.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                        <td className="flex gap-2">
                                           <button onClick={() => openModal(us.initial)}>
                                                <Link  href={`assistant/detail/${us.initial}`}>
                                                    Show
                                                </Link>
                                            </button> 
                                           
                                        </td>
                                        
                                         
                                    </tr>
                                    
                                    
                                    ))
                                    :
                                    filteredData.map((us, index) => (
                                        <tr className="clickable hover" onClick={()=>{setSelectedId(us.initial)}} key={index}  >
                                            <td>{us.initial}</td>
                                            <td>{us.assistantname}</td>
                                            <td>{us.rolename}</td>
                                            <td>{us.assistantname ? us.assistantleader : 'None'}</td>
                                            <td>{us.careerchoice=="" ? 'Unknown' : us.careerchoice}</td>
                                            <td>{us.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                            <td>{us.eligibleforresign ? 'Eligible' : 'Not Eligible'}</td>
                                            <td className="flex gap-2">
                                                <button >
                                                    <Link  href={`assistant/detail/${us.initial}`}>
                                                        Show
                                                    </Link>
                                                </button> 
                                            </td>
                                            
                                             
                                        </tr>
                                        
                                        
                                        ))

                                    }

                                   
                                </tbody>
                            </table>
                            </div>
                    </div>
            </div>

        </div>
    )
}

export default AssistantPage