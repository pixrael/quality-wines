import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/navbar/Navbar';
import FeedbackOverlaysQWW from './components/feedback-overlays-qww/FeedbackOverlaysQWW';
import Measurements from './pages/Measurements';
import AuthRequired from './components/auth-required/AuthRequired';
import NoLoginRequired from './components/no-login-required/NoLoginRequired';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<NoLoginRequired componentToRender={<Login />} redirectTo='/measurements' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/measurements' element={<AuthRequired componentToRender={<Measurements />} />} />
      </Routes>
      <FeedbackOverlaysQWW />
    </>


  );
}

export default App;
