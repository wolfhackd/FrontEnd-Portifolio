import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import './index.css';
import Works from './pages/Works';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Works />} />
    </Routes>
  );
}

export default App;
