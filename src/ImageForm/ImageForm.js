// imported Stye
import Style from './ImageForm.module.css';
// imported some dependencies from the react.
import { useEffect, useRef , useCallback} from 'react';

// main function for the ImagesForm
function ImageForm({loading, onAdd, albumName , onUpdate, updateImageIntent}){
    
    // variable for the Images Naem , and url
    const ImageName = useRef();
    const ImageURL = useRef();

    // console.log(updateImageIntent);

    // Handle Clear
    const handleClear = () =>{
        ImageName.current.value = "";
        ImageURL.current.value = "";
    }

    // Hnadle Default while updating
    // const handleDefaultValues = () => {
    //     ImageName.current.value = updateImageIntent.name;
    //     ImageURL.current.value = updateImageIntent.url;
    // };
    const handleDefaultValues = useCallback(() => {
        ImageName.current.value = updateImageIntent.name;
        ImageURL.current.value = updateImageIntent.url;
    }, [updateImageIntent]);
    // Component did update
    useEffect(() =>{
        if(updateImageIntent){
            handleDefaultValues();
        }
    }, [updateImageIntent , handleDefaultValues])

    // function when submit is cling in form
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

    // UI of the ImagesForm
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