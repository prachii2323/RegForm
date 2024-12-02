import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProgressiveForm from './components/ProgressiveForm';
import Navbar from './components/Navbar'; 
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar /> {}
      <main style={{ marginTop: '60px' }}> {}
        <Routes>
          {}
          <Route path="/" element={<ProgressiveForm />} />
          {}
          <Route path="*" element={<h1>404: Page Not Found</h1>} />

          <Route path="/Admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
