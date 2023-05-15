import Style from './ImageForm.module.css';
import { useEffect, useRef } from 'react';

function ImageForm({loading, onAdd, albumName , onUpdate, updateImageIntent}){
    const ImageName = useRef();
    const ImageURL = useRef();

    // console.log(updateImageIntent);

    const handleClear = () =>{
        ImageName.current.value = "";
        ImageURL.current.value = "";
    }

    const handleDefaultValues = () => {
        ImageName.current.value = updateImageIntent.name;
        ImageURL.current.value = updateImageIntent.url;
    };
    // Component did update
    useEffect(() =>{
        if(updateImageIntent){
            handleDefaultValues();
        }
    }, [updateImageIntent])

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(formName);
        const imgName = ImageName.current.value;
        const imgUrl = ImageURL.current.value;
        // console.log(imgName + " " + imgUrl);

        if (!updateImageIntent) onAdd( imgName, imgUrl );
        else onUpdate( {name : imgName, url : imgUrl} );

        
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
                    <input required placeholder="Image Name" ref={ImageName} /><br/>
                    <input required placeholder="Image URL" ref={ImageURL} /> <br />
                    <button onClick={handleClear} className={Style.cancleBtn} >Clear </button>
                    <button className={Style.createBtn} disabled={loading}>{!updateImageIntent ? "Create" : "Update"}</button>
                </form>
            </div>
        </>
    )
}

export default ImageForm;