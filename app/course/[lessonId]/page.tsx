'use client'
import { db } from "@/app/lib/firestoresetting";
import Copybtn from "@/app/ui/copy";
import axios from "axios";
import { doc, onSnapshot } from "firebase/firestore";
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

    const [lesson, setLesson] = useState<Lesson>()
    
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
        {
            lesson?.sections.map( (item, i) => {
                return (
                    <details key={`s-${i}`}>
                        <summary style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><h2>{item.title}</h2></summary>
                        {
                            item.video &&

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <iframe src={item.video} width={560} height={315}  loading="lazy">loading video .....</iframe>
                            </div>
                        }

                        <div style={{margin: '15px 0'}} dangerouslySetInnerHTML={{ __html: item.content }}/> 

                        {
                        item.codeSnippet &&

                        <div style={{position: 'relative', margin: '15px 0'}}>
                            <Copybtn codeSnippet={item.codeSnippet}/>                                
                            <pre>
                                <code>
                                    {item.codeSnippet.replace(/\\n/g,'\n')}
                                </code>
                            </pre>
                        </div>
                        }
                        
                    </details>
                )
            })
        }
        </>
    )
}