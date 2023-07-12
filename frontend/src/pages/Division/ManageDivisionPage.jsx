'use client'

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/components/UserContext";
import "@/app/globals.css";
axios.defaults.headers.post["Content-Type"] = "application/json";
import ManageDivisionTable from '@/components/ManageDivisionTable'

const ManageDivisionPage = () => {
  const [divisions, setDivisions] = useState([]);
//   const [division, setDivision] = useState({});
  const [loadDiv, setLoadDiv] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState();

  
  useEffect(() =>{
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllDivision`)
        .then((res) => {
            console.log(res.data);
            setDivisions(res.data);
            setLoadDiv(true);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  }, [])

//   if (!loadDiv) return <div></div>;

  return (
    <div className="pl-10 pr-10 py-5 bg-base-200 min-h-screen w-full ">
        <article className="prose base mb-5">
            <h2>Manage Division</h2>
        </article>

        <div className="bg-base-100 card shadow-xl w-full p-3" style={{ height: 470 }}>
                <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Division List</a>
                </div>
                
                </div>
            
                <div className="p-7">
                {divisions ? (
                    <ManageDivisionTable division={divisions} />
                ) : null}
                </div>
            </div>
        


        

        </div>

  );
};

export default ManageDivisionPage;
