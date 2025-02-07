import React from 'react'

interface searchProps {
    placeholder:string
    value:string;
    onChange:any
}

const Search:React.FC <searchProps>= ({placeholder,value,onChange}) => {
  return (
    <input placeholder={placeholder} value={value} onChange={onChange} className="p-2 border border-gray-700 dark:border-gray-300 rounded w-1/2
     bg-white dark:bg-gray-800 text-gray-700 dark:text-white"/>
  )
}

export default Search