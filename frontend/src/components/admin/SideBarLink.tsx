import React from 'react'
import { Link } from 'react-router-dom';


interface SideBarLinkProps {
    to:string;
    text:string;
    isActive:boolean;
    onClick:()=>void
}
const SideBarLink:React.FC<SideBarLinkProps> = ({to,text,isActive,onClick}) => {
  return (
    <li className={` ${isActive?'bg-gray-700':''}`}>
        <Link to={to} onClick={onClick} 
        className='block py-5 text-2xl px-4 hover:bg-gray-700'>{text}</Link>
    </li>
  )
}

export default SideBarLink