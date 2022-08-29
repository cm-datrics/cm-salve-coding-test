/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClinicList = (props) => {
  const {
    clinicInfoList, loading,
  } = props;

  return (
    <div className="max-w-screen-md mx-auto flex flex-col max-h-full overflow-y-hidden px-8" aria-label="Directory">
      <div className="text-3xl mb-4 text-center"> Clinic List</div>
      {loading
        ? (
          <div className="text-center">Loading Clinics</div>
        )
        : null}

      <div className="text-slate-500 text-center">
        Click on a clinic to view its patients
      </div>

      <ul className="flex-1 overflow-y-scroll">
        {clinicInfoList.map((clinic) => (
          <li key={clinic.id} className="bg-white">
            <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div className="flex-1 min-w-0">
                <Link to={`/clinic/${clinic.id}`} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{clinic.name}</p>
                  <p className="text-sm text-gray-500 truncate">{`${clinic.numPatients} patients`}</p>
                </Link>
              </div>
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
};

ClinicList.propTypes = {
  clinicInfoList: PropTypes.array.isRequired,
  initialised: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ClinicList;
