import { useState,useRef } from "react";
import {db} from "../firebaseConfig";
import {collection,addDoc} from "firebase/firestore";

import "./CreateAlbum.css";
function CreateAlbum(){

    //CREATING A ALBUM TITLE AND SENDING IT TO THE DATABASE
    const[title,setTitle] = useState("");
    const titleRef = useRef(null);

    function handleClear(){
        titleRef.current.value="";
        setTitle("");
    }

    //COLLECT THE TITLE NAME AND ADD IT TO THE DATABASE
    async function addAlbum(){
        await addDoc(collection(db,"albums"),{
            name : title,
            images:[],
        })
        handleClear();
        
    }

    return(
        <div className='createAlbum-container'>
            <h2>Create an Album</h2>
            <div className="createAlbum-input-container">
                <input  ref={titleRef} onChange={(e)=>setTitle(e.target.value)} placeholder="Album Name" value={title} required/>
                <button onClick={()=>handleClear()} className="btn clear-btn">Clear</button>
                <button onClick={addAlbum} className="btn">Create</button>
            </div>
            
        </div>
    )
}

export default CreateAlbum;