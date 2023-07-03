import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/navbar/Navbar';
import FeedbackOverlaysQWW from './components/feedback-overlays-qww/FeedbackOverlaysQWW';
import Measurements from './pages/Measurements';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/measurements' element={<Measurements />} />        
      </Routes>
      <FeedbackOverlaysQWW />
    </>


  );
}

export default App;
