import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Enrollment from './pages/Enrollment';
import Curriculum from './pages/Curriculum';
import FAQ from './pages/FAQ'; // Importação do FAQ
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/Admin/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/curso/:id" element={<CourseDetail />} />
            <Route path="/inscricao/:courseId" element={<Enrollment />} />
            <Route path="/curriculo" element={<Curriculum />} />
            <Route path="/faq" element={<FAQ />} /> {/* Rota do FAQ adicionada */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;