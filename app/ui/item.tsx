import { CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';

interface ItemProps {
    lessonId: string;
    isDone: boolean;
}

export default function Item({lessonId, isDone}: ItemProps) {

    function toggleOnClick() {
        axios.post('/api/userprogress', { lessonId })
        .catch( err => console.log(err) );
    }
    
    return (
        <div className="progress-item">
            <p>
                <Link href={`/course/${lessonId}`}>
                    {lessonId}
                </Link>
            </p>            
            {
                isDone 
                ?
                <div onClick={toggleOnClick} style={{"color":"green","cursor":"pointer"}}>
                <CheckCircleIcon width={30} height={30}/>
                </div>
                :
                <div onClick={toggleOnClick} style={{"width":"25px","height":"25px","backgroundColor":"black", "borderRadius": "50%","cursor":"pointer"}}></div>
            }
        </div>
    
    )
}