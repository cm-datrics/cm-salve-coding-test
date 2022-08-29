import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

class ApiService {
  static async fetchClinicList() {
    let clinicList = [];
    try {
      const response = await axios.get(`${baseUrl}/clinics`);
      const data = response?.data ?? [];
      clinicList = data;
    } catch (err) {
      console.error('error fetching clinic list');
      console.error(JSON.stringify(err, null, 2));
    }

    return clinicList;
  }

  static async fetchPatientsListForClinic(clinicId) {
    let patientList = [];
    try {
      const response = await axios.get(`${baseUrl}/clinics/${clinicId}`);
      console.log('🚀 ~ file: ApiService.js ~ line 24 ~ ApiService ~ fetchPatientsListForClinic ~ response', response);
      const data = response?.data ?? [];

      const formattedPatientData = ApiService.formatPatientData(data);

      patientList = formattedPatientData;
    } catch (err) {
      console.error('error fetching patient list for clinic: ', clinicId);
      console.error(JSON.stringify(err, null, 2));
    }

    return patientList;
  }

  static formatPatientData(patientData) {
    if (!patientData) {
      return [];
    }

    return patientData.map((currentPatient) => ({
      lastName: currentPatient?.last_name,
      firstName: currentPatient?.first_name,
      clinicId: currentPatient?.clinic_id,
      id: currentPatient?.id,
      dateOfBirth: currentPatient?.date_of_birth,
    }));
  }
}

export default ApiService;
