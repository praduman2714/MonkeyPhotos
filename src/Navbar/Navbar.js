// Importing css File
import Style from './Navbar.module.css';
// Importing Images
import Logo from '../Assets/logo.png';

function NavBar(){

    return (
        <>
            <div className={Style.navBar}>
                {/* By using window.location.replace, it will delete the history, and you can't go back.
                Basically NavBar contains only the logo and the name */}
                <div className= {Style.logo} onClick={() => window.location.replace("/")}>
                    <img alt='Icon' src={Logo} />
                    <span>PhotoPholio</span>
                </div>
            </div>
        </>
    )
}

export default NavBar;