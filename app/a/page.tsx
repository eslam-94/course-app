import { auth } from "@/auth";

export default async function Page() {
    const session = await auth()

    
    if (!session?.user) return null
    
    console.log(session.user);
    

    return (
        <div>
            <h1>{session.user.email}</h1>
        </div>

    )

}