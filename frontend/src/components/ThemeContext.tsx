import React,{createContext,useContext,useState} from 'react'

type ThemeContextType = {
    theme:string,
    toggleTheme:()=>void
}

const ThemeContext =createContext<ThemeContextType | undefined>

export default ThemeContext