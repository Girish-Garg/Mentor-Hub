import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/src/pages/auth/Login";
import "./App.css";
import Signup from './pages/auth/Signup';
import { useUser} from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
function App() {
  const { user } = useUser();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={user?.publicMetadata.userType === "STUDENT" ? <HomePage /> : <Login/>}/>
      </Routes>
    </Router>
  );
}

export default App
