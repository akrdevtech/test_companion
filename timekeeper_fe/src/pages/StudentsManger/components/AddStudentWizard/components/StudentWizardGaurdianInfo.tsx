import { Button, Grid, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { IStudentWizardActiveTabCommonProps } from '..';
import { EAddStudentWizardGaurdianInfoFields } from '../../../../../common/enums/student';
import { AddStudentWizardActionTypes } from './context/Actions';
import { AddStudentWizardContext } from './context/Store';
import AddStudentWizardSchemas from './schemas';

const StudentWizardGaurdianInfo = (props: IStudentWizardActiveTabCommonProps) => {

    const { handleActiveTabChange } = props;

    const { state, dispatch } = useContext(AddStudentWizardContext);
    const {
        forms: {
            gaurdianInfo
        },
        hasErrors
    } = state;


    const { nameOfGaurdian, phoneOfGaurdian } = gaurdianInfo;

    const { studentWizardFieldSchemas: { gaurdianInfoSchema: gaurdianInfoFieldSchema } } = AddStudentWizardSchemas;

    const handleInputChange = (field: EAddStudentWizardGaurdianInfoFields, value: string | Date): void => {
        dispatch({
            type: AddStudentWizardActionTypes.GAURDIAN_INFO_CHANGE,
            payload: {
                gaurdianInfo: {
                    ...gaurdianInfo,
                    [field]: { value, error: null }
                },
                hasErrors: hasErrors,
            }
        })
    }
    const validateInput = (field: EAddStudentWizardGaurdianInfoFields, value: string): void => {
        const fieldError = gaurdianInfoFieldSchema[field].validate(value, { abortEarly: false });
        dispatch({
            type: AddStudentWizardActionTypes.GAURDIAN_INFO_CHANGE,
            payload: {
                gaurdianInfo: {
                    ...gaurdianInfo,
                    [field]: { value, error: fieldError.error ? `${fieldError.error}` : null },
                    hasErrors: fieldError.error ? true : gaurdianInfo.hasErrors,
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
                sx={{ paddingTop: 30 }}
            >
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='name of gaurdian'
                        size="small"
                        value={nameOfGaurdian.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_NAME, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_NAME, e.target.value)}
                        error={nameOfGaurdian.error !== null}
                        helperText={nameOfGaurdian.error || " "}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='phone of gaurdian'
                        size="small"
                        value={phoneOfGaurdian.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_PHONE, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_PHONE, e.target.value)}
                        error={phoneOfGaurdian.error !== null}
                        helperText={phoneOfGaurdian.error || " "}
                    />
                </Grid>
                <Grid item xs={12} lg={6} sx={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    margin: '0 0',
                }}>
                    <Button
                        variant='outlined' size='small'
                        sx={{ minWidth: 100, margin: 2 }}
                    // onClick={() => handleActiveTabChange("courseInfo")}
                    >
                        Back
                    </Button>
                    {hasErrors ? (
                        <Button variant='outlined' size='small'
                            sx={{ minWidth: 100 }}
                        // onClick={() => handleValidateAll()}
                        >
                            Validate
                        </Button>
                    ) : (
                        <Button variant='contained' size='small'
                            sx={{ minWidth: 100 }}
                            disabled={hasErrors}
                        // onClick={() => createCourse()}
                        >
                            Submit
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StudentWizardGaurdianInfo