import Styles from './Courosel.module.css';

function Courosel({onNext, onPrev, onCancle, name, url}){
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