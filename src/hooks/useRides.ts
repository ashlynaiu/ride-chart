import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getRides as fetchRides, addRide as createRide, updateRide as updateRideData, deleteRide as removeRide } from '../services/ridesService';
import { setRides, setStatus, setError, addRide, updateRide, deleteRide } from '../store/slices/ridesSlice';

export const useRides = () => {
  const dispatch = useAppDispatch();
  const { rides, status, error } = useAppSelector((state) => state.rides);

  const loadRides = async () => {
    try {
      dispatch(setStatus('loading'));
      const ridesData = await fetchRides();
      dispatch(setRides(ridesData));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to load rides'));
      dispatch(setStatus('failed'));
    }
  };

  const addNewRide = async (rideData: Omit<Ride, 'id'>) => {
    try {
      dispatch(setStatus('loading'));
      const newRide = await createRide(rideData);
      dispatch(addRide(newRide));
      dispatch(setStatus('succeeded'));
      return newRide;
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to add ride'));
      dispatch(setStatus('failed'));
      throw err;
    }
  };

  const updateExistingRide = async (rideData: Ride) => {
    try {
      if (!rideData.id) throw new Error('Ride ID is required for update');
      
      dispatch(setStatus('loading'));
      await updateRideData(rideData);
      dispatch(updateRide(rideData));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to update ride'));
      dispatch(setStatus('failed'));
      throw err;
    }
  };

  const removeExistingRide = async (id: string) => {
    try {
      dispatch(setStatus('loading'));
      await removeRide(id);
      dispatch(deleteRide(id));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to delete ride'));
      dispatch(setStatus('failed'));
      throw err;
    }
  };

  // Load rides on component mount
  useEffect(() => {
    if (status === 'idle') {
      loadRides();
    }
  }, [status]);

  return {
    rides,
    status,
    error,
    loadRides,
    addRide: addNewRide,
    updateRide: updateExistingRide,
    deleteRide: removeExistingRide,
  };
};

type Ride = {
  id?: string;
  area: string;
  timeToDrive: string;
  trailName: string;
  difficulty: string;
  distance: string;
  elevation: string;
  routeType: string;
  rating: number;
  reviewLink: string;
  notes: string;
};
