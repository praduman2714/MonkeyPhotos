// Importing Style 
import Style from './ImageList.module.css'
// Importing Hook and other dependencies from the react.
import { useEffect, useRef, useState } from 'react';
// Importing Toast for showing notifications
import { toast } from "react-toastify";
// Importing Images
import backIconImage from '../Assets/back.png';
import updateImage from '../Assets/edit.png';
import deleteImage from '../Assets/trash-bin.png';
import searchImage from '../Assets/search.png';
import cancleImage from '../Assets/clear.png';

// Importing Spinner
import Spinner from "react-spinner-material";

// Importing Components
import ImageForm from '../ImageForm/ImageForm';
import Courosel from '../Courosel/Courosel';
// Importing dependenies from the firebase.
import { collection, 
    getDocs, 
    query , 
    orderBy, 
    addDoc, 
    Timestamp, 
    doc, 
    deleteDoc, 
    setDoc} from 'firebase/firestore';

import { db } from '../firebaseInit';

// The main function of the ImageList components, it take onBack, albumId, and albumName as props 
function ImageList({onBack, albumId, albumName}){

    // this is for the searchRef
    const searchItem = useRef();
    
    // Hook for localImages, which will render the images while search.
    const[localImages, setLocalImages] = useState([]);
    // Hook for ImagesForm
    const [imageForm, setImageForm] = useState(false);
    // hook for images
    const [images, setImages] = useState([]);
    // hook for chekcing if the work is done, or still on doing
    const [loading, setLoading] = useState(false);
    // hook of searchIntent 
    const [searchIntent, setSearchIntent] = useState(false);
    // hook for setting up loading spinner if any delay happend while adding images
    const [imagesLoading, setImagesLoading] = useState(false);
    // Hook for cheking if the Images is to be updated or not.
    const [updateImageIntent, setUpdateImageIntent] = useState(false);
    // Hook for checking if the images is active , so that it will upadet and view on corosole.
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    // 
    const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);

    // function for taking all the images from the database
    const getImages = async()=>{
        setLoading(true);
        const imagesRef = collection(db, "albums", albumId, "images");
        const imagesSnapshot = await getDocs(
            query(imagesRef, orderBy("created", "desc"))
        );
        const imagesData = imagesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setImages(imagesData);
        setLocalImages(imagesData);
        console.log(localImages);
        setLoading(false);
    }
    // using useEffect as componentDidMount.
    useEffect(()=>{
        getImages();
        // toast.success("Image rendered successfully.");
    },[]);

    // function to add the images, to the albums.

    const handleAddImages = async(name, url)=>{
        setImagesLoading(true);
        const imageRef = await addDoc(collection(db, "albums", albumId, "images"), {
            name,
            url,
            created: Timestamp.now(),
          });
        setImages((prev) => [{ id: imageRef.id, name, url }, ...prev]);
        
        toast.success("Image added successfully.");
        setImagesLoading(false);
    }
    // function to handleUpdating of the images
    const handleUpdate = async ({ title, url }) => {
        setImagesLoading(true);
        const imageRef = doc(db, "albums", albumId, "images", updateImageIntent.id);
    
        await setDoc(imageRef, {
          title,
          url,
        });
    
        const updatedImages = images.map((image) => {
          if (image.id === imageRef.id) {
            return { id: imageRef.id, title, url };
          }
          toast.success("Image Updated successfully.");
          return image;
        });
    
        setImages(updatedImages);
        toast.success("Image updated successfully.");
        setImagesLoading(false);
        setUpdateImageIntent(false);
      };
    // Functional for deleting the images, which is associated with the images
    const handleDelete = async (e, id) => {
        e.stopPropagation();
    
        await deleteDoc(doc(db, "albums", albumId, "images", id));
        const filteredImages = images.filter((i) => i.id !== id);
        toast.success("Image deleted successfully.");
        setImages(filteredImages);
    }

    // Function for the corosole

    // This will handle the next button
    const handleNext = () =>{
        if(activeImageIndex === images.length - 1) return setActiveImageIndex(0);
        setActiveImageIndex((prev) => prev+1);
    }
    // This will handle the prev button
    const handlePrev = () =>{
        if(activeImageIndex === 0) return setActiveImageIndex(images.length - 1);
        setActiveImageIndex((prev) => prev+1);
    }
    // This will handle the cancle button
    const handleCancle = () =>{
        setActiveImageIndex(null);
    }

    // console.log(activeImageIndex);
    const handleImageForm = () =>{
        setImageForm(!imageForm);
    }
    // function for handling searchIntent
    const handleSearchIntent = ()=>{
        if (searchIntent) {
            searchItem.current.value = "";
            getImages();
        }
        setSearchIntent(!searchIntent);
    }
    const serachFromList = async () => {
        console.log(localImages);
        const query = searchItem.current.value;
        // console.log(query);
        if (!query) return localImages;
    
        const filteredImages = localImages.filter((i) => i.name.includes(query));
        setImages(filteredImages);

    }

    // From here we will return the UI
    return (
        <>
           <div className= {Style.wholeDiv}>
            {/* This upper part is the upper div, in which title and all and back functionality are give. */}
                <div className={Style.upperPart}>
                    <div onClick={onBack} className={Style.images}>
                        <img src={backIconImage}  alt='back'/>
                    </div>
                    <h2> {images.length !== 0 ? '': "No"} Images in {albumName}</h2>
                    
                    <div className={Style.srcImg}>
                        {searchIntent && (
                            <div onChange={serachFromList} className={Style.searchBar}>
                                <input type='text' placeholder='Search..' ref={searchItem}/>
                            </div>
                        )}
                        <div onClick={handleSearchIntent}>
                            <img alt='Search'  src={searchIntent ? cancleImage : searchImage} />
                        </div>
                        <button className= {imageForm ? Style.cancleBtn : ''}
                        onClick={handleImageForm}>{imageForm ? 'Cancle' : 'Add Image'}</button>
                    </div>
                </div>
                {/* Conditionoal redering of the imagesForm which will add new iMages */}
                <div>
                    {imageForm && <ImageForm 
                     loading= {imagesLoading}
                     onAdd = {handleAddImages}
                     onUpdate = {handleUpdate}
                     updateImageIntent = {updateImageIntent}
                     albumName = {albumName}/>}
                </div>
                {/* Again conditional Rendering for the images courose, in we can see the images */}
                <div>
                {(activeImageIndex || activeImageIndex === 0) && (
                    <Courosel
                    title={images[activeImageIndex].name}
                    url={images[activeImageIndex].url}
                    onNext = {handleNext}
                    onPrev = {handlePrev}
                    onCancle = {handleCancle}
                    />
                )}
                </div>
                
                {/* Conditional rendering for the spineeer */}
                {loading && (
                    <div className={Style.loader}>
                    <Spinner color="#0077ff" />
                    </div>
                )}
                {/* Again conditoinal rendeing , if the loading hook is false, then it will show us the images list */}
                {!loading && 
                <div className = {Style.imageList}>
                {
                   images.map((img, i) =>(
                    <div 
                        onMouseOver={() => setActiveHoverImageIndex(i)}
                        onMouseOut={() => setActiveHoverImageIndex(null)}
                        onClick={() => setActiveImageIndex(i)}
                        className={Style.image} key = {i}
                    > 
                        <div
                            className={`${Style.update} ${
                            activeHoverImageIndex === i && Style.active
                            }`} >
                            <img onClick={(e) => {
                            e.stopPropagation();
                            
                            setUpdateImageIntent(img);
                            setImageForm(true);
                            }} src={updateImage} alt="update" />

                            <img onClick={(e) => handleDelete(e, img.id)}
                             src={deleteImage} alt="delete" />
                        </div>


                        <img src={img.url} alt='Images' />
                        <span>{img.name}</span>
                        
                    </div>
                   ))
                }
            </div>}
           </div>
        </>
    )
}
export default ImageList;