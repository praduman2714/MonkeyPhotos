import Style from './ImageForm.module.css';
import { useRef } from 'react';

function ImageForm({loading, onAdd, albumName}){
    const ImageName = useRef();
    const ImageURL = useRef();

    const handleClear = () =>{
        ImageName.current.value = "";
        ImageURL.current.value = "";
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(formName);
        const imgName = ImageName.current.value;
        const imgUrl = ImageURL.current.value;
        //console.log(imgName + " " + imgUrl);
        onAdd(imgName, imgUrl);

        
        handleClear();
    }
    return (
        <>
            <div className={Style.formDiv}>
                <h2>Add Images</h2>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Image Name" ref={ImageName} /><br/>
                    <input required placeholder="Image URL" ref={ImageURL} /> <br />
                    <button onClick={handleClear} className={Style.cancleBtn} >Clear </button>
                    <button  type='submit' className= {Style.createBtn}>Create</button>
                </form>
            </div>
        </>
    )
}

export default ImageForm;