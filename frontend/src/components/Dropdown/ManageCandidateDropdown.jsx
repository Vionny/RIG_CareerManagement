'use client'

import { createInputPromotionRankingTemplate } from "@/CSVRelated/TemplateCreate"
import { useState } from "react";

const axios = require("axios")
const ManageCandidateDropdown= ()=>{
    const [InputFile, setInputFile] = useState(null);

    const handleFileChange = (event) => {
        console.log('changed')
        const selectedFile = event.target.files[0];
        setInputFile(selectedFile);
      };
    
    const handleInsert = async (event) => {
        console.log('here')
        event.preventDefault();
        
        if (InputFile) {
            const formData = new FormData();
            formData.append('file', InputFile);
            formData.set('semesterid',sessionStorage.getItem('selectedSemester'));
            console.log(formData);
            try {
            await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/readPromotionRankingInput', formData, {
                headers: {
                'Content-Type': 'multipart/form-data' // Set the correct content type
                }
            }).then((res)=>{
                if(res.data.message == 'Success'){
                    // setTitle("Success !")
                    // setMessage("You have successfully assistant's leaders !")
                    // setShowInfoModal(true)
                }
            })
            } catch (error) {
            console.error('Error uploading file:', error);
            }
        }
    };
    
    return (
        <div className="collapse  rounded-lg mb-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl bg-gradient-to-tr from-sky-500  to-sky-200 font-medium">
                Manage Candidates
            </div>
            <div className="collapse-content w-full bg-gradient-to-t from-sky-500  to-sky-200 content-center items-center place-content-center" > 
                
                <div className="flex w-full rounded-box mt-5 mb-2">
                    <div className="grid h-20 flex-grow card rounded-box place-items-center">
                        <button className="btn btn-outline" onClick={()=>{createInputPromotionRankingTemplate()}}>Download Input Template</button>
                    </div> 
                    <div className="divider divider-horizontal">OR</div> 
                    <div className="justify-center content-center flex h-20 flex-grow flex-row card  rounded-box place-items-center">
                        <form onSubmit={handleInsert}  method="post" encType="multipart/form-data">
                            <input type="file"  name="file" accept=".csv" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
                            <button type="submit" className="btn btn-outline ml-10">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCandidateDropdown;