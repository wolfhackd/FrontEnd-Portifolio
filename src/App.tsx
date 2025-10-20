import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import './index.css';
import Works from './pages/Works';
import Project from './pages/Project';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Works />} />
      <Route path="/projeto/:id" element={<Project />} />
    </Routes>
  );
}

export default App;
