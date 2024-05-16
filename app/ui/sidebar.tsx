'use client'
import { useState } from "react";
import Item from "./item";
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {

    const [offset, setOffset] = useState(0)

    function handleClick() {
        setOffset(prev => prev === 0 ? 300 : 0 )
    }

    return (
        <>
  
        <div id="sidebar" style={{"left": `${offset-300}px`}}>

            <h4>LESSONS:</h4>

            <Item lesson={"indtroduction"} isDone={true}/>
            <Item lesson={"lesson 1"} isDone={false}/>
            <Item lesson={"lesson 2"} isDone={false}/>
            <Item lesson={"lesson 3"} isDone={false}/>
            <Item lesson={"lesson 4"} isDone={false}/>
            <Item lesson={"lesson 5"} isDone={false}/>
            <Item lesson={"lesson 6"} isDone={false}/>
            <Item lesson={"lesson 7"} isDone={false}/>
            <Item lesson={"lesson 8"} isDone={false}/>
            <Item lesson={"lesson 9"} isDone={false}/>
            <Item lesson={"lesson 10"} isDone={false}/>

        </div>
        
        <div id="arrow" onClick={handleClick} style={{"left": `${offset}px`}}>
            <ArrowRightCircleIcon/>
        </div>
        </>
        
    )
}