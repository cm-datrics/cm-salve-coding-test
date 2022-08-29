import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import clinicReducer, { fetchClinics } from './reducers/clinics';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    clinics: clinicReducer,
  },
});
