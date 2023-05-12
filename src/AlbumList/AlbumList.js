// importing hooks 
import { useEffect, useState } from "react"

// importing Css
import Style from './AlbumList.module.css';
// importing images of the albums
import albumImage from '../Assets/photos.png'

// importing Firebase
import {db} from '../firebaseInit';

// importing Components
import AlbumForm from '../AlbumForm/AlbumForm'
import { addDoc, collection, onSnapshot } from "firebase/firestore";

function AlbumList(){
    const [isForm , setIsForm] = useState(false); // for rendering the albumForm page
    // for storing albums in the state
    const[albums, setAlbums] = useState([]);
    // this hook is used for checking if the album is loading or not
    const[albumLoad, setAlbumLoad] = useState(false);
    // this hook is for opening the current album
    const[viewImages, setViewImages] = useState(null);

    const getAlbums = async() =>{
        const unsub = onSnapshot(collection(db, 'albums') , (snapshot) =>{
            const albumsList = snapshot.docs.map((doc)=>{
                return {
                    id : doc.id,
                    ...doc.data()
                }
            })
            setAlbums(albumsList);
        })
    }   

    useEffect(()=>{
        getAlbums();
    }, [])

    const addAlbum = async (name) =>{
        if (albums.find((a) => a.name === name))
            //return toast.error("Album name already in use.");
        setAlbumLoad(true);
        
        const albumRef = await addDoc(collection(db, 'albums'), {
            name : name,
            created : Date.now()
        });
        setAlbums((prev) => [{id : albumRef.id , name} , ...prev]);
        setAlbumLoad(false);
        // toast sussfully messages
    }

    const handleClick = (name) =>{
        if(viewImages === name) return setViewImages(null);
        setViewImages(name);
    }

    // console.log(albums);

    return (

        <>
           {isForm && <AlbumForm addAlbum = {addAlbum} loading = {albumLoad} />} 
           {/* Conditional rendering if viewImages is null, then it will display the album List
           else it will disply the Imges List of that album */}
           {!viewImages && 
           <div className={Style.mainDiv}>
                <div className={Style.AlbumTop}>
                    <h2>All Albums </h2>
                    <button onClick={() => setIsForm(isForm ? false : true)}>{!isForm ? 'Add Album' : 'Cancle'}</button>
                </div>

                <div className={Style.albumsList}>
                    {albums.map((album, i) =>(
                        <div key = {i} className={Style.album} onClick={()=>handleClick(album.name)}>
                            <img src={albumImage} alt="Albums" />
                            <span>{album.name}</span>
                        </div>
                    ))}
                </div>
            </div>}
           {/* Disply the else conditon */}
        </>
    )
}

export default AlbumList