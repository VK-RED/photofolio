import './Upload.css';
import { useState,useRef,useEffect } from 'react';

function Upload({folderName, addFile,imgName,imgUrl,handleAdd,handleUpdate}){

    const[title,setTitle]= useState("");
    const[url,setUrl] = useState("");

    const titleRef = useRef(null);
    const urlRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[]);
    
    //WHEN THE COMPONENT IS IN THE UPDATE PHASE THEN WE SET THE TITLE
    useEffect(()=>{
        if(!addFile){
            setTitle(imgName);
            setUrl(imgUrl);
        }
    },[imgName])

    //HANDLING THE ADD BUTTON
    function add(data){
        handleAdd(data);
        handleClear();
    }

    //HANDLING THE UPDATE BUTTON
    function updateHandler(data){
        handleUpdate(data);
        handleClear();
    }
    
    //CLEARING THE INPUT FIELDS
    function handleClear(){
        setTitle("");
        setUrl("");
        titleRef.current.value = "";
        urlRef.current.value="";
        titleRef.current.focus();
    }

    return(
        <>
            <div className = "uploadContainer">
                <form onSubmit={(e)=>{e.preventDefault()}} className='uploadForm'>

                    <h1 className='formHeader'>
                        {addFile ? `Add Image to this ${folderName}` : `Update Image ${imgName}`} 
                    </h1>

                    <input onChange={(e)=> setTitle(e.target.value)} ref={titleRef} type = "text" placeholder = "Title"  value = {title} required/>
                    <input onChange={(e)=>setUrl(e.target.value)} ref={urlRef} type = "url" placeholder = "Image URL"  value = {url} required/>

                    <div className='buttonContainer'>

                        <button onClick = {()=>handleClear()} className = "btn clear-btn">Clear</button>
                        {addFile 

                            ?<button onClick={()=>add({title:title,url:url})} className='btn add-btn' > Add </button>
                            :<button onClick={()=>updateHandler({title:title,url:url})} className='btn update-btn'>Update</button>
                        
                        }

                    </div>

                    

                </form>  
            </div>
        </>
    )
}

export default Upload;