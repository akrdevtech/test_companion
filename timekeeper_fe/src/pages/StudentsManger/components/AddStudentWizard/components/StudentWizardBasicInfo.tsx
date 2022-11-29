import { Avatar, Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AddStudentWizardContext } from './context/Store';
import { EAddStudentWizardBasicInfoFields } from '../../../../../common/enums/student';
import { AddStudentWizardActionTypes } from './context/Actions';
import AddStudentWizardSchemas from './schemas';


interface IStudentWizardBasicInfoProps {
    handleActiveTabChange?: (p: string) => void;
}
const StudentWizardBasicInfo = (props: IStudentWizardBasicInfoProps) => {

    const { state, dispatch } = useContext(AddStudentWizardContext);
    const {
        forms: {
            basicInfo
        },
        hasErrors
    } = state;

    const { name, dateOfBirth, gender, occupation } = basicInfo;
    const { studentWizardFieldSchemas: { basicInfoSchema: basicInfoFieldSchemas } } = AddStudentWizardSchemas;

    const handleInputChange = (field: EAddStudentWizardBasicInfoFields, value: string | Date): void => {
        dispatch({
            type: AddStudentWizardActionTypes.BASIC_INFO_CHANGE,
            payload: {
                basicInfo: {
                    ...basicInfo,
                    [field]: { value, error: null }
                },
                hasErrors: hasErrors,
            }
        })
    }
    const validateInput = (field: EAddStudentWizardBasicInfoFields, value: string): void => {
        const fieldError = basicInfoFieldSchemas[field].validate(value, { abortEarly: false });
        dispatch({
            type: AddStudentWizardActionTypes.BASIC_INFO_CHANGE,
            payload: {
                basicInfo: {
                    ...basicInfo,
                    [field]: { value, error: fieldError.error ? `${fieldError.error}` : null },
                    hasErrors: fieldError.error ? true : basicInfo.hasErrors,
                },
                hasErrors: fieldError.error ? true : hasErrors,
            }
        })
    }
    return (
        <Grid item xs={11}>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={5}
                sx={{ paddingTop: 10 }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12}>
                        <Avatar sx={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='name'
                            size="small"
                            onChange={(e) => handleInputChange(EAddStudentWizardBasicInfoFields.STUDENT_NAME, e.target.value)}
                            onBlur={(e) => validateInput(EAddStudentWizardBasicInfoFields.STUDENT_NAME, e.target.value)}
                            value={name.value}
                            error={name.error !== null}
                            helperText={name.error || " "}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='gender'
                            size="small"
                            value={gender.value}
                            onChange={(e) => handleInputChange(EAddStudentWizardBasicInfoFields.STUDENT_GENDER, e.target.value)}
                            onBlur={(e) => validateInput(EAddStudentWizardBasicInfoFields.STUDENT_GENDER, e.target.value)}
                            error={gender.error !== null}
                            helperText={gender.error || " "}
                        >
                            <MenuItem key={undefined} value={undefined}></MenuItem>
                            <MenuItem key="male" value="male">male</MenuItem>
                            <MenuItem key="female" value="female">female</MenuItem>
                            <MenuItem key="other" value="other">other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DesktopDatePicker
                            value={dateOfBirth.value}
                            onChange={(newValue) => {
                                handleInputChange(EAddStudentWizardBasicInfoFields.STUDENT_DOB, new Date(newValue ?? ""));
                            }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    fullWidth
                                    variant='outlined'
                                    label='date of birth'
                                    onBlur={(e) => validateInput(EAddStudentWizardBasicInfoFields.STUDENT_DOB, e.target.value)}
                                    size="small"
                                    error={dateOfBirth.error !== null}
                                    helperText={dateOfBirth.error || " "}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='occupation'
                            size="small"
                            onChange={(e) => handleInputChange(EAddStudentWizardBasicInfoFields.STUDENT_OCCUPATION, e.target.value)}
                            onBlur={(e) => validateInput(EAddStudentWizardBasicInfoFields.STUDENT_OCCUPATION, e.target.value)}
                            value={occupation.value}
                            error={occupation.error !== null}
                            helperText={occupation.error || " "}
                        />
                    </Grid>
                </LocalizationProvider>
                <Grid item xs={12} lg={6} sx={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    margin: '0 0',
                }}>
                    <Button
                        disabled
                        variant='outlined' size='small'
                        sx={{ minWidth: 100, margin: 2 }}
                    // onClick={() => handleActiveTabChange("basicInfo")}
                    >
                        Back
                    </Button>
                    <Button variant='contained' size='small'
                        sx={{ minWidth: 100 }}
                    // onClick={() => handleActiveTabChange("contactInfo")}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StudentWizardBasicInfo