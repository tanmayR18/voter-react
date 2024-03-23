import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Vote from "./pages/Vote"
import Admin from "./pages/Admin"
import { useState } from "react"

function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/register"  element={<Register  />} />
        <Route path="/vote/:voter" element={<Vote />} />
        <Route path="/admin/:admin" element={<Admin/> }/>
    </Routes>
  );
}

export default App;
