import { createSelector } from '@reduxjs/toolkit';

const getNamespace = (state) => state.clinics;

export const getClinics = createSelector(
  [getNamespace],
  (namespace) => namespace.clinics,
);

export const getGroupedPatients = createSelector(
  [getNamespace],
  (namespace) => namespace.groupedPatients,
);

export const getClinicInfoList = createSelector(
  [getClinics],
  (clinics) => Object.values(clinics),
);

const getClinicId = (_, { clinicId }) => clinicId;

export const getPatientsInitialisedForClinic = createSelector(
  [getGroupedPatients, getClinicId],
  (groupedPatients, clinicId) => groupedPatients?.[clinicId]?.initialised ?? false,
);

export const getPatientListForClinic = createSelector(
  [getGroupedPatients, getClinicId],
  (groupedPatients, clinicId) => {
    const patients = groupedPatients?.[clinicId]?.patients ?? [];

    const enrichedPatients = patients.map((patient) => ({
      ...patient,
      lastNameFirstName: `${patient.lastName} ${patient.firstName}`,
    }));

    return enrichedPatients;
  },

);

export const getClinicInfo = createSelector(
  [getClinics, getClinicId],
  (clinicMap, clinicId) => clinicMap?.[clinicId] ?? {},
);
