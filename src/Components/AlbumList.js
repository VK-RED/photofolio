import CreateAlbum from "./CreateAlbum";
import "./AlbumList.css";
import ImageList from "./ImageList";
import { useEffect, useState } from "react";
import {db} from "../firebaseConfig";

import { collection, doc, onSnapshot,addDoc } from "firebase/firestore";

export default function AlbumList(props){

    //ALBUMINPUT IS USED FOR CONDITIONAL RENDERING THE INPUT FIELD FOR UPLOADALBUMS
    //SHOWALBUMS IS USED FOR CONDITIONAL RENDERING OF THE ALBUMLIST
    const [albumInput, setAlbumInput] = useState(false);
    const [showAlbums, setShowAlbums] = useState(true);

    //ALBUMS WILL HAVE ALL THE ALBUM
    const[albums, setAlbums] = useState([]);

    //THIS WILL HOLD THE DETAILS ABOUT THE CLICKED ALBUM
    const[folder,setFolder] = useState([]);

    //WHEN THE COMPONENT GET'S LOADED APPLY AN PERSISTENT CONNECTION 
    useEffect(()=>{

        onSnapshot((collection(db,"albums")),(snapShot)=>{
            const arr = snapShot.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data(),
                }
            });
            
            setAlbums(arr);
        })
        
    },[])

    //TOGGLING THE INPUT FIELD FOR ALBUMS

    function handleAlbums(id,album){
        setShowAlbums(!showAlbums);

        if((typeof id ==='string')){
            setFolder(album);
        }
    
        
    }


    /*
        WHEN A FILE HAS BEEN CLICKED
        COLLECT THE IMAGES ARRAY AND PASS IT TO THE IMAGELIST
    */
    

    return(

        <>
            {
                showAlbums 
                
                    
                        ?<div>
                            {/* CREATEALBUM COMP WILL ONLY RENDER WHEN ALBUMINPUT IS SET TRUE */}
            
                            {albumInput && <CreateAlbum />}
            
                            <div className="album-list-header">
                                <h3>Your Albums</h3>
                                <button onClick={()=>setAlbumInput(!albumInput)} className="add-albm-btn">{!albumInput? "Add Album" : "Cancel"}</button>
                            </div>
            
                            <div className = "albumListDisplay">
            
                                {
                                    albums.map((album)=>{

                                        return(
                                            (<div key = {album.id} onClick = {()=>handleAlbums(album.id,album)}  className = "albumContainer">
                                            <div className="albumImageContainer">
                                                <img src = "https://iridescent-faloodeh-3725ab.netlify.app/assets/photos.png"/>
                                            </div>
                                            <h3 className = "albumName">{album.name}</h3>
                                        </div>)
                                        )
                                    }
                                        
                                    )
                                }
                            </div>
        
                        </div>
                        
                        :<ImageList 
                            handleAlbums={handleAlbums}
                            folder={folder}
                         />
            }

        </>
    )
}

















{/* ALBUMLIST LOGIC */}

            {/* {albumInput && <CreateAlbum />}

            <div className="album-list-header">
                <h3>Your Albums</h3>
                <button onClick={()=>setAlbumInput(!albumInput)} className="add-albm-btn">{!albumInput? "Add Album" : "Cancel"}</button>
            </div>

            <div className = "albumListDisplay">

                {
                    albums.map((album)=>
                        (<div  className = "albumContainer">
                            <div className="albumImageContainer">
                                <img src = "https://iridescent-faloodeh-3725ab.netlify.app/assets/photos.png"/>
                            </div>
                            <h3 className = "albumName">{album.name}</h3>
                        </div>)
                    )
                }

            </div> */}