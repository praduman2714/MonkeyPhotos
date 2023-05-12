import './App.css';

// Importing the components, which will render from App.js
import NavBar from './Navbar/Navbar';
import AlbumList from './AlbumList/AlbumList';


function App() {
  return (
    <div className="App">
      <NavBar />
      <AlbumList />
    </div>
  );
}

export default App;
