import { signOut } from "@/auth";

export default function Logout() {

    return (
        <form
        className="container"
        action={async () => {
            'use server';
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