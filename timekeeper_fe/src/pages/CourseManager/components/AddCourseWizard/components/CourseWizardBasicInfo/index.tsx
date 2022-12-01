import { Button, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import React, { useContext } from 'react'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddCourseWizardSchemas from '../schema';
import { EAddCourseWizardBasicInfoFields } from '../../../../../../common/enums/course';
import { AddCourseWizardContext } from '../../context/Store';
import { IAddCourseWizardActionTypes } from '../../context/Actions';
import { IAddCourseWizardBasicInfo } from '../../../../../../common/interface/course';
import courseServices from '../../../../../../services/courseServices';
import { GlobalContext } from '../../../../../../common/context/Store';
import { GlobalActionTypes } from '../../../../../../common/context/Actions';
import { EAlertSeverity } from '../../../../../../common/enums/global';

interface ICourseWizardBasicInfoProps {
  handleActiveTabChange: Function
  handleCloseWizard: (activity?: boolean) => void
}
const CourseWizardBasicInfo = (props: ICourseWizardBasicInfoProps) => {
  const { handleCloseWizard } = props;
  const { state, dispatch } = useContext(AddCourseWizardContext)
  const { state: globalState, dispatch: globalDispatch } = useContext(GlobalContext)

  const { courseWizardFieldSchemas: { basicInfoSchema: basicInfoFieldSchemas }, basicInfoSchema } = AddCourseWizardSchemas;
  const {
    forms,
    forms: {
      basicInfo
    },
    hasErrors,
  } = state;

  const {
    courseId, courseName, duration, fee, totalCredits, minCredits
  } = basicInfo;

  const handleInputChange = (field: EAddCourseWizardBasicInfoFields, value: string): void => {
    dispatch({
      type: IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_BASIC_INFO_CHANGE,
      payload: {
        basicInfo: {
          ...basicInfo,
          [field]: { value, error: null }
        },
        hasErrors: hasErrors,
      }
    })
  }

  const handleGenerateCourseCode = () => {
    courseServices.getNextCourseCode().then(autoCourseCode => {
      handleInputChange(EAddCourseWizardBasicInfoFields.COURSE_ID, autoCourseCode);
    });
  }

  const validateInput = (field: EAddCourseWizardBasicInfoFields, value: string): void => {
    const fieldError = basicInfoFieldSchemas[field].validate(value, { abortEarly: false });
    dispatch({
      type: IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_BASIC_INFO_CHANGE,
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

  const handleValidateAll = () => {
    let newBasicInfo = basicInfo;
    let thisHasErrors = false;
    Promise.all(Object.values(EAddCourseWizardBasicInfoFields).map((fieldName) => {
      const field = fieldName as EAddCourseWizardBasicInfoFields;
      const value = basicInfo[field].value;
      const fieldError = basicInfoFieldSchemas[field].validate(value, { abortEarly: false });
      newBasicInfo = {
        ...newBasicInfo,
        [field]: { ...basicInfo[field], error: fieldError.error ? `${fieldError.error}` : null },
        hasErrors: fieldError.error ? true : basicInfo.hasErrors,
      }
      thisHasErrors = fieldError.error ? true : thisHasErrors;
      return { field, fieldError }
    })).then(() => {
      dispatch({
        type: IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_BASIC_INFO_CHANGE,
        payload: {
          basicInfo: newBasicInfo,
          hasErrors: thisHasErrors,
        }
      })
    })
  }

  const createCourse = () => {
    courseServices.createCourse(forms).then(resp => {
      globalDispatch({
        type: GlobalActionTypes.GENERIC_SNACKBAR_OPEN,
        payload: {
          message: "Course Created Successfully",
        }
      });
      handleCloseWizard(true);
    }).catch(err => {
      globalDispatch({
        type: GlobalActionTypes.GENERIC_SNACKBAR_OPEN,
        payload: {
          message: "Course Creation Failed",
          severity: EAlertSeverity.ERROR,
        }
      })
    })
  }

  return (
    <Grid item xs={11}>
      <Grid container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={5}
        sx={{ marginTop: 15 }}
      >
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='course name'
            size='small'
            onChange={(e) => handleInputChange(EAddCourseWizardBasicInfoFields.COURSE_NAME, e.target.value)}
            onBlur={(e) => validateInput(EAddCourseWizardBasicInfoFields.COURSE_NAME, e.target.value)}
            value={courseName.value}
            error={courseName.error !== null}
            helperText={courseName.error}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='duration'
            size='small'
            onChange={(e) => handleInputChange(EAddCourseWizardBasicInfoFields.DURATION, e.target.value)}
            onBlur={(e) => validateInput(EAddCourseWizardBasicInfoFields.DURATION, e.target.value)}
            value={duration.value}
            error={duration.error !== null}
            helperText={duration.error}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='course id'
            size='small'
            onChange={(e) => handleInputChange(EAddCourseWizardBasicInfoFields.COURSE_ID, e.target.value)}
            onBlur={(e) => validateInput(EAddCourseWizardBasicInfoFields.COURSE_ID, e.target.value)}
            value={courseId.value}
            error={courseId.error !== null}
            helperText={courseId.error}
            InputProps={{
              endAdornment:
                <InputAdornment position='end'>
                  <Tooltip title='auto generate' placement='bottom'>
                    <IconButton onClick={handleGenerateCourseCode} size='small' color='primary'>
                      <AutoFixHighIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='total credits'
            size='small'
            onChange={(e) => handleInputChange(EAddCourseWizardBasicInfoFields.TOTAL_CREDITS, e.target.value)}
            onBlur={(e) => validateInput(EAddCourseWizardBasicInfoFields.TOTAL_CREDITS, e.target.value)}
            value={totalCredits.value}
            error={totalCredits.error !== null}
            helperText={totalCredits.error}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='min credits'
            size='small'
            onChange={(e) => handleInputChange(EAddCourseWizardBasicInfoFields.MIN_CREDITS, e.target.value)}
            onBlur={(e) => validateInput(EAddCourseWizardBasicInfoFields.MIN_CREDITS, e.target.value)}
            value={minCredits.value}
            error={minCredits.error !== null}
            helperText={minCredits.error}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='fee'
            size='small'
            onChange={(e) => handleInputChange(EAddCourseWizardBasicInfoFields.FEE, e.target.value)}
            onBlur={(e) => validateInput(EAddCourseWizardBasicInfoFields.FEE, e.target.value)}
            value={fee.value}
            error={fee.error !== null}
            helperText={fee.error}
            InputProps={{
              startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} lg={6} sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          margin: '0 0',
        }}>
          {hasErrors ? (
            <Button variant='outlined' size='small'
              sx={{ minWidth: 100 }}
              onClick={() => handleValidateAll()}
            >
              Validate
            </Button>
          ) : (
            <Button variant='contained' size='small'
              sx={{ minWidth: 100 }}
              disabled={hasErrors}
              onClick={() => createCourse()}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CourseWizardBasicInfo