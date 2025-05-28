import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage/AuthPage.tsx';
import {MainPage} from './pages/MainPage/MainPage.tsx';
// import {AdminPage} from './pages/AdminPage/AdminPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/var.css" 
import "./styles/main.css"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;