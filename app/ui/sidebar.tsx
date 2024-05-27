'use client'
import Script from "next/script";
import Item from "./item";
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { db } from "../lib/firestoresetting";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface SideList {
    lessonId: string;
    isDone: boolean
}

export default function Sidebar() {
    const [lessons, setLessons] = useState<SideList[]>([
        {
          "lessonId": "lesson-1",
          "isDone": true
        },
        {
          "lessonId": "lesson-2",
          "isDone": true
        },
        {
          "lessonId": "lesson-3",
          "isDone": true
        },
        {
          "lessonId": "lesson-4",
          "isDone": false
        },
        {
          "lessonId": "lesson-5",
          "isDone": false
        },
        {
          "lessonId": "lesson-6",
          "isDone": false
        },
        {
          "lessonId": "lesson-7",
          "isDone": true
        },
        {
          "lessonId": "lesson-8",
          "isDone": true
        },
        {
          "lessonId": "lesson-9",
          "isDone": false
        },
        {
          "lessonId": "lesson-10",
          "isDone": false
        },{
            "lessonId": "lesson-1",
            "isDone": true
          },
          {
            "lessonId": "lesson-2",
            "isDone": true
          },
          {
            "lessonId": "lesson-3",
            "isDone": true
          },
          {
            "lessonId": "lesson-4",
            "isDone": false
          },
          {
            "lessonId": "lesson-5",
            "isDone": false
          },
          {
            "lessonId": "lesson-6",
            "isDone": false
          },
          {
            "lessonId": "lesson-7",
            "isDone": true
          },
          {
            "lessonId": "lesson-8",
            "isDone": true
          },
          {
            "lessonId": "lesson-9",
            "isDone": false
          },
          {
            "lessonId": "lesson-10",
            "isDone": false
          }
      ])
    const pathname = usePathname()
    const router = useRouter()

    useEffect(
        () => {
            const lessonsRef = collection(db, "lessons");
            const q = query(lessonsRef, orderBy("index","asc"));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const lessonArr: SideList[] = []

                querySnapshot.forEach( doc => {
                    lessonArr.push({lessonId: doc.id, isDone: !!localStorage.getItem(doc.id)})
                })

                setLessons(lessonArr)
            })

            return () => unsubscribe()          
        }
    ,[])

    function handleNext() {
        const id = pathname.split("/")[2]
        const currentIndex = lessons.findIndex( (item)=> item.lessonId === id )
        const nextLesson = lessons[currentIndex+1]?.lessonId ?? ''

        localStorage.setItem(nextLesson, "1")

        setLessons( prev => {
            const lessonIndex = lessons.findIndex(lesson => lesson.lessonId === id);
            // Check if the lesson was found
            if (lessonIndex !== -1) {
                // Update the isDone property of the found object
                prev[lessonIndex].isDone = true;
            }
            return prev
        })
        
        router.push(`/course/${nextLesson}`)
    }
    
    function handlePrevious() {
        const id = pathname.split("/")[2]
        const currentIndex = lessons.findIndex( (item)=> item?.lessonId === id )
            const previousLesson = lessons[currentIndex-1]?.lessonId ?? ''
            router.push(`/course/${previousLesson}`)
    }

    return (
        <>
        <div id="arrow" >
            <ArrowRightCircleIcon/>
        </div>
        <div id="sidebar">
        <h4>LESSONS:</h4>
            {
                lessons.map( (item,index) => <Item key={`i-${index}`} lesson={item.lessonId} isDone={item.isDone} />)
            }
        </div>
        
        

        <div className="grid navigate">
            { pathname !== '/course' && <button onClick={handlePrevious}>PREVIOUS LESSON</button> }

            <button onClick={handleNext}>NEXT LESSON</button>
                        
        </div>
        
        <Script id="siderbarjs">
            {
                `
                document.getElementById('arrow').addEventListener('click', () => {
                    const isClosed = document.getElementById("sidebar").style.left === '-300px'
                    if (isClosed) {
                        document.getElementById("sidebar").style.left = '0px'
                        document.getElementById("arrow").style.left = '300px'
                    } else {
                        document.getElementById("sidebar").style.left = '-300px'
                        document.getElementById("arrow").style.left = '0px'
                    }
                })
                `
            }           
        </Script>
        </>
    )
}