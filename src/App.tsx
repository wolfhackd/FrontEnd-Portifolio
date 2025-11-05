import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';
import Works from './pages/Works';
import Project from './pages/Project';
import { PrivateRoute } from './middleware/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';
import { DashboardLayout } from './components/DashboardLayout';
import Technologies from './pages/Technologies';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Works />} />
      <Route path="/projeto/:id" element={<Project />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/technologies" element={<Technologies />} />
        {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
