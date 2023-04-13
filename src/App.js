import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import SharedLayout from './pages/SharedLayout';
import Login from './pages/Login';
function App() {
  const admin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Projects />} />
          <Route path="/home" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
