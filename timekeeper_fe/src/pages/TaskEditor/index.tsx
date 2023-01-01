import { Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../../common/components/PageHeader";
import { EPageTitles } from "../../common/enums/global";
import HomeIcon from "@mui/icons-material/Home";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import TaskBasicInfo from "./components/TaskBasicInfo";
import TaskContent from "./components/TaskContent";

const breadCrumbs = [
  {
    label: "Home",
    icon: <HomeIcon fontSize="small" />,
    link: "/tasks",
  },
  {
    label: "Editor",
    icon: <AutoFixNormalIcon fontSize="small" />,
    link: "/tasks/editor",
  },
];

const TasksEditor = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };
  return (
    <Grid container direction="row">
      <Grid
        item
        xs={12}
        lg={10}
        sx={{
          backgroundColor: "#F5F8FB",
          padding: 2,
          minHeight: window.innerHeight,
        }}
      >
        <PageHeader
          breadCrumbs={breadCrumbs}
          handleBreadCrumbsClick={() => {}}
          pageTitle={EPageTitles.TASKS}
        >
          {activeTab===0?<TaskBasicInfo />:<TaskContent/>}
        </PageHeader>
      </Grid>
      <Grid item xs={12} lg={2} sx={{ minHeight: window.innerHeight }}>
        <Grid
          sx={{
            backgroundColor: "#fff",
            padding: 2,
            minHeight: window.innerHeight,
          }}
        >
          <Typography variant="caption">Views</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Button
                sx={
                  activeTab === 0
                    ? {
                        height: 24,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      }
                    : {
                        height: 24,
                      }
                }
                fullWidth
                size="small"
                onClick={() => handleTabChange(0)}
              >
                Basic Info
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                sx={
                  activeTab === 1
                    ? {
                        height: 24,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      }
                    : {
                        height: 24,
                      }
                }
                fullWidth
                size="small"
                onClick={() => handleTabChange(1)}
              >
                Contents
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TasksEditor;
