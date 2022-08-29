import { configureStore } from '@reduxjs/toolkit';
import clinicReducer from './reducers/clinics';

export const store = configureStore({
  reducer: {
    clinics: clinicReducer,
  },
});
