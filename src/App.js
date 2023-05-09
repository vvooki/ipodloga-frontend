import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import SharedLayout from './pages/SharedLayout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
function App() {
  const admin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Projects />} />
          <Route path="/home" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
