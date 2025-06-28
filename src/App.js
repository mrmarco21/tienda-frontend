import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import { theme } from './styles/theme';
import './styles/globalStyles.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;