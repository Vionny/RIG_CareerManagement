'use client'

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/components/UserContext";
import "@/app/globals.css";
axios.defaults.headers.post["Content-Type"] = "application/json";

const DivisionPage = () => {
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState({});
  const [loadDiv, setLoadDiv] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState();
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);
  const { user } = useContext(UserContext);
  const [errText, setErrText] = useState("");

  async function getDivisionNow(divisionid) {
    const divisionResponse = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/getDivisionByRole/" + divisionid
    );
    const divisionData = divisionResponse.data[0];
    setDivision(divisionData);

    const roleResponse = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/getRoleByDivision/" + divisionid
    );
    const roleData = roleResponse.data;
    setRoles(roleData);

    for (const role of roleData) {
      await getMembers(role.roleid);
    }
  }

  async function getMembers(roleid) {
    const membersResponse = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/getTeamMember/" + roleid
    );
    const membersData = membersResponse.data;
    setMembers(membersData);
  }
  

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + "/getAllDivision")
      .then((res) => {
        setDivisions(res.data);
        setLoadDiv(true);
      });
  }, []);

  if (!loadDiv) return <div></div>;

  return (
    <div className="pl-10 pr-10 py-5 bg-base-200 min-h-screen w-full ">
        <article className="prose base mb-5">
            <h2>Division List</h2>
        </article>

        <div className="dropdown justify-start w-full mb-5">
            <label
            tabIndex={0}
            className="btn btn-ghost bg-base-100 flex justify-start normal-case card-title"
            >
            {selectedDivision !== undefined
                ? selectedDivision.divisionname
                : "Choose Division"}
            </label>
            <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max"
            >
            {divisions.map((div, index) => (
                <li
                key={index}
                onClick={() => {
                    setSelectedDivision(div);
                    getDivisionNow(div.divisionid);
                }}
                >
                <a className="h-8 font-semibold">{div.divisionname}</a>
                </li>
            ))}
            </ul>
        </div>

        <div className="card bg-base-100 w-full h-72 p-5">
            <div className="card-body h-full p-0">
            <h2 className="card-title">
                {selectedDivision !== undefined ? selectedDivision.divisionname : ""}
            </h2>
            {selectedDivision !== undefined ? (
                <p>{selectedDivision.divisiondescription}</p>
            ) : (
                <p></p>
            )}
            </div>
        </div>

        <div className="flex flex-row gap-x-5 mt-10 h-72 min-h-fit">
            <div className="card bg-base-100 w-1/2 p-5">
            <div className="card-body p-0">
                {roles.map((role, index) => (
                <div key={index}>
                    <h2 className="card-title">{role.rolename}</h2>
                    <p>{role.rolerequirements}</p>
                </div>
                ))}
            </div>
            </div>

            <div className="card bg-base-100 w-full">
            <div className="card-body h-72">
                <div className="card-title justify-between">
                <p className="card-title mb-2">Team Member</p>
                </div>
                <div className="overflow-auto">
                <table className="table table-compact w-full">
                    <thead>
                    <tr>
                        <th>Initial</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((mem, index) => (
                        <tr key={index}>
                        <td>{mem.initial}</td>
                        <td>{mem.assistantname}</td>
                        <td>{mem.rolename}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        </div>

  );
};

export default DivisionPage;
