'use client'

const TestScheduleTable = ()=>{

    return (
    
        <div className="card w-full bg-base-100 ">
                    <div className="card-body p-3 w-full">
                        <div className="card-title justify-between">
                            <p className="card-title m-3 mb-1">Promotion Registrant</p>
                        </div>
                        
                        <div className="max-h-96 h-96 overflow-auto p-5 ">
                            <table className="table table-compact w-full border text-center">
                                {/* head */}
                                <thead>
                                <tr>                                 
                                    <th className="sticky w-30 top-0 text-center" onClick={() => handleSort("initial")}></th>
                                    
                                </tr>
                                </thead>
                                <tbody>

                                {/* {regist.map((reg, index) => {
                                    return <tr key={index}  className="clickable hover border-1" onClick={()=>{setSelectedCan(reg.initial)}}>
                        
                                        <td className="border">{reg.initial}</td>
                                        <td className="whitespace-normal w-48 border"></td>
                                        <td className="whitespace-normal w-48 border"></td>
                                    </tr>
                                })} */}
                                </tbody>
                            </table>
                            <button className="btn btn-outline btn-info m-2 text-sm" onClick={() => handleEditClick(regist)}>Edit All</button>
                            </div>
                    </div>
                </div>
    )

}


export default TestScheduleTable;
