const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser')
const fs = require('fs')




// declare a new express app
const app = express();
app.use(bodyParser.json());

// In Memory Database
const clinicData = [];

const patientData = {

}


const loadCsvFileToArray = (filePath, resolve) => {

  const results = []

  fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(`loaded in ${filePath}`)
    resolve(results)
  });
}

const readCsv = async (filePath) => {
  return new Promise(res => {
    loadCsvFileToArray(filePath, res)
  })
}

const initialisePatientData = async (patientDataFilename) => {
  const patientsResults = await readCsv(patientDataFilename);

  const [firstEntry] = patientsResults;
  const {clinic_id: clinicId} = firstEntry;

  patientData[clinicId] = patientsResults
}

const initialiseInMemoryDb = async () => {
  const clinicsResults = await readCsv('./data/clinics/clinics.csv')
  clinicData.push(...clinicsResults)

  await initialisePatientData('./data/patients/patients-1.csv');
  await initialisePatientData('./data/patients/patients-2.csv');
}


// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/clinics', (req, res) => {
  // enrich the clinics list with number of patients
  const enrichedClinicData = (clinicData ?? []).map(clinic => {
    const numPatients = patientData?.[clinic.id]?.length ?? 0;

    return {
      ...clinic,
      numPatients
    }
  })

  res.json(enrichedClinicData);
});


app.get('/clinics/:id', (req, res) => {

  // locate patients results for clinic
  const patientResults = patientData?.[req?.params?.id] ?? []

  res.json(patientResults);
});


module.exports = {
  initialiseInMemoryDb,
  app
}
