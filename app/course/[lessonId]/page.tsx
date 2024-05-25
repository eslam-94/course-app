'use client'
import { db } from "@/app/lib/firestoresetting";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

interface Lesson {
        content: string;
        index: number;
        name: string;
}

export default function LessonPage({params}:{
    params:{
        lessonId: string
    }
}) {

    const [lesson, setLesson] = useState<Lesson>({
        content: "",
        index: 0,
        name:"",
    })
    
    useEffect(
        () => {

            const query = doc(db, "lessons", params.lessonId);
            
            const unsubscribe = onSnapshot(query, (doc) => {

                const fetchedLesson = doc.data() as Lesson

                setLesson(fetchedLesson)
            })

            return () => unsubscribe()           
        }
    ,[])

    return (
        <>
        <h1>lesson: {lesson?.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: lesson?.content }}/>  
        </>
    )
}