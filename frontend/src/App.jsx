import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import AdminPanel from "./components/AdminPanel";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Contact Form and Admin Panel</h1>
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
