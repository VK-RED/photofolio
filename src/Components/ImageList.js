import "./ImageList.css";
import {useState,useEffect} from 'react';
import {db} from "../firebaseConfig";
import {collection,doc,addDoc,onSnapshot, setDoc} from "firebase/firestore"
import Upload from "./Upload";

function ImageList({handleAlbums,folder}){

    const[imgArr, setImgArr] = useState([]);
    const[tarInd, setTarInd] = useState(-1);
    const[showInput, setShowInput] = useState(false);
    const[addFile, setAddFile] = useState(true);
    const[imgName, setImgName] = useState("");
    const[imgUrl, setImgUrl] = useState("");

    useEffect(()=>{

        //WHEN THE COMPONENT IS LOADED WE ESTABLISH A PERSISTENT CONNECTION
        onSnapshot(doc(db,"albums",folder.id),(doc)=>{
            setImgArr(doc.data().images);
        })

    },[])

    //ADDING IMAGES TO THE DATABASE
    function handleAdd(data){
        
        async function addImages(){
            await setDoc(doc(db,"albums",folder.id),{
                name:folder.name,
                images:[data,...imgArr]
            })
        }
        addImages();

    }

    //UPDATING THE IMAGES IN DATABASE
    function handleUpdate(data){
        let arr = imgArr;
        arr[tarInd] = data;
        
        async function updateImages(){
            await setDoc(doc(db,"albums",folder.id),{
                name:folder.name,
                images:arr,
            })
        }

        updateImages();
    }

    //DELETING THE IMAGES FROM DATABASE
    function handleDelete(targetInd){

        const arr = imgArr.filter((data,ind)=>(ind!=targetInd));

        async function deleteImages(){
            await setDoc(doc(db,"albums",folder.id),{
                name:folder.name,
                images:arr,
            })
        }

        deleteImages();
    }

    //COLLECTING THE TARGET INDEX, IMAGE NAME, IMAGE URL
    // WHEN THE EDIT BUTTON IS CLICKED AND 
    // MAKING THE UPLOAD COMPONENT VISIBLE

    function handleEdit(targetInd,t,url){
        setTarInd(targetInd);
        setAddFile(false);
        setImgName(t);
        setImgUrl(url);
        setShowInput(true);
    }

    //MAKING THE UPLOAD COMPONENT UNVISIBLE & MAKING THE DEFAULT AS ADDING FILE
    function handleCancel(){
        setShowInput(false);
        setAddFile(true);
    }
    
    

    return(
        <>
            {showInput && <Upload 

                            folderName = {folder.name}
                            addFile = {addFile}
                            imgName = {imgName}
                            imgUrl = {imgUrl}
                            handleAdd = {handleAdd}
                            handleUpdate = {handleUpdate}

                            />}

            
            <div className='image-header'>
                <button onClick={handleAlbums} className='btn'>Back</button>
                <h2>{imgArr.length==0 ? "No images found in the album" : `Images in ${folder.name}`}</h2>

                {!showInput
                    
                    ?<button onClick = {()=>setShowInput(true)} className="btn ad-btn">Add Image</button>
                    :<button onClick = {handleCancel} className="btn">Cancel</button>
                }

            </div>

            <div className="image-container">
                {
                    imgArr.map((img,ind)=>{
                        return(
                            <div key ={ind} className="img-container">
                                <div className = "img-photo">
                                    <img src = {img.url}/>
                                </div>
                                <h3 className="img-title">{img.title}</h3>
                                <div className="btns">
                                    <button onClick={()=>handleEdit(ind,img.title,img.url)} className="btn">Edit</button>
                                    <button onClick={()=>handleDelete(ind)} className="btn">Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
        </>
    )
}

export default ImageList;

