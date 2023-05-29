import "@/app/globals.css"

const InputCareer = () => {


    return (
        <div  className="pl-10 pr-10 pt-5 bg-base-200 h-screen">
            

            <article className="prose base mb-5">
                <h2>Career Choice for Even 2022/2023</h2>
            </article>


            <div className="alert bg-red-200 shadow-lg mb-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6 text-red-800" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-bold text-red-800">You can update your career choice on Saturday, 3 July at max</span>
                </div>
            </div>

            

            <div className="card bg-base-100 shadow-xl flex-auto h-2/5">
                <div className="card-body flex flex-col">
                    <div className="flex ">
                        <h2 className="card-title mr-3">Desicion:</h2>
                            <select className="select w-full max-w-xs bg-base-200">
                            <option>Willing to Continue</option>
                            <option>Not Willing to Continue</option>
                            <option>Tentative</option>
                            </select>
                    </div>
                        <h2 className="card-title ">Rencana Ke Depannya</h2>
                    <textarea className="textarea-md w-full h-3/4 resize-none bg-base-200" placeholder="Rencana ke depannya saya akan.."></textarea>
                </div>
            </div>   


            <div className="flex justify-end mt-5">
                <button className="btn btn-neutral w-32 mr-3" >Submit</button>
                <button className="btn btn-active btn-primary w-32" >Finalize</button>
            </div>

        </div>
    )

}

export default InputCareer