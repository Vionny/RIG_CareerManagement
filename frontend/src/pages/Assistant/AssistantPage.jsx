"use client"
import { createAssistantInsertTemplate, createInputAssistantLeaderTemplate } from "@/CSVRelated/TemplateCreate"
import "@/app/globals.css"
import { EditAssistantModal } from "@/components/Modals/Edit/EditAssistantModal"
import {useEffect, useState} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';
import csvParser from 'csv-parser';
import { readAssistantInsertTemplate, readAstInputFile } from "@/CSVRelated/ReadCSVTemplate"
import CSVReader from "react-csv-reader"
import SimpleInformationModal from "@/components/Modals/Information/SimpleInformationModal"

const AssistantPage= ()=>{
    const [AssistantInputFile, setAssistantInputFile] = useState(null);
    const [LeaderInputFile, setLeaderInputFile] = useState(null);
    const [users, setUsers] = useState();
    const [loadUser, setLoadUser] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [keyword, setKeyword] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('None');
    const [filtered, setFiltered] = useState(false);
    const [title,setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ast, setAst] = useState('');

    const [generation, setGeneration] = useState(['None','23-1','22-1','21-1','20-1','19-1','18-1','22-2','21-2','20-2','19-2','18-2'])

    const [showInfoModal,setShowInfoModal] = useState(false);
    const [inputAstFilePath, setInputAstFilePath] = useState()
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllUser').then((res) => {
            console.log(res.data)
            setUsers(res.data)  
            setLoadUser(true)
        })
        
    },[loadUser])

    useEffect(()=>{
        if(users){
            // console.log(users.filter(user => user.initial.includes(keyword) || user.assistantname.includes(keyword)) || user.rolename.includes(keyword));

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
                // console.log("filter");
                // console.log(selectedOption);
                // console.log(users.filter(user => user.initial.includes(selectedOption)));
                setFilteredData(users.filter(user => user.initial.includes(selectedOption)));
                
                // setFilteredData( users.filter(user => user.initial.includes(selectedOption) && (user.initial.toLowerCase().includes(keyword.toLowerCase()) || user.assistantname.toLowerCase().includes(keyword.toLowerCase())) || user.rolename.toLowerCase().includes(keyword.toLowerCase())));
            }

        //    console.log(filteredData);
        //    setFilteredData( users.filter(user => user.initial.includes(keyword)));
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
                'Content-Type': 'multipart/form-data' // Set the correct content type
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
                'Content-Type': 'multipart/form-data' // Set the correct content type
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
    console.log(filteredData);
    console.log(filtered);


    const openModal = (astId) => {
        console.log("open");
        console.log(astId);
        setAst(astId);
        setIsModalOpen(true);
      }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    if(!loadUser) return <div></div>
    else
    return(

        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            <article className="prose base mb-5">
                <h2>Assistant Management</h2>
            </article>
            {showInfoModal &&(<SimpleInformationModal
                title = {title}
                message= {message}
                onConfirm={ refreshPage}
            />)}

            {isModalOpen && (
                    <div className="modal-backdrop bg-black" >
                        <EditAssistantModal assistant={ast} closeModal={closeModal}/>
                        {/* <EditSemesterModal semesterid={selectedSemesterId} closeModal={closeModal} /> */}
                    </div>
            )}


            <div>
                    <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs " onChange={e => setKeyword(e.target.value)}/>
                    {/* <select value={selectedOption} onChange={handleSelectChange}>
                    {generation.map((gen) => (
                            <option value={gen}>{gen}</option>            
                        ))}
                       
                    </select> */}
                    
                    <button className="btn btn-outline btn-info bg-blue-600" onClick={()=>{createInputAssistantLeaderTemplate()}}>Download Input Leader Template</button>
                    <form onSubmit={handleLeaderInsert}  method="post" encType="multipart/form-data">
                    <input type="file" name="file" accept=".csv" onChange={handleLeaderFileChange} />

                        <button type="submit">Upload</button>
                    </form>
            </div>

            <div className="dropdown justify-start w-2/4">
                    {/* <CSVReader onFileLoaded={readInputAstCSV}
                    inputId="csv-input"/> */}
                    <button className="btn btn-outline btn-info bg-blue-600" onClick={()=>{createAssistantInsertTemplate()}}>Download Template</button>
                    <form onSubmit={handleAssistantInsert}  method="post" encType="multipart/form-data">
                    <input type="file" name="file" accept=".csv" onChange={handleAssistantFileChange} />

                        <button type="submit">Upload</button>
                    </form>

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


            <div className="card w-full bg-base-100 ">
                    <div className="card-body w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-2">Assistant List</p>
                            
                        </div>

                        <div>

                        </div>

                        <div className="">
                            <table className="table table-compact w-full">
                                {/* head */}
                                <thead>
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
                                    <tr key={index}  >
                                        <td>{us.initial}</td>
                                        <td>{us.assistantname}</td>
                                        <td>{us.rolename}</td>
                                        <td>{us.assistantleader ? us.assistantleader : 'None'}</td>
                                        <td>{us.careerchoice=="" ? 'Unknown' : us.careerchoice}</td>
                                        <td>{us.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                        <td>{us.eligibleforresign ? 'Eligible' : 'Not Eligible'}</td>
                                        <td>
                                           <button onClick={() => openModal(us.initial)}>Edit</button> 
                                        </td>
                                        
                                         
                                    </tr>
                                    
                                    
                                    ))
                                    :
                                    filteredData.map((us, index) => (
                                        <tr key={index}  >
                                            <td>{us.initial}</td>
                                            <td>{us.assistantname}</td>
                                            <td>{us.rolename}</td>
                                            <td>{us.assistantname ? us.assistantleader : 'None'}</td>
                                            <td>{us.careerchoice=="" ? 'Unknown' : us.careerchoice}</td>
                                            <td>{us.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                            <td>{us.eligibleforresign ? 'Eligible' : 'Not Eligible'}</td>
                                            <td>
                                               <button onClick={() => openModal(us.initial)}>Edit</button> 
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
}
export default AssistantPage;