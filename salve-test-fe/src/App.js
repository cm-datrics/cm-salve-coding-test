import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';
import { ReactComponent as SalveLogo } from './assets/salve.svg';

import './App.css';
import ClinicList from './components/clinic-list';
import PatientList from './components/patient-list';
import { fetchClinics } from './store/reducers/clinics';

const App = () => {
  const dispatch = useDispatch();

  const initialise = useCallback(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  useEffect(() => {
    initialise();
  }, [initialise]);

  return (
    <div className="bg-slate-200">
      <div className="max-h-screen h-screen flex flex-col max-w-screen-md mx-auto bg-white">
        <header className="p-8">
          <SalveLogo />
        </header>
        <main className="routes-container overflow-y-hidden flex-1">
          <Switch>
            <Route path="/clinic/:id" component={PatientList} />
            <Route path="/" component={ClinicList} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default App;
