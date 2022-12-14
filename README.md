# salve-test

Front end and backend node server for Salve Test Project

### View Deployed App
For convenience, this app has been deployed for quick visibility.
The frontend URL for viewing the app is: 

https://salve-test-fe.onrender.com

(This frontend hits a backend URL of: https://salve-test-be.onrender.com/ )

**NOTE:** If not accessed for a couple of hours, there might be a longer initial load time as the backend has to 'cold start'

### Running
In order to run the app locally
1. Clone the repository
2. Start the backend by: 
   - changing the directory to: `salve-test-be`
   - run `npm install` to install dependencies
   - run `npm start` (a .env file specifies the app will run on port 3001 but change this `PORT` value if required)
3. Start the frontend by:
   - changing the directory `salve-test-fe` 
   - run `npm install` to install dependencies
   - run `npm start`. By default the front end will use a backend api url of `http://localhost:3001` - this is specified in the `.env.local` file so change this value if you set the backend to run on a different port
   - the frontend itself will run on PORT 3000 but can be changed by running `PORT=xxx npm start` if needed


### Technology used
- Frontend built with React, React Router, Redux and TailwindCss
- Backend using a simple Node/Express server

### Implementation Details
- Front end will fetch the small list of clinics on load (which is enriched with the number of patients for each clinic)
- When clicking in to a clinic, only then will the front end fetch the full list of patients for that clinic and save it to the redux store (if it does not already have them)
- Can sort by d.o.b ascending/descending and last name ascending/descending
- the last name search is built with a hybrid value of last name - first name so if multiple patients had the same last name then the first names would be sorted within that group
- also added a simple filter to search for patients by that hybrid value (can type in their first or last name to narrow down the results)

### Screenshots
<img width="775" alt="image" src="https://user-images.githubusercontent.com/70591489/187171841-2c6033d5-5cb3-4e20-970f-a1450e15bcb5.png">

<img width="776" alt="image" src="https://user-images.githubusercontent.com/70591489/187171940-542e1dbb-3a43-4f5a-b4ab-0ff6d38c8cd3.png">


