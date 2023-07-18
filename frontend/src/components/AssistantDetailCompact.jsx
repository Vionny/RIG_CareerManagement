"use client"
import "@/app/globals.css"
import {useEffect, useState} from 'react'
import Link from "next/link"; 


const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AssistantDetailCompact = ({id}) =>{


    const [comments, setComments] = useState();
    const [inputCmt, setInputCmt] = useState();
    const [cmtType, setCmtType] = useState('positive');
    
    const [ast, setAst] = useState();
    const [selectedAst, setSelectedAst] = useState();
    const [semester, setSemester] = useState();
    const [choices, setChoices] = useState();
    const [records, setRecords] = useState();

    //record
    const [hcletter, setHcLetter] = useState();
    const [astpvLetter, setAstpvLetter] = useState();
    const [absence, setAbsence] = useState();
    const [forgot, setForgot] = useState();
    const [late, setLate] = useState();
    const [toleration, setTolerate] = useState();
    const [leave, setLeave] = useState();
    const [sick, setSick] = useState();
    const [alpha, setAlpha] = useState();
    const [casemakedl, setCasemakedl] = useState();
    const [correctiondl, setCorrectiondl] = useState();
    const [teachAbsence, setTeachAbsence] = useState();
    const [teachLate, setTeachLate] = useState();
    const [teachPermit, setTeachPermit] = useState();

    useEffect(() => {
        setSemester(sessionStorage.getItem('selectedSemester'));
    

        
      }, []);


    useEffect(()=>{
       

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getComment/'+ id +'/' + semester).then((res) => {
            console.log(res.data)
            setComments(res.data)  
            // setLoadCmt(true)
        })

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getUser/'+ id).then((res) => {
            console.log(res.data[0])
            setAst(res.data[0])            
        })

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getProblem/'+ id).then((res) => {
            if (res.data && res.data.length > 0) {
                console.log(res.data[0])
                setHcLetter(res.data[0].hcletter)
                setAstpvLetter(res.data[0].astpvletter)
                setAbsence(res.data[0].abscence)
                setForgot(res.data[0].forgot)
                setLate(res.data[0].late)
                setTolerate(res.data[0].toleration)
                setLeave(res.data[0].leave)
                setSick(res.data[0].sick)
                setAlpha(res.data[0].alpha)
                setCasemakedl(res.data[0].casemakingdl)
                setCorrectiondl(res.data[0].correctiondl)
                setTeachAbsence(res.data[0].teachingabscence)
                setTeachLate(res.data[0].teachinglate)
                setTeachPermit(res.data[0].teachingpermission)
            }       
            setRecords(res.data)     
        })
        .catch((error) =>{
            console.error(error);
        })

        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/promotion/getRegistrantChoices/'+ id + '/' + semester).then((res) => {
            console.log(res.data)
            setChoices(res.data)   
            
        })

        


        
    },[semester, id])

    if(ast != undefined)
    return(
       <div>
        {/* detail */}
        <div className="bg-base-100 card w-full h-fit">
                    <div className="card-body flex w-full gap-5">
                        
                        <div className="flex w-fullspace-x-28">

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

                            <div className="absolute top-0 right-3 flex gap-1">
                                <button >
                                    <Link  href={`assistant/detail/${id}`}>
                                        Show
                                    </Link>
                                </button> 
                            </div>
                        </div>
                        

                        
                        <div className="flex flex-col gap-5">

                        {
                           
                            choices != undefined && choices.length > 0 ? (
                              <div className="card bg-base-200 p-2 h-fit max-h-96 overflow-y-auto">
                                <div className="text-lg font-semibold">Choices</div>
                          
                                {
                                
                                choices
                                .sort((a, b) => a.priority - b.priority)
                                .map((choice) => {
                                  if (choice.priority === 1) {
                                    return (
                                      <div className="my-2" key={choice.initial}>
                                        <div className="font-semibold">Priority 1</div>
                                        <p>{choice.rolename}</p>
                                        <p>{choice.registrationreason}</p>
                                      </div>
                                    );
                                  } else if (choice.priority === 2) {
                                    return (
                                      <div className="my-2" key={choice.initial}>
                                        <div className="font-semibold">Priority 2</div>
                                        <p>{choice.rolename}</p>
                                        <p>{choice.registrationreason}</p>
                                      </div>
                                    );
                                  } else if (choice.priority === 3) {
                                    return (
                                      <div className="my-2" key={choice.initial}>
                                        <div className="font-semibold">Priority 3</div>
                                        <p>{choice.rolename}</p>
                                        <p>{choice.registrationreason}</p>
                                      </div>
                                    );
                                  } else {
                                    return null; 
                                  }
                                })}
                              </div>
                            ) : (
                              <div></div>
                            )                         
                        } 

                            {
                                comments!=undefined ? 

                                <div className="card bg-base-200 p-2 h-fit gap-2 ">
                                    <div className="text-lg font-semibold ">Comments</div>
                                    <div className="max-h-96 overflow-y-auto">
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
                                            <div className={`flex flex-row gap-2 p-2 items-center rounded ${bgColor}`} key={com.assistantcommentid}>
                                                <p className="w-10 h-fit ">{sign}</p>
                                                <div className="flex flex-col w-full">

                                                    <p className="">{com.commenttext}</p>
                                                    <p className="self-end text-sm">by {com.commenterinitial}</p>
                                                </div>
                                            </div>
                                            )
                                        })
                                        
                                    }
                                    </div>

                            
                                </div>   

                                :
                                <div></div>
                            
                            }
                        </div>

                        { records ?
                        
                        <div className="flex flex-col w-full card bg-base-200 p-2 h-fit gap-2 ">

                            <div className="text-lg font-semibold">Records</div>

                            <div className="w-full">
                                <table className="table w-full border-solid border-2">
                                    <thead >
                                        <tr>
                                            <th className="whitespace-normal text-center w-24">HC Letter</th>
                                            <th className="whitespace-normal text-center w-24">Ast Spv Letter</th>
                                            <th className="whitespace-normal text-center w-24">Absence</th>
                                            <th className="whitespace-normal text-center w-24">Forgot</th>
                                            <th className="whitespace-normal text-center w-24">Late</th>
                                            <th className="whitespace-normal text-center w-24">Toleration</th>
                                            <th className="whitespace-normal text-center w-24">Leave</th>
                                                                                        
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {records.map((rec, index) => (
                                        <tr key={index}>
                                            <td className="">
                                                <input className="input input-bordered text-center w-24" type="text" value={hcletter ? hcletter : 0} readOnly/>
                                            </td>
                                            <td className="">
                                                <input className="input input-bordered text-center w-24" type="text" value={astpvLetter ? astpvLetter : 0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={absence ? absence : 0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={forgot ? forgot :  0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={late ? late : 0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={toleration ? toleration : 0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={leave ? leave : 0} readOnly />            
                                            </td>
                                      
                                        </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                            <div className="">
                                <table className="table w-full border-solid border-2">
                                    <thead className="p-0">
                                        <tr className="p-0">   
                                            <th className="whitespace-normal text-center w-24">Sick</th>
                                            <th className="whitespace-normal text-center w-24">Alpha</th>
                                            <th className="whitespace-normal text-center w-24">Casemake Deadline</th>
                                            <th className="whitespace-normal text-center w-24">Correction Deadline</th>
                                            <th className="whitespace-normal text-center w-24">Teaching Absence</th>
                                            <th className="whitespace-normal text-center w-24">Teaching Late</th>
                                            <th className="whitespace-normal text-center w-24">Teaching Permission</th>                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((rec, index) => (
                                        <tr key={index}>
                                            <td className="">
                                                <input className="input input-bordered text-center w-24" type="text" value={sick ? sick : 0} readOnly />
                                            </td>
                                            <td className="">
                                                <input className="input input-bordered text-center w-24" type="text" value={alpha ? alpha : 0} readOnly/>            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={casemakedl ? casemakedl : 0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={correctiondl ? correctiondl :  0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={teachAbsence ? teachAbsence : 0} readOnly/>            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={teachLate ? teachLate : 0} readOnly />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={teachPermit ? teachPermit : 0} readOnly />            
                                            </td>
                                      
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
    
                        </div>
                        :
                        <div></div>
                    }
                        </div>
            </div>
       </div>
    )
}

export default AssistantDetailCompact;