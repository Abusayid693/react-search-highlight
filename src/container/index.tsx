import { HTMLAttributes, ReactChild } from "react";
import { ContextProvider } from "../context";
import Main from "./main";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactChild;
  } 

const Index = ()=>{
    return (
        <ContextProvider>
            <Main/>
        </ContextProvider>
    )
}

export default Index