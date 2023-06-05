"use client"
import "@/app/globals.css"
const ViewSnP= ()=>{


    return(
        <div className="min-h-screen  w-full ">
            <div className="bg-base-200 flex justify-center  w-full ">
                <p className="font-bold text-left ">Semester & Period</p>
                
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-title justify-between">
                            <p className="text-lg text-left">Semester List</p>
                            <button className="btn text-xs bg-blue-700 h-0">+ Add</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr className="hover">
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>
        </div>
    )
}

export default ViewSnP