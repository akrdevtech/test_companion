import { Button, Grid, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { IStudentWizardActiveTabCommonProps } from '..';
import { EAddStudentWizardContactInfoFields, EAddStudentWizardTabs } from '../../../../../common/enums/student';
import { AddStudentWizardActionTypes } from './context/Actions';
import { AddStudentWizardContext } from './context/Store';
import AddStudentWizardSchemas from './schemas';

const StudentWizardContactInfo = (props: IStudentWizardActiveTabCommonProps) => {

    const { handleActiveTabChange } = props;
    const { state, dispatch } = useContext(AddStudentWizardContext);
    const {
        forms: {
            contactInfo
        },
        hasErrors
    } = state;


    const { email, phone, addressLine1, addressLine2, pin, } = contactInfo;
    const { studentWizardFieldSchemas: { contactInfoSchema: contactInfoFieldSchema } } = AddStudentWizardSchemas;

    const handleInputChange = (field: EAddStudentWizardContactInfoFields, value: string | Date): void => {
        dispatch({
            type: AddStudentWizardActionTypes.CONTACT_INFO_CHANGE,
            payload: {
                contactInfo: {
                    ...contactInfo,
                    [field]: { value, error: null }
                },
                hasErrors: hasErrors,
            }
        })
    }
    const validateInput = (field: EAddStudentWizardContactInfoFields, value: string): void => {
        const fieldError = contactInfoFieldSchema[field].validate(value, { abortEarly: false });
        dispatch({
            type: AddStudentWizardActionTypes.CONTACT_INFO_CHANGE,
            payload: {
                contactInfo: {
                    ...contactInfo,
                    [field]: { value, error: fieldError.error ? `${fieldError.error}` : null },
                    hasErrors: fieldError.error ? true : contactInfo.hasErrors,
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
                sx={{ paddingTop: 20 }}
            >
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='email'
                        size="small"
                        value={email.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardContactInfoFields.STUDENT_EMAIL, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardContactInfoFields.STUDENT_EMAIL, e.target.value)}
                        error={email.error !== null}
                        helperText={email.error || " "}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='phone'
                        size="small"
                        value={phone.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardContactInfoFields.STUDENT_PHONE, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardContactInfoFields.STUDENT_PHONE, e.target.value)}
                        error={phone.error !== null}
                        helperText={phone.error || " "}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='address line 1'
                        size="small"
                        value={addressLine1.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_1, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_1, e.target.value)}
                        error={addressLine1.error !== null}
                        helperText={addressLine1.error || " "}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='address line 2'
                        size="small"
                        value={addressLine2?.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_2, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_2, e.target.value)}
                        error={addressLine2?.error !== null}
                        helperText={addressLine2?.error || " "}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='pin'
                        size="small"
                        value={pin.value}
                        onChange={(e) => handleInputChange(EAddStudentWizardContactInfoFields.STUDENT_PIN, e.target.value)}
                        onBlur={(e) => validateInput(EAddStudentWizardContactInfoFields.STUDENT_PIN, e.target.value)}
                        error={pin.error !== null}
                        helperText={pin.error || " "}
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
                        onClick={() => handleActiveTabChange(EAddStudentWizardTabs.BASIC_INFO)}
                    >
                        Back
                    </Button>
                    <Button variant='contained' size='small'
                        sx={{ minWidth: 100 }}
                        onClick={() => handleActiveTabChange(EAddStudentWizardTabs.COURSE_INFO)}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StudentWizardContactInfo