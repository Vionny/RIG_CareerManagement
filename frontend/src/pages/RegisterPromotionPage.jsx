

const RegisterPromotionPage = ()=>{


    return(
        <div className="bg-green-100 min-h-screen flex justify-center">
            <div className="card w-5/6 bg-base-100 shadow-xl flex items-center">
            <h2 className="card-title ">Register Promotion Page</h2>
            <div className="form-control card w-5/6 h-max my-5 p-5 bg-slate-200">
                  
                  <div className="flex">
                    <div className="w-5/6 pr-3">
                        <label className="label">
                            <span className="label-text">Position</span>
                            {/* <span className="label-text">Priority 1</span>  */}
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Pick one</option>
                            <option>Network Administrator</option>
                            <option>Subject Coordinator</option>
                            <option>Operation </option>
                            <option>Database Administration</option>
                            
                        </select>

                    </div>
                    

                    <div className="w-1/6">
                        <label className="label">
                            <span className="label-text">Priority</span>
                            {/* <span className="label-text">Priority 1</span>  */}
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>                      
                        </select>
                    </div>
                    

                  </div>
                   

                    <label className="label">
                    <span className="label-text">Reason</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="My reason is.."></textarea>
                   
            </div>
            <div className="form-control card w-5/6 h-max my-5 p-5 bg-slate-200">
                    
            <div className="flex">
                    <div className="w-5/6 pr-3">
                        <label className="label">
                            <span className="label-text">Position</span>
                            {/* <span className="label-text">Priority 1</span>  */}
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Pick one</option>
                            <option>Network Administrator</option>
                            <option>Subject Coordinator</option>
                            <option>Operation </option>
                            <option>Database Administration</option>
                            
                        </select>

                    </div>
                    

                    <div className="w-1/6">
                        <label className="label">
                            <span className="label-text">Priority</span>
                            {/* <span className="label-text">Priority 1</span>  */}
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>                      
                        </select>
                    </div>
                    

                  </div>
                    <label className="label">
                    <span className="label-text">Reason</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="My reason is.."></textarea>
                   
            </div>
            <div className="form-control card w-5/6 h-max my-5 p-5 bg-slate-200">
                    
            <div className="flex">
                    <div className="w-5/6 pr-3">
                        <label className="label">
                            <span className="label-text">Position</span>
                            {/* <span className="label-text">Priority 1</span>  */}
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Pick one</option>
                            <option>Network Administrator</option>
                            <option>Subject Coordinator</option>
                            <option>Operation </option>
                            <option>Database Administration</option>
                            
                        </select>

                    </div>
                    

                    <div className="w-1/6">
                        <label className="label">
                            <span className="label-text">Priority</span>
                            {/* <span className="label-text">Priority 1</span>  */}
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>                      
                        </select>
                    </div>
                    

                  </div>
                    <label className="label">
                    <span className="label-text">Reason</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="My reason is.."></textarea>
                   
            </div>
                
                
            </div>
            


        </div>

    )
}

export default RegisterPromotionPage