'use client'
import Script from "next/script";
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Item from "./item";
import { useEffect, useState } from "react";
import { db } from "../lib/firestoresetting";
import { collection, query, orderBy, onSnapshot, where, getDocs } from "firebase/firestore";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface SideList {
    lessonId: string;
    isDone: boolean
}

export default function Sidebar() {
    
    const [lessons, setLessons] = useState<SideList[]>([])
    const pathname = usePathname()
    const router = useRouter()
    
    useEffect(
        () => {
            const lessonsRef = collection(db, "lessons");
            const q = query(lessonsRef, orderBy("index","asc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                axios.get('/api/userprogress')
                .then( (response) => {
                    const lessonArr: SideList[] = []
                    querySnapshot.forEach( doc => {
                        lessonArr.push({
                            lessonId: doc.id,
                            isDone: response.data.lessonsViewed.includes(doc.id)
                        })
                    })
                    setLessons(lessonArr)
                    
                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("email", "==", response.data.email));
                    const unsubscribe2 = onSnapshot(q, async (querySnapshot) => {
                        const lessonsViewed = querySnapshot.docs[0].data().lessonsViewed
                        const lessonArr: SideList[] = []
                        
                        const q = query(lessonsRef, orderBy("index","asc"));
                        const usersQuerySnapshot = await getDocs(q);

                        usersQuerySnapshot.forEach( doc => {
                            lessonArr.push({
                                lessonId: doc.id,
                                isDone: lessonsViewed.includes(doc.id)
                            })
                        })
                        setLessons(lessonArr)
                    })

                    return ()=> unsubscribe2()
                })
                .catch( err => console.log(err) );
            })

            return () => unsubscribe()          
        }
    ,[])

    function handleNext() {
        const lessonId = pathname.split("/")[2]
        const currentIndex = lessons.findIndex( (item)=> item.lessonId === lessonId )
        const nextLesson = lessons[currentIndex+1]?.lessonId ?? ''

        
        axios.post('/api/userprogress', { lessonId, fromBtn: true })
        .catch( err => console.log(err) );

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
                
                    lessons.map( (item,index) => <Item key={`i-${index}`} lessonId={item.lessonId} isDone={item.isDone} />)
                
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