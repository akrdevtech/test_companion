import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalStore } from './common/context/Store';
import GlobalComponent from './common/components/GlobalComponent';
import SideAppDrawer from './common/components/SideAppDrawer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentManager from './pages/StudentsManger';
import { StudentStore } from './pages/StudentsManger/context/Store';
import CourseManager from './pages/CourseManager';
import { CourseStore } from './pages/CourseManager/context/Store';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: "#4742D7"
    },
    secondary: {
      main: "#00C492"
    },
    success: {
      main: "#0CF631"
    },
    error: {
      main: "#F60C0C"
    },
    text: {
      primary: "#191E3E",
      secondary: "#999999"
    },
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
                <CourseStore>
                  <GlobalComponent />
                  <Routes>
                    <Route path="/" element={<>Dashboard</>} />
                    <Route path="/students" element={<StudentManager />} />
                    <Route path="/courses" element={<CourseManager />} />
                  </Routes>
                </CourseStore>
              </StudentStore>
            </SideAppDrawer>
          </div>
        </GlobalStore>
      </ThemeProvider>
    </Router>
  );
}

export default App;
