import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Ride } from '../store/slices/ridesSlice';

const RIDES_COLLECTION = 'rides';

export const getRides = async (): Promise<Ride[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, RIDES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Ride[];
  } catch (error) {
    console.error('Error getting rides:', error);
    throw error;
  }
};

export const addRide = async (ride: Omit<Ride, 'id'>): Promise<Ride> => {
  try {
    const docRef = await addDoc(collection(db, RIDES_COLLECTION), ride);
    return { id: docRef.id, ...ride };
  } catch (error) {
    console.error('Error adding ride:', error);
    throw error;
  }
};

export const updateRide = async (ride: Ride): Promise<void> => {
  if (!ride.id) throw new Error('Ride ID is required for update');
  
  try {
    const { id, ...rideData } = ride;
    await updateDoc(doc(db, RIDES_COLLECTION, id), rideData);
  } catch (error) {
    console.error('Error updating ride:', error);
    throw error;
  }
};

export const deleteRide = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, RIDES_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting ride:', error);
    throw error;
  }
};

export const getRidesByArea = async (area: string): Promise<Ride[]> => {
  try {
    const q = query(
      collection(db, RIDES_COLLECTION),
      where('area', '==', area)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Ride[];
  } catch (error) {
    console.error(`Error getting rides for area ${area}:`, error);
    throw error;
  }
};
