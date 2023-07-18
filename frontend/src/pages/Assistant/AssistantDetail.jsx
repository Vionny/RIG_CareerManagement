"use client"
import "@/app/globals.css"
import { EditAssistantModal } from "@/components/Modals/Edit/EditAssistantModal"
import {useEffect, useState} from 'react'
import ConfirmationModal from "@/components/Modals/Confirmation/ConfirmationModal";
import { useRouter } from 'next/navigation'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AssistantDetail= ({id})=>{

    const router = useRouter()
    const [comments, setComments] = useState();
    const [inputCmt, setInputCmt] = useState();
    const [cmtType, setCmtType] = useState('positive');
    
    const [ast, setAst] = useState();
    const [selectedAst, setSelectedAst] = useState();
    const [semester, setSemester] = useState();
    const [currAst, setCurrAst] = useState();
    const [choices, setChoices] = useState();
    const [records, setRecords] = useState();
    const [haveCmt, setHaveCmt] = useState();

    const [showConfirmModalRecord, setShowConfirmModalRecord] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //record
    //record
    const [hcletter, setHcLetter] = useState(0);
    const [astpvLetter, setAstpvLetter] = useState(0);
    const [absence, setAbsence] = useState(0);
    const [forgot, setForgot] = useState(0);
    const [late, setLate] = useState(0);
    const [toleration, setTolerate] = useState(0);
    const [leave, setLeave] = useState(0);
    const [sick, setSick] = useState(0);
    const [alpha, setAlpha] = useState(0);
    const [casemakedl, setCasemakedl] = useState(0);
    const [correctiondl, setCorrectiondl] = useState(0);
    const [teachAbsence, setTeachAbsence] = useState(0);
    const [teachLate, setTeachLate] = useState(0);
    const [teachPermit, setTeachPermit] = useState(0);




    useEffect(() => {
        setSemester(sessionStorage.getItem('selectedSemester'));
        setCurrAst(sessionStorage.getItem('initial'))

        
      }, []);

    
    useEffect(() =>{
        if(!comments) setHaveCmt(false)
        else setHaveCmt(true)
    }, [comments])
    

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
                setHcLetter(res.data[0]?.hcletter ?? 0)
                setAstpvLetter(res.data[0]?.astpvletter ?? 0)
                setAbsence(res.data[0]?.abscence ?? 0)
                setForgot(res.data[0]?.forgot ?? 0)
                setLate(res.data[0]?.late ?? 0)
                setTolerate(res.data[0]?.toleration ?? 0)
                setLeave(res.data[0]?.leave ?? 0)
                setSick(res.data[0]?.sick ?? 0)
                setAlpha(res.data[0]?.alpha ?? 0)
                setCasemakedl(res.data[0]?.casemakingdl ?? 0)
                setCorrectiondl(res.data[0]?.correctiondl ?? 0)
                setTeachAbsence(res.data[0]?.teachingabscence ?? 0)
                setTeachLate(res.data[0]?.teachinglate ?? 0)
                setTeachPermit(res.data[0]?.teachingpermission ?? 0)

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

        


        
    },[semester])



    const insertComment = () =>{
            
        var data = {
            initial: id,
            semesterid: semester,
            commentinitial: currAst,
            commenttype: cmtType,
            commenttext:inputCmt, 
            havecomment: haveCmt  
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

    const updateRecords = () =>{
            
            
        var data = {
            initial: id,
            hcletter: hcletter,
            astpvletter:astpvLetter,
            abscence: absence,
            forgot:forgot,
            late: late,
            toleration: toleration,
            leave: leave,
            sick: sick,
            alpha: alpha,
            casemakingdl: casemakedl,
            correctiondl: correctiondl,
            teachingabscence: teachAbsence,
            teachinglate: teachLate,
            teachingpermission: teachPermit,
            semesterid : sessionStorage.getItem('selectedSemester')       

        }
        console.log(data);
        axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updateRecords', data)
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

    const handleCancel =()=>{
        setShowConfirmModalRecord(false)
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

    const handleCancelDelete =()=>{
        setShowConfirmModal(false)
    }

    const deleteAssistant = (astId) =>{
        axios
        .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAssistant/${astId}`)
        .then((res) =>{
            console.log(res)
            if(res.data== 'Success'){

                router.push('/assistant/view');
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
            {showConfirmModalRecord && (
                <ConfirmationModal
                  show = {showConfirmModalRecord}
                  title="Confirmation"
                  onConfirm={() =>{updateRecords()}}
                  message="Are you sure you want to update the records?"
                  onCancel={handleCancel}
                />
              )}

            {isModalOpen && (
                    <div className="modal-backdrop bg-black" >
                        <EditAssistantModal assistant={ast} closeModal={closeModal}/>
                       
                    </div>
            )}

            {showConfirmModal && (
                <ConfirmationModal
                  show = {showConfirmModal}
                  title="Confirmation"
                  message="Are you sure you want to delete this assistant?"
                  onConfirm={() =>{deleteAssistant(selectedAst)}}
                  onCancel={handleCancelDelete}
                />
              )}

            <article className="prose base mb-5">
                <h2>Assistant Management</h2>
            </article>
             
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
                                <button className="button button-primary" onClick={() => openModal(id)}>Edit</button> 
                                <button onClick={() => clickDelete(id)}>Delete</button> 
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

                                    <div className="flex gap-2">
                                        <textarea className="textarea-md w-9/12 h-28 border rounded resize-none bg-white" onChange={(e) => { setInputCmt(e.target.value); }} 
                                        placeholder="Comment here.."></textarea>

                                        <div className="flex flex-col gap-3 justify-center w-3/12">
                                            <select
                                                className="select h-5 w-full bg-white text-center" 
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
                                                <input className="input input-bordered text-center w-24" type="text" value={hcletter ? hcletter : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setHcLetter(value)} else {setHcLetter(null);}}} />
                                            </td>
                                            <td className="">
                                                <input className="input input-bordered text-center w-24" type="text" value={astpvLetter ? astpvLetter : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setAstpvLetter(value)} else {setAstpvLetter(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={absence ? absence : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setAbsence(value)} else {setAbsence(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={forgot ? forgot :  0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setForgot(value)} else {setForgot(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={late ? late : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setLate(value)} else {setLate(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={toleration ? toleration : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setTolerate(value)} else {setTolerate(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={leave ? leave : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setLeave(value)} else {setLeave(null);}}} />            
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
                                                <input className="input input-bordered text-center w-24" type="text" value={sick ? sick : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setSick(value)} else {setSick(null);}}} />
                                            </td>
                                            <td className="">
                                                <input className="input input-bordered text-center w-24" type="text" value={alpha ? alpha : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setAlpha(value)} else {setAlpha(null);}}}/>            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={casemakedl ? casemakedl : 0}onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setCasemakedl(value)} else {setCasemakedl(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={correctiondl ? correctiondl :  0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setCorrectiondl(value)} else {setCorrectiondl(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={teachAbsence ? teachAbsence : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setTeachAbsence(value)} else {setTeachAbsence(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={teachLate ? teachLate : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setTeachLate(value)} else {setAbsence(null);}}} />            
                                            </td>
                                            <td className="text-center">
                                                <input className="input input-bordered text-center w-24" type="text" value={teachPermit ? teachPermit : 0} onChange={(e) => {const value = parseInt(e.target.value); if (!isNaN(value)) {setTeachPermit(value)} else {setTeachPermit(null);}}} />            
                                            </td>
                                      
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <button className="btn btn-primary self-end" onClick={()=>{setShowConfirmModalRecord(true)}} >Update Records</button>

                        </div>
                        :
                        <div></div>
                    }
                        </div>
                        </div>
                        
                        
                        </div>
                        
                        )
                        
}

export default AssistantDetail;