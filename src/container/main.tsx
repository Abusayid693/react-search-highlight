import React, { useEffect } from "react";
import { SET_DATA } from '../const';
import { useContext } from "../context";

const data = [{
    heading: 'Rehan is good',
    title: 'I am eeatomg food'
},
{
    heading: 'AI is the future',
    title: 'I love ai and machine'
},
]


const Index = ()=>{

    const [state, dispatch] = useContext()

    useEffect(()=>{
        dispatch?.({type:SET_DATA, payload: data })
    },[dispatch])

    console.log('state :',state)


    return (
        <React.Fragment>
            <input placeholder="search here"/>
            <ul>
                <li>item 1</li>
                <li>item 1</li>
                <li>item 1</li>
                <li>item 1</li>
                <li>item 1</li>
            </ul>
        </React.Fragment>
    )
}

export default Index