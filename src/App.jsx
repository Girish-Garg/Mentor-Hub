import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/src/pages/auth/Login";
import AccType from "./pages/auth/SignUp/AccType";
import CreateAcc from "./pages/auth/SignUp/CreateAcc";
import OtpVerify from "./pages/auth/SignUp/OtpVerify";
import CreateAcc_T from "./pages/auth/SignUp/CreateAcc_T";
import OtpVerifyT from "./pages/auth/SignUp/OtpVerify_T";
import EnterPass from "./pages/auth/SignUp/EnterPass";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/type" element={<AccType />} />
        <Route path="/signup/create" element={<CreateAcc />} />
        <Route path="/signup/verify" element={<OtpVerify />} />
        <Route path="/signup/create_t" element={<CreateAcc_T />} />
        <Route path="/signup/verify_t" element={<OtpVerifyT />} />
        <Route path="/signup/pass" element={<EnterPass />} />
      </Routes>
    </Router>
  );
}

export default App
