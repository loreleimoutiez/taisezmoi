import { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Documents from '@/frontend/frontend-react/src/pages/Documents';
import HowDoesItWork from '@/frontend/frontend-react/src/pages/HowDoesItWork';
import Navigation from '@/frontend/frontend-react/src/components/Navigation';
import Chatbot from '@/frontend/frontend-react/src/components/Chatbot';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="main-content flex-grow md:py-48">
          <Routes>
            <Route path="/quack-react" element={<Chatbot />} />
            <Route path="/quack-react/documents" element={<Documents />} />
            <Route path="/quack-react/how-does-it-work" element={<HowDoesItWork />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
