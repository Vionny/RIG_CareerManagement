"use client"
import "@/app/globals.css"

import {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AssistantDetail= ({id})=>{

    const [comments, setComments] = useState();
    const [inputCmt, setInputCmt] = useState();
    const [cmtType, setCmtType] = useState();
    
    const [loadCmt, setLoadCmt] = useState(false);
    const [ast, setAst] = useState();
    const [semester, setSemester] = useState();
    const [currAst, setCurrAst] = useState();

    const [haveCmt, setHaveCmt] = useState();
  
    // console.log(ast.assistantname);
    // console.log(comments);
    useEffect(()=>{
        setSemester(sessionStorage.getItem('selectedSemester'))
        setCurrAst(sessionStorage.getItem('initial'))

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getComment/'+ id +'/' + semester).then((res) => {
            console.log(res.data)
            setComments(res.data)  
            setLoadCmt(true)
        })

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getUser/'+ id).then((res) => {
            // console.log(res.data[0])
            setAst(res.data[0])   
            setLoadCmt(true)
        })

        
    },[loadCmt])




    const insertComment = () =>{
     
        if(!comments) setHaveCmt(false)
        else setHaveCmt(true)
        var data = {
            initial: id,
            semesterid: semester,
            commentinitial: currAst,
            commenttype: cmtType,
            commenttext:inputCmt,   
        }
        console.log(data);
        axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/insertComment', data)
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

    
    if(!ast) return(<div></div>)
    else
    return(
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">

            <article className="prose base mb-5">
                <h2>Assistant Management</h2>
            </article>
             
                {/* detail */}
                <div className="bg-base-100 card w-full h-fit">
                    <div className="card-body  w-full">
                        <div className="card-title justify-between">
                        
                        </div>
                        <div className="flex flex-row gap-5">
                            <figure className="bg-slate-300 w-fit">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp7fl8up-1-T7_OD4AbWBCs9T7CK6iaFGGpA&usqp=CAU" className="w-44" alt="Photo" />
                            </figure>

                            <div className="flex flex-row gap-1">
                                <div className="w-full">
                                    <h3 className="text-lg font-semibold">Initial   : {id}</h3>
                                    <h3 className="text-lg font-semibold">Name      : {ast.assistantname}</h3>
                                    <h3 className="text-lg font-semibold">Leader    : {!ast.assistantleader ? '-' : ast.assistantleader}</h3>
                                </div>

                                
                                
                            </div>
                        </div>  
                        
                        <div className="flex flex-col gap-5">

                            <div className="card bg-base-200 p-2 h-fit max-h-96 overflow-y-auto">
                                <div className=" text-lg font-semibold">Choices</div>

                                <div className="my-2">
                                    <div className="font-semibold">Priority 1</div>
                                    <p>Choice 1</p>
                                    <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>
                                </div>

                                <div className="my-2">

                                    <div className="font-semibold">Priority 2</div>
                                    <p>Choice 1</p>
                                    <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>

                                </div>
                                
                                <div className="my-2">

                                    <div className=" font-semibold">Priority 3</div>
                                    <p>Choice 1</p>
                                    <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>
                                </div>
                            </div>   

                            {
                                comments!=undefined ? 

                                <div className="card bg-base-200 p-2 h-fit gap-2 max-h-96 overflow-y-auto">
                                    <div className="text-lg font-semibold ">Comments</div>

                                    {
                                        
                                        
                                        comments.map((com, index)=>{

                                            let bgColor = "";
                                            let sign = "";
                                            
                                            if (com.commenttype === "negative") {
                                                bgColor = "bg-red-200";
                                                sign = "-1";
                                            } else if (com.commenttype === "positive") {
                                                bgColor = "bg-blue-200";
                                                sign = "+1";
                                            } else if (com.commenttype === "neutral") {
                                                bgColor = "bg-slate-200";
                                                sign = "0";
                                            }

                                            return (
                                            <div className={`flex flex-row gap-2 p-2 items-center rounded ${bgColor}`}>
                                                <p className="w-10 h-fit ">{sign}</p>
                                                <div className="flex flex-col w-full">

                                                    <p className="">{com.commenttext}</p>
                                                    <p className="self-end text-sm">by {com.commenterinitial}</p>
                                                </div>
                                            </div>
                                            )
                                        })
                                        
                                    }

                                    <div className="flex gap-2">
                                        <textarea className="textarea-md w-9/12 h-28 border rounded resize-none bg-white" onChange={(e) => { setInputCmt(e.target.value); }} 
                                        placeholder="Comment here.."></textarea>

                                        <div className="flex flex-col gap-3 justify-center w-3/12">
                                            <select
                                                className="select h-5 w-full max-w-xs bg-white" 
                                                value={cmtType}
                                                onChange={(e) => {
                                                    setCmtType(e.target.value);
                                                }}
                                              >
                                                <option value = {'positive'}>(+1) Positive</option>
                                                <option value = {'neutral'}>(0) Neutral</option>
                                                <option value = {'negative'}>(-1) Negative</option>
                                            </select>

                                            <button className="btn btn-primary" onClick={()=>insertComment()}>Insert New Comment</button>
                                        </div>
                                    </div>
                                </div>   

                                :
                                <div></div>
                            
                            }
                        </div>

                        <div className="flex flex-col">

                            <div className="overflow-x-auto">
                                <table className="table border rounded-lg">
                                    <thead >
                                        <tr>
                                            <th className="whitespace-normal text-center w-32">HC Letter</th>
                                            <th className="whitespace-normal text-center w-32">Ast Spv Letter</th>
                                            <th className="whitespace-normal text-center w-32">Absence</th>
                                            <th className="whitespace-normal text-center w-32">Forgot</th>
                                            <th className="whitespace-normal text-center w-32">Late</th>
                                            <th className="whitespace-normal text-center w-32">Toleration</th>
                                            <th className="whitespace-normal text-center w-32">Leave</th>
                                                                                        
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        {division.map((divItem, index) => (
                                        <tr className="clickable" onClick={()=>{selectId(divItem.divisionid)}} key={index}>
                                            <td className="text-center w-64">
                                                <div className="whitespace-normal">{divItem.divisionname}</div>
                                            </td>
                                            <td className="text-center">
                                                <div className="whitespace-normal">{divItem.divisiondescription} </div>        
                                            </td>
                                            
                                            <td className="text-center w-32">
                                                <button className="btn btn-info btn-sm btn-outline font-bold  border-blue-400"
                                                onClick={()=>{
                                                    selectedDiv(divItem);
                                                    setShowEditModal(true);
                                                }}
                                                >Edit</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody> */}
                                </table>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table border rounded-lg">
                                    <thead className="p-0">
                                        <tr className="p-0">   
                                            <th className="whitespace-normal text-center w-32">Sick</th>
                                            <th className="whitespace-normal text-center w-32">Alpha</th>
                                            <th className="whitespace-normal text-center w-32">Casemake Deadline</th>
                                            <th className="whitespace-normal text-center w-32">Correction Deadline</th>
                                            <th className="whitespace-normal text-center w-32">Teaching Absence</th>
                                            <th className="whitespace-normal text-center w-32">Teaching Late</th>
                                            <th className="whitespace-normal text-center w-32">Teaching Permission</th>                                          
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        {division.map((divItem, index) => (
                                        <tr className="clickable" onClick={()=>{selectId(divItem.divisionid)}} key={index}>
                                            <td className="text-center w-64">
                                                <div className="whitespace-normal">{divItem.divisionname}</div>
                                            </td>
                                            <td className="text-center">
                                                <div className="whitespace-normal">{divItem.divisiondescription} </div>        
                                            </td>
                                            
                                            <td className="text-center w-32">
                                                <button className="btn btn-info btn-sm btn-outline font-bold  border-blue-400"
                                                onClick={()=>{
                                                    selectedDiv(divItem);
                                                    setShowEditModal(true);
                                                }}
                                                >Edit</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody> */}
                                </table>
                            </div>


                            </div>
                        
                    </div>
                </div>

                        
            </div>
        
    )

}

export default AssistantDetail;