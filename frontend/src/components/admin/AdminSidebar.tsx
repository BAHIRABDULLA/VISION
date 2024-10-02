import React, { useState } from 'react';
import SideBarLink from './SideBarLink';

const links =[
  {to:'/admin/dashboard',text:'Dashboard'},
  {to:'/admin/users',text:'Users'},
  {to:'/admin/courses',text:'Courses'},
  {to:'/admin/resources',text:'Resources'},
  {to:'/admin/transaction',text:'Transaction'},
]

const AdminSidebar: React.FC = () => {
  const [activeLink,setActiveLink]= useState('/admin/dashboard')
  return (
    <div className="w-72 h-full bg-zinc-500 text-white">
      <h3 className= ' p-5 text-3xl text-neutral-950 font-bold'>VISION</h3>
      <nav className="mt-10">
        <ul>
          {links.map((link)=>(
            <SideBarLink key={link.to} onClick={()=>setActiveLink(link.to)}
             isActive={activeLink===link.to} to={link.to} text={link.text}/>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
