'use client'
export default function Copybtn() {
    const handleClick = () => {
        console.log('click');
        const copyContent = document.getElementById('copy-content')
        navigator.clipboard.writeText(copyContent?.innerText!!)
    }

    return <button onClick={handleClick}>Copy lesson</button>
}