// Importing Css and some usefule dependeies from the react.
import { useRef } from 'react';
import Style from './AlbumForm.module.css'

// main funciton for album form
function AlbumForm({addAlbum , loading}){
    // variable used for formName, which will used to store the name of the albums
    const formName = useRef();
    // function for clearing the images
    const handleClear = () =>{
        formName.current.value = "";
    }
    // function will fire, when we will submit the form
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(formName);
        const albumName = formName.current.value;
        // console.log(albumName);
        addAlbum(albumName);
        handleClear();
    }

    // return the UI 
    return (
        <>
            <div className={Style.formDiv}>
                <h2>Create an Album!</h2>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Album Name" ref={formName} />
                    <button onClick={handleClear} className={Style.cancleBtn} disabled={loading}>Clear </button>
                    <button disabled={loading}  type='submit' className= {Style.createBtn}>Create</button>
                </form>
            </div>
        </>
    )
}

export default AlbumForm