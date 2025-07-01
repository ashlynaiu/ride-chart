import React from 'react';
import RidesList from '../features/rides/RidesList';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mountain Bike Rides</h1>
        <p className="text-gray-600">Find and manage your favorite mountain bike rides in the area.</p>
      </div>
      
      <RidesList />
    </div>
  );
};

export default HomePage;
