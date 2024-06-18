'use client'
import { db } from "@/app/lib/firestoresetting";
import axios from "axios";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";

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
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollContainerRef = useRef(null);

    const [lesson, setLesson] = useState<Lesson>({
        content: "",
        index: 0,
        name:"",
    })
    
    useEffect(
        () => {
            // real-time update of the lesson with firestore db
            const query = doc(db, "lessons", params.lessonId);
            
            const unsubscribe = onSnapshot(query, (doc) => {

                const fetchedLesson = doc.data() as Lesson

                setLesson(fetchedLesson)
            })

            // after two min on page mark lesson as completed
            const timeoutId = setTimeout(() => {
                axios.post('/api/userprogress', { lessonId: params.lessonId, fromBtn: true })
                .catch( err => console.log(err) );
                
              }, 120_000);
          
            timeoutRef.current = timeoutId;

            // mark lesson as completed if user scrolled to end
            function handleScroll() {
                const scroll = window.scrollY + window.innerHeight
                const body = document.body.scrollHeight
                const offSet = body - 300

                if (scroll >= offSet) {
                    axios.post('/api/userprogress', { lessonId: params.lessonId, fromBtn: true })
                    .catch( err => console.log(err) );
                }
            }

            window.addEventListener('scrollend', handleScroll);

            return () => {
                unsubscribe()
                clearTimeout(timeoutRef.current as NodeJS.Timeout)
                window.removeEventListener('scroll', handleScroll)
            }
        }
    ,[])

    return (
        <>
        <details open>
            <summary style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><h1>lesson: {lesson?.name}</h1></summary>
            <div dangerouslySetInnerHTML={{ __html: lesson?.content }}/> 
        </details>
        </>
    )
}