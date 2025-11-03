import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';
import Works from './pages/Works';
import Project from './pages/Project';
import { PrivateRoute } from './middleware/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Works />} />
      <Route path="/projeto/:id" element={<Project />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App;
