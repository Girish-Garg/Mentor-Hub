import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Badge from "@/components/custom/Badge";
import Logo from "@/components/custom/logo";
import Resource from "@/components/custom/Resource";
import Question from "@/components/custom/Question";
<<<<<<< HEAD
import Events from "@/components/custom/Event";
import Sidebar from "@/components/custom/sidebar";
import Navbar from "@/components/custom/UserNavBar";
import TopBar from "@/components/custom/TopBar";
import AccType from "./pages/auth/SignUp/AccType";
import Login from "./pages/auth/Login";

function App() {

  return (
    <>
      <Login />
    </>
=======

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
>>>>>>> e1ded80d5d522d9913c942f71bbf01105dcfc18b
  );
}

export default App;
