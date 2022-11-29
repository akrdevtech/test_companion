import { Button, Grid, IconButton, InputAdornment, MenuItem, TextField, Tooltip } from '@mui/material';
import React, { useContext } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { AddStudentWizardContext } from './context/Store';
import AddStudentWizardSchemas from './schemas';
import { EAddStudentWizardCourseInfoFields } from '../../../../../common/enums/student';
import { AddStudentWizardActionTypes } from './context/Actions';
import { IStudentWizardActiveTabCommonProps } from '..';

const StudentWizardCourseInfo = (props: IStudentWizardActiveTabCommonProps) => {

    const { handleActiveTabChange } = props;

    const { state, dispatch } = useContext(AddStudentWizardContext);
    const {
        forms: {
            courseInfo
        },
        hasErrors
    } = state;


    const { course, dateOfAdmission, admissionNumber } = courseInfo;

    const { studentWizardFieldSchemas: { courseInfoSchema: courseInfoFieldSchema } } = AddStudentWizardSchemas;

    const handleInputChange = (field: EAddStudentWizardCourseInfoFields, value: string | Date): void => {
        dispatch({
            type: AddStudentWizardActionTypes.COURSE_INFO_CHANGE,
            payload: {
                courseInfo: {
                    ...courseInfo,
                    [field]: { value, error: null }
                },
                hasErrors: hasErrors,
            }
        })
    }
    const validateInput = (field: EAddStudentWizardCourseInfoFields, value: string): void => {
        const fieldError = courseInfoFieldSchema[field].validate(value, { abortEarly: false });
        dispatch({
            type: AddStudentWizardActionTypes.COURSE_INFO_CHANGE,
            payload: {
                courseInfo: {
                    ...courseInfo,
                    [field]: { value, error: fieldError.error ? `${fieldError.error}` : null },
                    hasErrors: fieldError.error ? true : courseInfo.hasErrors,
                },
                hasErrors: fieldError.error ? true : hasErrors,
            }
        })
    }

    //   useEffect(() => {
    //     courseApis.getAllActiveCoursesList().then(courseListData => {
    //       setCourseList(courseListData);
    //     })
    //   }, [activeTab === AddStudentWizardData.tabIds.COURSE_INFO])

    const handleGenerateAdmissionNumber = () => {
        //     studentApis.autogenerateAdmissionNumber(course, dateOfAdmission).then(autoAdmno => {
        //       handleInputChange('admissionNumber', autoAdmno);
        //     })
    }

    return (
        <Grid item xs={11}>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={5}
                sx={{ paddingTop: 30 }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='course'
                            size="small"
                            value={course.value}
                            onChange={(e) => handleInputChange(EAddStudentWizardCourseInfoFields.STUDENT_COURSE, e.target.value)}
                            onBlur={(e) => validateInput(EAddStudentWizardCourseInfoFields.STUDENT_COURSE, e.target.value)}
                            error={course.error !== null}
                            helperText={course.error || " "}
                        >
                            <MenuItem key={undefined} value={undefined}></MenuItem>
                            {/* {courseList.map(cData => (<MenuItem key={cData.courseId} value={cData.courseId}>{cData.courseName}</MenuItem>))} */}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DesktopDatePicker
                            value={dateOfAdmission.value}
                            onChange={(newValue) => {
                                handleInputChange(
                                    EAddStudentWizardCourseInfoFields.STUDENT_DATE_OF_ADMISSION,
                                    newValue ? new Date(newValue) : new Date()
                                )
                            }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    fullWidth
                                    variant='outlined'
                                    label='date of admission'
                                    size="small"
                                    error={dateOfAdmission.error !== null}
                                    helperText={dateOfAdmission.error || " "}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='admission number'
                            size="small"
                            value={admissionNumber.value}
                            onChange={(e) => handleInputChange(EAddStudentWizardCourseInfoFields.STUDENT_ADMISSION_NUMBER, e.target.value)}
                            onBlur={(e) => validateInput(EAddStudentWizardCourseInfoFields.STUDENT_ADMISSION_NUMBER, e.target.value)}
                            error={admissionNumber.error !== null}
                            helperText={admissionNumber.error || " "}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="start">
                                        <Tooltip title="auto generate" placement="bottom">
                                            <IconButton onClick={() => handleGenerateAdmissionNumber()}><AutoFixHighIcon /></IconButton>
                                        </Tooltip>
                                    </InputAdornment>,
                            }}
                        />
                    </Grid>
                </LocalizationProvider>
                <Grid item xs={12} lg={6} sx={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    margin: '0 0',
                }}>
                    <Button variant='outlined' size='small'
                        sx={{ minWidth: 100, margin: 2 }}
                    // onClick={() => handleActiveTabChange("contactInfo")}
                    >
                        Back
                    </Button>
                    <Button variant='contained' size='small'
                        sx={{ minWidth: 100 }}
                    // onClick={() => handleActiveTabChange("gaurdianInfo")}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StudentWizardCourseInfo