import './App.css';
import Textform from './Components/TextForm';
import Navbar from './Components/Navbar';
import About from './Components/About';
function App() {
  return (
    <>
    <div className="App">
    <Navbar  link_1="Home" link_2="Contact" link_3="About" />
    <div className='container my-4'>
    <Textform fieldLabel="Email Address"/>

    <About />
    </div>
    </div>
    </>
  );
}

export default App;
