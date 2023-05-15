import './App.css';
// React Toast for showing the notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing the components, which will render from App.js
import NavBar from './Navbar/Navbar';
import AlbumList from './AlbumList/AlbumList';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <AlbumList />
    </div>
  );
}

export default App;
