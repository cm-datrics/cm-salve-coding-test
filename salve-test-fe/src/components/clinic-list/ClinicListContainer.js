import { connect } from 'react-redux';
import { fetchClinics } from '../../store/reducers/clinics';
import { getClinicInfoList } from '../../store/selectors/clinics';
import ClinicList from './ClinicList';

const mapStateToProps = (state) => ({
  initialised: state.clinics.initialised,
  loading: state.clinics.loading,
  clinicInfoList: getClinicInfoList(state),
});

const mapDispatchToProps = {
  fetchClinics,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);
