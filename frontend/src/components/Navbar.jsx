
import React from "react";
import Link from "next/link";


const Navbar = () => {
  return (
    <div className="navbar bg-base-100 drop-shadow-md">
      <div className="navbar-start ">
        <a className="btn btn-ghost normal-case text-lg h-8" href="/home">Career Management</a>
      </div>

      <div className=" navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Division</Link>
          </li>
          <li>
            <Link href="/promotion/register">Promotion</Link>
          </li>
          <li>
            <Link href="/career/choice">Career Choice</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost normal-case text-base w-40">Hi, Profile Name</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
            <li><Link href="/" className="h-8">Logout</Link></li>
          </ul>
         </div>


         <div className="btn btn-ghost">
            <select className="normal-case text-base bg-base-100">
              <option>Even 2022/2023</option>
              <option>Odd 2022/2023</option>
              <option>Short 2022/2023</option>
            </select>
        </div>
         
      </div>
    </div>
  );
};
export default Navbar;
