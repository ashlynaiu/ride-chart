import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AddEditRidePage from './pages/AddEditRidePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-ride" element={<AddEditRidePage />} />
        <Route path="/edit-ride/:rideId" element={<AddEditRidePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
