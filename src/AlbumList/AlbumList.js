// importing hooks 
import { useEffect, useState } from "react"

// importing Css
import Style from './AlbumList.module.css';
// importing images of the albums
import albumImage from '../Assets/photos.png'

// importing Toast 
import { toast } from "react-toastify";


// importing Firebase
import {db} from '../firebaseInit';
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

// importing Components
import AlbumForm from '../AlbumForm/AlbumForm';
import ImageList from "../ImageList/ImageList";


function AlbumList(){
    const [isForm , setIsForm] = useState(false); // for rendering the albumForm page
    // for storing albums in the state
    const[albums, setAlbums] = useState([]);
    // this hook is used for checking if the album is loading or not
    const[albumLoad, setAlbumLoad] = useState(false);
    // this hook is for opening the current album
    const[viewImages, setViewImages] = useState(null);
    // hook for loading
    const[loading, setLoading] = useState(false);

    // this function will show the new album which will added to the DB, in real time.
    const getAlbums = async() =>{
        setLoading(true);
        const albumsRef = collection(db, "albums");
        const albumsSnapshot = await getDocs(
        query(albumsRef, orderBy("created", "desc"))
        );
        const albumsData = albumsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setAlbums(albumsData);
        setLoading(false);
    }   
    // using hook as ComponentDidMount
    useEffect(()=>{
        getAlbums();
    }, [])

    // function for adding new Albums to the DB
    const addAlbum = async (name) =>{
        if (albums.find((a) => a.name === name))
            return toast.error("Album name already in use.");
        setAlbumLoad(true);
        
        const albumRef = await addDoc(collection(db, 'albums'), {
            name : name,
            created : Date.now()
        });
        setAlbums((prev) => [{id : albumRef.id , name} , ...prev]);
        setAlbumLoad(false);
        // toast sussfully messages
        toast.success("Album Added successfully.");
    }

    // Used for redering to the albums folder
    const handleClick = (name) =>{
        if(viewImages === name) return setViewImages(null);
        setViewImages(name);
    }
    // when we will click on the back, in album folder, it will redirect to tthis page
    const handleBack = ()=>{
        setViewImages(null);
    }

    // console.log(albums);
    // Returing the UI
    return (

        <>
           {isForm && <AlbumForm addAlbum = {addAlbum} loading = {albumLoad} />} 
           {/* Conditional rendering if viewImages is null, then it will display the album List
           else it will disply the Imges List of that album */}
           {!viewImages && 
           <div className={Style.mainDiv}>
                <div className={Style.AlbumTop}>
                    <h2>All Albums </h2>
                    <button className={isForm ? Style.cancle : ''}
                    onClick={() => setIsForm(isForm ? false : true)}>{!isForm ? 'Add Album' : 'Cancle'}</button>
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

            {/* Conditional rendering for the ImagesLIst */}
           {viewImages && 
            <ImageList onBack = {handleBack}
            albumId={albums.find((a) => a.name === viewImages).id}
            albumName={viewImages}/>}
        </>
    )
}

export default AlbumList