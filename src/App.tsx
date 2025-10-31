import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';
import Works from './pages/Works';
import Project from './pages/Project';
import { PrivateRoute } from './middleware/PrivateRoutes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Works />} />
      <Route path="/projeto/:id" element={<Project />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
