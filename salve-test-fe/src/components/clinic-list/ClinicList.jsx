/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* This example requires Tailwind CSS v2.0+ */
const directory = [
  {
    id: 1,
    name: 'Leslie Abbott',
    numPatients: 22,
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Hector Adams',
    numPatients: 54,
    imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Blake Alexander',
    numPatients: 14,
    imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Test',
    numPatients: 13,
    imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Test again',
    numPatients: 7,
    imageUrl:
        'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Yvette Blanchard',
    numPatients: 4,
    imageUrl:
        'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }, {
    id: 7,
    name: 'Blake Alexander',
    numPatients: 14,
    imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Test',
    numPatients: 13,
    imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Test again',
    numPatients: 7,
    imageUrl:
        'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Yvette Blanchard',
    numPatients: 4,
    imageUrl:
        'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 11,
    name: 'Yvette Blanchard',
    numPatients: 4,
    imageUrl:
        'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const ClinicList = (props) => {
  const {
    clinicInfoList, fetchClinics, loading, initialised,
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

export default ClinicList;
