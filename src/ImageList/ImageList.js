import Style from './ImageList.module.css'
import { useEffect, useState } from 'react';
// Importing Images
import backIconImage from '../Assets/back.png';
import updateImage from '../Assets/edit.png';
import deleteImage from '../Assets/trash-bin.png';


import ImageForm from '../ImageForm/ImageForm';
import Courosel from '../Courosel/Courosel';
import { collection, getDocs, query , orderBy, addDoc, Timestamp, doc, deleteDoc, setDoc} from 'firebase/firestore';
import { db } from '../firebaseInit';

function ImageList({onBack, albumId, albumName}){

    const [imageForm, setImageForm] = useState(false);
    // hook for images
    const [images, setImages] = useState([]);
    // hook for chekcing if the work is done, or still on doing
    const [loading, setLoading] = useState(false);
    // hook of searchIntent 
    const [searchIntent, setSearchIntent] = useState(false);
    // hook for setting up loading spinner if any delay happend while adding images
    const [imagesLoading, setImagesLoading] = useState(false);

    const [updateImageIntent, setUpdateImageIntent] = useState(false);

    const [activeImageIndex, setActiveImageIndex] = useState(null);
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
    }

    useEffect(()=>{
        getImages();
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
        setImagesLoading(false);
    }

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
          return image;
        });
    
        setImages(updatedImages);
        //toast.success("Image updated successfully.");
        setImagesLoading(false);
        setUpdateImageIntent(false);
      };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
    
        await deleteDoc(doc(db, "albums", albumId, "images", id));
        const filteredImages = images.filter((i) => i.id !== id);
        setImages(filteredImages);
    }

    // Function for the corosole
    const handleNext = () =>{
        if(activeImageIndex === images.length - 1) return setActiveImageIndex(0);
        setActiveImageIndex((prev) => prev+1);
    }

    const handlePrev = () =>{
        if(activeImageIndex === 0) return setActiveImageIndex(images.length);
        setActiveImageIndex((prev) => prev+1);
    }

    const handleCancle = () =>{
        setActiveImageIndex(null);
    }

    // console.log(activeImageIndex);
    const handleImageForm = () =>{
        setImageForm(!imageForm);
    }
    return (
        <>
           <div className= {Style.wholeDiv}>
                <div className={Style.upperPart}>
                    <div onClick={onBack} className={Style.images}>
                        <img src={backIconImage}  alt='back'/>
                    </div>
                    <h2>No Images in {albumName}</h2>
                    <div>
                        <button onClick={handleImageForm}>{imageForm ? 'Cancle' : 'Add Image'}</button>
                    </div>
                </div>
                <div>
                    {imageForm && <ImageForm 
                     loading= {imagesLoading}
                     onAdd = {handleAddImages}
                     albumName = {albumName}/>}
                </div>

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
                                }} src={updateImage} alt="update" />

                                <img onClick={(e) => handleDelete(e, img.id)}
                                 src={deleteImage} alt="delete" />
                            </div>


                            <img src={img.url} alt='Images' />
                            <p>{img.name}</p>
                            
                        </div>
                       ))
                    }
                </div>
           </div>
        </>
    )
}
export default ImageList;