import { getFireUser } from '@/app/lib/firestoredb'
import { db } from '@/app/lib/firestoresetting'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { STATUS_CODES } from 'http'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {

    const { lessonId, fromBtn } = await request.json()
    
    try {
        
        const token = cookies().get('user-token')

        const decoded = jwt.verify(token?.value!!, process.env.AUTH_SECRET!!) as JwtPayload

        const q = query(collection(db, "users") , where('email', '==', decoded.email));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.docs[0].exists()) return new Response("error")

        const userRef = doc(db, "users", querySnapshot.docs[0].id);

        if (fromBtn) {
            if (!querySnapshot.docs[0].data().lessonsViewed.includes(lessonId)) {
                await updateDoc(userRef, {
                    lessonsViewed: arrayUnion(lessonId)
                });
            }
        
        } else {
   
            if (querySnapshot.docs[0].data().lessonsViewed.includes(lessonId)) {
                await updateDoc(userRef, {
                    lessonsViewed: arrayRemove(lessonId)
                });
            } else {
                await updateDoc(userRef, {
                    lessonsViewed: arrayUnion(lessonId)
                });
            }
        }
        
        return new Response(STATUS_CODES.OK)

    } catch (error) {

        console.log(error);

        return new Response(JSON.stringify("error"))

    }
}

export async function GET(request: Request) {
    
    try {
        
        const token = cookies().get('user-token')

        const decoded = jwt.verify(token?.value!!, process.env.AUTH_SECRET!!) as JwtPayload

        const user = await getFireUser(decoded.email)

        return new Response(JSON.stringify({email: decoded.email, lessonsViewed: user?.lessonsViewed}))

    } catch (error) {

        console.log(error);

        return new Response(JSON.stringify("error getting user progress"))
    }
}