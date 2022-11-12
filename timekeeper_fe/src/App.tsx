import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalStore } from './common/context/Store';
import GlobalComponent from './common/components/GlobalComponent';
import SideAppDrawer from './common/components/SideAppDrawer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentManager from './pages/StudentsManger';
import { StudentStore } from './pages/StudentsManger/context/Store';

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
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStore>
          <div className="App" style={{ backgroundColor: theme.palette.common.white }}>
            <SideAppDrawer >
              <StudentStore>
                <GlobalComponent />
                <Routes>
                  <Route path="/" element={<>Dashboard</>} />
                  <Route path="/students" element={<StudentManager />} />
                  <Route path="/courses" element={<>CourseManager </>} />
                </Routes>
              </StudentStore>
            </SideAppDrawer>
          </div>
        </GlobalStore>
      </ThemeProvider>
    </Router>
  );
}

export default App;
