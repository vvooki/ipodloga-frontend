import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Projects from './pages/Projects';
import SharedLayout from './pages/SharedLayout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Chat from './pages/Chat';
import UserTasks from './pages/UserTasks';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            currentUser ? <SharedLayout /> : <Navigate replace to="/login" />
          }
        >
          <Route index element={<Projects />} />
          <Route path="/home" element={<Projects />} />
          <Route path="/project/:idProject" element={<Tasks />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tasks" element={<UserTasks />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
