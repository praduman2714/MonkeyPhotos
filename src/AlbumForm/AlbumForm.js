// Importing Css 
import { useRef } from 'react';
import Style from './AlbumForm.module.css'

function AlbumForm({addAlbum , loading}){
    const formName = useRef();

    const handleClear = () =>{
        formName.current.value = "";
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(formName);
        const albumName = formName.current.value;
        // console.log(albumName);
        addAlbum(albumName);
        handleClear();
    }
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