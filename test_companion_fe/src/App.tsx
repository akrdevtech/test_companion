import { useEffect, useState } from 'react'
import APIs from './api';

function App() {
  const getApiCall = () => {
    APIs.studentAPIs.fetchUserData().then(res => {
      console.log(res);
    })
  }

  return (
    <><h1>Hello</h1><button onClick={getApiCall}>Trigger</button></>
  )
}

export default App
