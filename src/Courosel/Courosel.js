import Styles from './Courosel.module.css';

// This main function which is taking the some props to control the images and corosel
function Courosel({onNext, onPrev, onCancle, name, url}){
  // returning the UI for the corosole. 
    return (
        <div className={Styles.carousel}>
        <button className={Styles.close} onClick={onCancle}>x</button>
        <button onClick={onPrev}>{"<"}</button>
        <img src={url} alt={name} />
        <button onClick={onNext}>{">"}</button>
      </div>
    )
}
export default Courosel;