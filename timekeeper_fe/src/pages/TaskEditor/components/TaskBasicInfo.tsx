import { Grid, Typography } from "@mui/material";
import React from "react";
import createDOMPurify from "dompurify";
import HtmlReactParser from "html-react-parser";

const html =
  "<div>The test is divided into three sections <br />Read/Listen all the questions of each section carefully <br />Each section is timer based<br />Audio recording is timer-based in each section <br /><br /><strong>Section 1 :</strong><br /><ul><li>Introduction and interview 4-5 minutes</li></ul><strong>Section 2:</strong> <br /><ul><li>Talk on the topic for 1-2 minutes.</li><li>You have 1 minute to think.</li><li>You can make some notes to help</li></ul><strong>Section 3:</strong> <br /><ul><li>Two way discussion 4-5 minutes</li></ul><br /></div>";
const DOMPurify = createDOMPurify(window);
const sanitizedHTML = DOMPurify.sanitize(html);

const TaskBasicInfo = () => {
  return (
    <>
      <Grid item xs={12} sx={{ paddingTop: 10 }}>
        <Typography variant="h4">
          <b>Title of the task</b>
        </Typography>
        <Typography variant="body1">Code of the task</Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: 5 }}>
        <table>
          <tbody>
            <tr>
              <td>
                <Typography variant="body1">
                  <b>Mode</b>
                </Typography>
              </td>
              <td> : </td>
              <td>
                <Typography variant="body1">Listening</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1">
                  <b>Duration</b>
                </Typography>
              </td>
              <td> : </td>
              <td>
                <Typography variant="body1">01:00:00</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1">
                  <b>Total Marks</b>
                </Typography>
              </td>
              <td> : </td>
              <td>
                <Typography variant="body1">40</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1">
                  <b>Minimum Marks</b>
                </Typography>
              </td>
              <td> : </td>
              <td>
                <Typography variant="body1">25</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: 5 }}>
        <Typography variant="body1">
          <b>Description</b>
        </Typography>
        <Typography variant="caption">
          {HtmlReactParser(sanitizedHTML)}
        </Typography>
      </Grid>
    </>
  );
};

export default TaskBasicInfo;
