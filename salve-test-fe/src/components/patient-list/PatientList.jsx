/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';

/* This example requires Tailwind CSS v2.0+ */
import { ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const buildSortByDobFn = (ascModifier) => ({ dateOfBirth: dob1 }, { dateOfBirth: dob2 }) => {
  if (dob1 > dob2) {
    return 1 * ascModifier;
  }
  if (dob1 < dob2) {
    return -1 * ascModifier;
  }
  return 0;
};

const buildSortByLastNameFn = (ascModifier) => ({ lastNameFirstName: fullName1 }, { lastNameFirstName: fullName2 }) => {
  // Sort by the last name first name combo so that if multiple users have same last name
  // then the first names will be sorted within that group

  if (fullName1 > fullName2) {
    return 1 * ascModifier;
  }
  if (fullName1 < fullName2) {
    return -1 * ascModifier;
  }
  return 0;
};

const PatientList = (props) => {
  const {
    patientListForClinic,
    fetchPatientsForClinic,
    clinicId,
    initialised,
    clinicInfo,
  } = props;

  const [sortingBy, setSortingBy] = useState('lastName');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterText, setFilterText] = useState(null);

  useEffect(() => {
    // fetch the patient list for the clinic if not already initialised

    if (!initialised) {
      fetchPatientsForClinic(clinicId);
    }
  }, [clinicId, fetchPatientsForClinic, initialised]);

  const toggleSortBy = useCallback((newSortBy) => {
    // if already sorting by, toggle asc / desc
    if (sortingBy === newSortBy) {
      setSortAsc((current) => !current);
      return;
    }

    setSortingBy(newSortBy);
    setSortAsc(true);
  }, [sortingBy]);

  const sortedPatientList = useMemo(() => {
    const ascModifier = sortAsc ? 1 : -1;

    let sortByFn = null;

    if (sortingBy === 'd.o.b') {
      sortByFn = buildSortByDobFn(ascModifier);
    }
    if (sortingBy === 'lastName') {
      sortByFn = buildSortByLastNameFn(ascModifier);
    }

    let sorted = patientListForClinic;

    if (sortByFn) {
      const copiedList = [...patientListForClinic];

      sorted = copiedList.sort(sortByFn);
    }

    if (filterText) {
      sorted = sorted.filter(({ lastNameFirstName }) => {
        const baseText = lastNameFirstName?.toLowerCase?.() ?? '';
        const searchText = filterText?.toLowerCase?.() ?? '';

        return baseText?.includes?.(searchText);
      });
    }

    return sorted;
  }, [filterText, patientListForClinic, sortAsc, sortingBy]);

  const renderColumnArrow = useCallback((requiredSortBy) => {
    if (sortingBy === requiredSortBy) {
      const Icon = sortAsc ? ChevronDownIcon : ChevronUpIcon;

      return (
        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    }

    return (
      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
        <ChevronDownIcon
          className="invisible h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
          aria-hidden="true"
        />
      </span>
    );
  }, [sortAsc, sortingBy]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-h-full flex flex-col">
      <Link to="/" className="flex mb-8 font-bold">
        <ChevronLeftIcon width="15px" />
        <span>Back to all clinics</span>
      </Link>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="text-slate-400 font-bold uppercase text-sm tracking-wider">Clinic</div>
          <h1 className="text-xl font-bold text-gray-900">{clinicInfo?.name}</h1>
        </div>
        <div>
          <div>
            <label htmlFor="email" className="sr-only">
              Filter
            </label>
            <input
              type="text"
              name="filter"
              id="filter"
              className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
              placeholder="Filter Patients"
              onChange={({ target: { value } }) => setFilterText(value)}
            />
          </div>
        </div>
      </div>

      <div>

        <div className="text-center font-bold text-indigo-700 uppercase text-sm tracking-wider">Patients</div>

        <div style={{ minHeight: '32px' }} className="h-8 text-center text-indigo-700 text-sm flex justify-center items-center">
          {filterText
            ? (
              <div>
                {`filtering by "${filterText}"`}
              </div>
            )
            : null}
        </div>
      </div>

      {
        initialised
          ? (
            <div className="mt-2 flex flex-col flex-1 overflow-y-scroll overflow-x-hidden">

              <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 flex-1">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            <button onClick={() => toggleSortBy('lastName')} className="group inline-flex">
                              Last Name
                              {renderColumnArrow('lastName')}
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            <button className="group inline-flex cursor-default">
                              First Name
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            <button onClick={() => toggleSortBy('d.o.b')} className="group inline-flex">
                              D.O.B
                              {renderColumnArrow('d.o.b')}

                            </button>
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {sortedPatientList.map((person) => (
                          <tr key={person.email}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.lastName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.firstName}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.dateOfBirth}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className="p-24">Loading Patients</div>
          )
      }

    </div>
  );
};

PatientList.propTypes = {
  patientListForClinic: PropTypes.array.isRequired,
  fetchPatientsForClinic: PropTypes.func.isRequired,
  clinicId: PropTypes.string.isRequired,
  initialised: PropTypes.bool.isRequired,
  clinicInfo: PropTypes.object.isRequired,
};

export default PatientList;
