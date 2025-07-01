import React from 'react';
import { useParams } from 'react-router-dom';
import RideForm from '../features/rides/RideForm';

const AddEditRidePage: React.FC = () => {
  const { rideId } = useParams<{ rideId?: string }>();
  const isEditMode = !!rideId;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Edit Ride' : 'Add New Ride'}
      </h1>
      
      <RideForm />
    </div>
  );
};

export default AddEditRidePage;
