import { updateUserPass } from "@/app/lib/actions";
import resetMail from "@/app/lib/resetmail"
import jwt from 'jsonwebtoken';

interface JwtPayload {

    userEmail: string;
    iat: number;
    exp: number;
      
}

export async function POST(request: Request) {

    const {email} = await request.json()

    const result  = await resetMail(email)
        
    return new Response(JSON.stringify(result))
}

export async function PUT(request: Request) {
        
    const {password1, password2, token} = await request.json()

    if (password1 === password2) {
        
        try {

            const decoded = jwt.verify(token, process.env.AUTH_SECRET!!) as JwtPayload

            const updatePass = await updateUserPass(decoded.userEmail, password1)


        } catch(err) {

            // err
            console.log(err);

            return new Response(JSON.stringify({status: false, message:"reset link is expired"}))        
        }

        return new Response(JSON.stringify({status: true, message:"password changed"}))
    }
}