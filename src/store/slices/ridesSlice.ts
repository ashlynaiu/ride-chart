import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ride {
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
}

interface RidesState {
  rides: Ride[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RidesState = {
  rides: [],
  status: 'idle',
  error: null,
};

const ridesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    addRide: (state, action: PayloadAction<Ride>) => {
      state.rides.push(action.payload);
    },
    updateRide: (state, action: PayloadAction<Ride>) => {
      const index = state.rides.findIndex(ride => ride.id === action.payload.id);
      if (index !== -1) {
        state.rides[index] = action.payload;
      }
    },
    deleteRide: (state, action: PayloadAction<string>) => {
      state.rides = state.rides.filter(ride => ride.id !== action.payload);
    },
    setRides: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
    },
    setStatus: (state, action: PayloadAction<RidesState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addRide,
  updateRide,
  deleteRide,
  setRides,
  setStatus,
  setError,
} = ridesSlice.actions;

export default ridesSlice.reducer;
