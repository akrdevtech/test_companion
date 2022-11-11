import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react'
import APIs from './api';
import { GlobalStore } from './context/Store';
import GlobalComponent from './common/components/GlobalComponent';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const getApiCall = () => {
    // APIs.studentAPIs.fetchUserData().then(res => {
    //   console.log(res);
    // })
  }

  return (
    <GlobalStore>
      <GlobalComponent />
      <><h1>Hello</h1><button onClick={getApiCall}>Trigger</button></>
    </GlobalStore>
  );
}

export default App;
