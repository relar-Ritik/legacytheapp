import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Advice from './pages/Advice';
import Summarization from './pages/Summarization';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/summarization" element={<Summarization />} />
        </Routes>
      </div>
    </Router>
  );
}
