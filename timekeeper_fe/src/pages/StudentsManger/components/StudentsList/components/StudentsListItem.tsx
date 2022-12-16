import { Card, Grid, Avatar, Typography, CardHeader, Badge, useTheme } from '@mui/material'
import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import { IStudentsModel } from '../../../../../common/interface/student';

interface IStudentLisItemtProps {
  studentInfo?: IStudentsModel;
  selectedStudentId?: string;
  handleSelectStudentId: (thisStudentId: string) => void;
}

const StudentsListItem = (props:IStudentLisItemtProps) => {
  const theme = useTheme();
  const { studentInfo, selectedStudentId, handleSelectStudentId } = props;
  const isSelected = studentInfo?._id === selectedStudentId;
  const cardStyle = {
    minWidth: 275,
    boxShadow: "none",
    borderRadius: 2,
    backgroundColor: isSelected ? theme.palette.secondary.main : theme.palette.common.white,
    color: isSelected ? theme.palette.common.white : "textSecondary"
  }
  return (
    <Card sx={cardStyle} onClick={() => handleSelectStudentId(studentInfo?._id??"")}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} lg={6}>
          <CardHeader
            avatar={
              <Badge overlap="circular" variant="dot" color={studentInfo?.settings.isPresent ? "success" : "error"}>
                <Avatar aria-label="recipe" sx={{ borderStyle: 'solid', borderWidth: 2 }}>
                  {studentInfo?.firstName ? <b>{studentInfo.firstName[0]}</b> : <FaceIcon />}
                </Avatar>
              </Badge>
            }
            title={(<Typography variant='body2' color={isSelected ? "white" : "secondary"}><b>{studentInfo?.firstName} {studentInfo?.lastName}</b></Typography>)}
            subheader={(<Typography variant='caption'>{studentInfo?.courseInfo.admissionNumber}</Typography>)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='caption'>{studentInfo?.courseInfo.course}</Typography><br />
          <Typography variant='caption'>{studentInfo?.contactInfo.phone}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default StudentsListItem