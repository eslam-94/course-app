import { getFireUser } from '@/app/lib/firestoredb'
import { db } from '@/app/lib/firestoresetting'
import { auth } from '@/auth'
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { STATUS_CODES } from 'http'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    const { lessonId, fromBtn } = await request.json()

    const session = await auth()

    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    
    try {
        
        const q = query(collection(db, "users") , where('email', '==', session.user?.email));

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

    const session = await auth()

    if (!session?.user?.email) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    const user = await getFireUser(session.user.email)

    return NextResponse.json({email: user?.email, lessonsViewed: user?.lessonsViewed})
}