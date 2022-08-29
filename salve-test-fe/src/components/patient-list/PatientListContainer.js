import { connect } from 'react-redux';
import { fetchPatientsForClinic } from '../../store/reducers/clinics';
import {
  getClinicInfo, getPatientListForClinic, getPatientsInitialisedForClinic,
} from '../../store/selectors/clinics';
import PatientList from './PatientList';

const mapStateToProps = (state, ownProps) => {
  const clinicId = ownProps?.match?.params?.id;

  return ({
    clinicId,
    loading: (state.clinics.loading),
    clinicInfo: getClinicInfo(state, { clinicId }),
    patientListForClinic: getPatientListForClinic(state, { clinicId }),
    initialised: getPatientsInitialisedForClinic(state, { clinicId }),
  });
};

const mapDispatchToProps = {
  fetchPatientsForClinic,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
