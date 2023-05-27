import "../app/globals.css"

const InputCareerChoicePage = () => {


    return (
        <div>
            <div>
            <div className="card w-96 bg-base-100 shadow-xl flex-auto">
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">Input Career Choice</h2>
                        <input className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder="Initial"></input>
                        <input className="input input-bordered input-primary w-full max-w-xs" type="password" placeholder="Password"></input>
                        <button className="btn btn-primary w-32" >Submit</button>
                        <p value={errText}></p>
                    </div>
                </div>
            </div>
        </div>
    )


}