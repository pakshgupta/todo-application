import React from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Mytask from "./pages/Mytask";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (

     
     <AuthProvider>
     <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/mytask" element={<Mytask />} />
          <Route path="/logout" element={<Landing />} />
        </Routes>

      </Router>
     </AuthProvider>
     

  );
};

export default App;
