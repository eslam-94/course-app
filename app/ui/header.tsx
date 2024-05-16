import Image from 'next/image'

export default function Header() {
    return (
        <header className="container">
            <Image src="/logo.png" alt="logo-image" width={75} height={75}/>
            <h2>TOKNI TAENASTAN</h2>
        </header>
    )
}