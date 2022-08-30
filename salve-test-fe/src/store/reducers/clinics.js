/* eslint-disable no-promise-executor-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiService from '../../ApiService';

const initialState = {
  clinics: {},
  groupedPatients: {},
  loading: true,
  initialised: false,
};

export const fetchClinics = createAsyncThunk(
  'clinics/fetchClinics',
  async () => {
    const clinicList = await ApiService.fetchClinicList();

    return clinicList;
  }
  ,
);

export const fetchPatientsForClinic = createAsyncThunk(
  'clinics/fetchPatientsForClinic',
  async (clinicId) => {
    const patientList = await ApiService.fetchPatientsListForClinic(clinicId);

    return {
      clinicId,
      patients: patientList,
    };
  }
  ,
);

const formatClinicsToObj = (clinicsList = []) => {
  const clinicsMap = clinicsList.reduce((acc, current) => {
    acc[current?.id] = current;

    return acc;
  }, {});

  return clinicsMap;
};

export const clinicsSlice = createSlice({
  name: 'clinics',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.loading = false;
        state.clinics = formatClinicsToObj(action.payload);
        state.initialised = true;
      })
      .addCase(fetchPatientsForClinic.fulfilled, (state, action) => ({
        ...state,
        groupedPatients: {
          ...state.groupedPatients,
          [action.payload.clinicId]: {
            initialised: true,
            patients: action.payload.patients,
          },
        },
      }));
  },
});

export default clinicsSlice.reducer;
