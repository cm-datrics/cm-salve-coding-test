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

const mockClinicData = [
  {
    id: 1,
    name: 'Leslie Abbott',
  },
  {
    id: 2,
    name: 'Hector Adams',
  },
  {
    id: 3,
    name: 'Blake Alexander',
  },
  {
    id: 4,
    name: 'Test',
  },
  {
    id: 5,
    name: 'Test again',
  },
  {
    id: 6,
    name: 'Yvette Blanchard',
  },
  {
    id: 7,
    name: 'Blake Alexander',
  },
  {
    id: 8,
    name: 'Test',
  },
  {
    id: 9,
    name: 'Test again',
  },
  {
    id: 10,
    name: 'Yvette Blanchard',
  },
];

const mockPatientData = {
  1: [
    {
      lastName: 'Abbot', firstName: 'Lindsey', dateOfBirth: '1963-08-11', clinicId: 1,
    },
    {
      lastName: 'Smith', firstName: 'Chris', dateOfBirth: '1963-08-11', clinicId: 1,
    },
    {
      lastName: 'Smith', firstName: 'Xander', dateOfBirth: '1963-08-11', clinicId: 1,
    },
    {
      lastName: 'Smith', firstName: 'Tom', dateOfBirth: '1963-08-11', clinicId: 1,
    },
    {
      lastName: 'Doe', firstName: 'John', dateOfBirth: '1963-08-11', clinicId: 1,
    },
    {
      lastName: 'Francis', firstName: 'Karen', dateOfBirth: '1963-08-11', clinicId: 1,
    },

  ],
  2: [
    {
      lastName: 'Doe', firstName: 'Jane', dateOfBirth: '1963-08-11', clinicId: 2,
    },
    {
      lastName: 'Shelby', firstName: 'Tommy', dateOfBirth: '1963-08-12', clinicId: 2,
    },
    {
      lastName: 'Martins', firstName: 'Ron', dateOfBirth: '1963-08-13', clinicId: 2,
    },
    {
      lastName: 'Ellis', firstName: 'Ella', dateOfBirth: '1963-08-04', clinicId: 2,
    },

  ],
};

const mockFetchPatientsForClinic = async (clinicId) => {
  const delay = new Promise((res) => setTimeout(res, 3000));
  await delay;

  return {
    data: mockPatientData[clinicId] ?? [],
  };
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

export const clinicsSlice = createSlice({
  name: 'clinics',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.loading = false;
        state.clinics = action.payload;
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

export const { increment, decrement, incrementByAmount } = clinicsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default clinicsSlice.reducer;
