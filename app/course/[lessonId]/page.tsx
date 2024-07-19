'use client'
import { db } from "@/app/lib/firestoresetting";
import Copybtn from "@/app/ui/copy";
import axios from "axios";
import { doc, onSnapshot } from "firebase/firestore";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";

interface Section {
    title: string;
    content: string;
    codeSnippet: string;
    video: string;
}

interface Lesson {
    content: string;
    index: number;
    name: string;
    sections: Section[],
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
        name: "",
        index: 0,
        sections: []
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
        <div dangerouslySetInnerHTML={{ __html: lesson.content}}/>
        <Script id="copybtnjs">
                {
                    `
                    function copy(code,icon) {
                    const codeText = document.getElementById(code).innerText

                    document.getElementById(icon).src = '/clipboard-check.svg'
                    navigator.clipboard.writeText(codeText)
                    
                    setTimeout(() => {
                        document.getElementById(icon).src = '/clipboard.svg'
                    }, 1000);
                    
                    }
                    `
                }           
        </Script>
        </>
    )
}