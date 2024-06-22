'use client'
import Image from "next/image";
import { useState } from "react";

export default function Copybtn({
    codeSnippet
}:{
    codeSnippet: string;
}) {
    const [toolTip, setToolTip] = useState("Copy")
    const [url, setUrl] = useState("/clipboard.svg")
    const [text] = useState(codeSnippet)

    const handleClick = () => {
        navigator.clipboard.writeText(text.replace(/\\n/g,'\r\n'))
        setUrl("/clipboard-check.svg")
        setToolTip("Copied")

        setTimeout(() => {
            setToolTip("Copy")
            setUrl("/clipboard.svg")
        }, 1000);
    }

    return (
        <>
        <em style={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}} data-tooltip={toolTip} data-placement="left" >    
            <Image
            onClick={handleClick}
            src={url} 
            alt="clipboard-icon" 
            width={25} 
            height={25}
            />
        </em>
        </>
    )
}
