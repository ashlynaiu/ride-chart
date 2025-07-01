import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Everstoke Rides
            </Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  All Rides
                </Link>
              </li>
              <li>
                <Link 
                  to="/add-ride" 
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Add New Ride
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Everstoke Bike. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
