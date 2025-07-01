import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AddEditRidePage from './pages/AddEditRidePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-ride" element={<AddEditRidePage />} />
            <Route path="/edit-ride/:rideId" element={<AddEditRidePage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
