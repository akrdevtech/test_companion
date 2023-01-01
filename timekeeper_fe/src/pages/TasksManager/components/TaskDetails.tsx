import { Avatar, Grid, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

const TaskDetails = () => {
  const theme = useTheme();

  return (
    <Paper elevation={0} sx={{ padding: 3, minHeight: window.innerHeight }}>
      <Grid container direction="row">
        <Grid item xs={12} lg={12}>
          <Grid container direction="row">
            <Grid item xs={12} lg={1.5}>
              <Avatar sx={{ width: 60, height: 60 }}>L</Avatar>
            </Grid>
            <Grid item xs={12} lg={10}>
              <Typography variant="h6" color="secondary">
                <b>Listening Test 1</b>
              </Typography>
              <Typography variant="caption">L0001</Typography>
            </Grid>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#F5F8FB",
                marginTop: 2,
                borderRadius: 2,
                padding: 1,
                width: '100%'
              }}
            >
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ paddingBottom: 1 }}
              >
                <b>Basic Info</b>
              </Typography>
              <table style={{ color: theme.palette.text.secondary }}>
                <tbody>
                  <tr>
                    <td>
                      <Typography variant="body2" color="textSecondary">
                        Duration
                      </Typography>
                    </td>
                    <td>: </td>
                    <td>
                      <Typography variant="body2" color="textSecondary">
                        01:00:00
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="body2" color="textSecondary">
                        Total Marks
                      </Typography>
                    </td>
                    <td>: </td>
                    <td>
                      <Typography variant="body2" color="textSecondary">
                        40
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="body2" color="textSecondary">
                        Minimum Marks
                      </Typography>
                    </td>
                    <td>: </td>
                    <td>
                      <Typography variant="body2" color="textSecondary">
                        25
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#F5F8FB",
                marginTop: 2,
                borderRadius: 2,
                padding: 1,
              }}
            >
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ paddingBottom: 1 }}
              >
                <b>Description</b>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The test is divided into three sections
                Read/Listen all the questions of each section carefully 
                Each section is timer based
                Audio recording is timer-based in each section 
                
                Section 1 :
                Introduction and interview 4-5 minutes 
                
                Section 2: 
                Talk on the topic for 1-2 minutes. 
                You have 1 minute to think. 
                You can make some notes to help 
                
                Section 3: 
                Two way discussion 4-5 minutes
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskDetails;
