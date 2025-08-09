
import React from 'react'
import HomePage from './Questionare_Components/HomePage'
import AskQuestion from '../components/Overlay_Components/AddAQuestion'
// import { TEMP_FILTER_CONFIG } from "../src/test";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import AskResource from '../components/Overlay_Components/AddAAnswer';
import AddResource from '../components/Overlay_Components/AddAResource';
import AddAnswer from '../components/Overlay_Components/AddAAnswer';
import AddQuestion from '../components/Overlay_Components/AddAQuestion';
import Tag from '../components/Overlay_Components/Tag';
import EventPage from '@/src/Questionare_Components/EventPage';
import ResourcePage from './Questionare_Components/ResourcePage';
const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <ResourcePage />
        </MantineProvider>
  )
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
