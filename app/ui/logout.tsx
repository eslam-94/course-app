import { cookies } from 'next/headers'
import { signOut } from "@/auth";

export default function Logout() {

    return (
        <form
        className="container"
        action={async () => {
            'use server';
            cookies().delete('user-token')
            await signOut();
        }}
        >
            <input
            style={{"width": "150px"}}
            type="submit"
            value="Log Out"
            />
        </form>
    )
}