import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import Login from './pages/Login';
function App() {
  const admin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
