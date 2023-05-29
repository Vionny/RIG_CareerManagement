// components/Navbar.tsx
import React from "react";
import Link from "next/link";


const Navbar = () => {
  return (
    <div className="navbar bg-base-100 drop-shadow-md">
      <div className="navbar-start ">
        <a className="btn btn-ghost normal-case text-lg h-8">Career Management</a>
      </div>

      <div className=" navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Division</Link>
          </li>
          <li>
            <Link href="/promotion">Promotion</Link>
          </li>
          <li>
            <Link href="/about">Career Choice</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost normal-case text-base w-40">Hi, Profile Name</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
            <li><Link href="/LoginPage" className="h-8">Logout</Link></li>
          </ul>
         </div>


         <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost normal-case text-base w-44">Even 2022/2023</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 h-max">
            <li><a className="h-8">Odd 2022/2023</a></li>
            <li><a className="h-8">Short 2022/2023</a></li>
            <li><a className="h-8">Odd 2021/2022</a></li>
          </ul>
         </div>
         
      </div>
    </div>
  );
};
export default Navbar;
