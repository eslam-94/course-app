import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ItemProps {
    lesson: string;
    isDone: boolean;
}

export default function Item({lesson, isDone}: ItemProps) {
    
    return (
        <div className="progress-item">
            <p>
                <Link href={`/course/${lesson}`}>
                    {lesson}
                </Link>
            </p>            
            {
                isDone 
                ?
                <div style={{"color":"green"}}>
                <CheckCircleIcon width={30} height={30}/>
                </div>
                :
                <div style={{"width":"25px","height":"25px","backgroundColor":"black", "borderRadius": "50%"}}></div>
            }
        </div>
    
    )
}