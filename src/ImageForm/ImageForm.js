// Importing Style 
import Style from './ImageForm.module.css';
// Import dependencies from react
import { useEffect, useRef } from 'react';

function ImageForm({loading, onAdd, albumName , onUpdate, updateImageIntent}){
    const ImageName = useRef();
    const ImageURL = useRef();

    // console.log(updateImageIntent);
    // function for clearing the value of ImageName, and ImageUrl
    const handleClear = () =>{
        ImageName.current.value = "";
        ImageURL.current.value = "";
    }

    // If we wnat to update the images
    const handleDefaultValues = () => {
        ImageName.current.value = updateImageIntent.name;
        ImageURL.current.value = updateImageIntent.url;
    };
    // CompnentDidUpdate
    useEffect(() =>{
        if(updateImageIntent){
            handleDefaultValues();
        }
    }, [updateImageIntent])

    // fucntion for handling the submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(formName);
        const imgName = ImageName.current.value;
        const imgUrl = ImageURL.current.value;
        //console.log(imgName + " " + imgUrl);
        if (!updateImageIntent) onAdd({ imgName, imgUrl });
        else onUpdate({ imgName, imgUrl });

        
        handleClear();
    }
    return (
        <>
            <div className={Style.formDiv}>
                <h2>
                    {!updateImageIntent
                    ? `Add image to ${albumName}`
                    : `Update image ${updateImageIntent.title}`}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Input field for Image Name */}
                    <input required placeholder="Image Name" ref={ImageName} /><br/>
                    {/* Input field for Image URL */}
                    <input required placeholder="Image URL" ref={ImageURL} /> <br />
                    {/* Clear button */}
                    <button onClick={handleClear} className={Style.cancleBtn} >Clear </button>
                    {/* Create or Update button */}
                    <button className={Style.createBtn} disabled={loading}>{!updateImageIntent ? "Create" : "Update"}</button>
                </form>
            </div>
        </>
    )
}

export default ImageForm;
