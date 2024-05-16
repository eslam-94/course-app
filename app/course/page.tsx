import Sidebar from "../ui/sidebar";
import Image from "next/image";
import Logout from "../ui/logout";

export default function Course() {
    return (
      <>
      <Logout/>
      <main className="container">
        <hgroup>
            <div>
                <h1>Lesson Header</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum has been the industrys standard dummy text ever since the 1501s
                when an unknown printer took a galley of type and scrambled it to make a type specimen book
                It has survived not only five centuries but also the leap into electronic typesetting
                remaining essentially unchanged It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages and more recently with desktop publishing software like Aldus PageMaker 
                including versions of Lorem Ipsum</p>
            </div>
            <Image src="/placeHolder.png" alt="image-bot" width={300} height={300}/>    
        </hgroup>

        <div className="grid navigate">
            <button>PREVIOUS LESSON</button>
            <button>NEXT LESSON</button>
        </div>
        <Sidebar/>  
      </main>
      </>
    );
  }
  
