"use client";
import Image from "next/image";
import { Input, Button } from "@material-tailwind/react";
import { useReducer } from "react";
import { ComplexNavbar } from "@/components/navbar/Navbar";
import { SidebarWithLogo } from "@/components/sidebar/sidebar";
declare module "@material-tailwind/react" {
  interface ButtonProps {
    placeholder?: string;
  }
}

const reducers = (state:any, action:any)=>{
  switch (action.type) {
    case "INCREMENT":
      return {count: state.count + 1}

      case "DECREMENT":
        return {count: state.count - 1}
   
  
    default:
       return state
  }

}
export default function Home() {
    const [state, dispatch] = useReducer(reducers, {count : 0})
  return(
    <>
    <div>
  
      <h1>{state.count}</h1>

      <button onClick={()=>dispatch({type: "INCREMENT"})}>INCREMENT</button>
      <button onClick={()=> dispatch({type: "DECREMENT"})}> DECREMENT</button>
      
    </div>
    </>

  )
}
