import { useState, useContext, MouseEvent } from 'react';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, InputAdornment, TextField } from '@mui/material';
import { CourseContext, InitialCourseState } from '../../../context/Store';
import { CourseActionTypes } from '../../../context/Actions';
import { ICourseListFilters } from '../../../../../common/interface/course';

export default function CourseFilters() {
    const { state, dispatch } = useContext(CourseContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [thisState, setThisState] = useState(state.appliedCourseListFilters);
    const handleInputChange = (field: string, value: string): void => {
        setThisState({ ...thisState, [field]: value })
    }

    const handleApplyDefault = (): void => {
        setThisState(InitialCourseState.appliedCourseListFilters)
    }
    const handleApplyFilters = (): void => {
        dispatch({
            type: CourseActionTypes.COURSE_LIST_FILTER_CHANGE,
            payload: {
                appliedCourseListFilters: thisState as ICourseListFilters,
            }
        })
    }

    return (
        <>
            <IconButton
                color='primary'
                onClick={handleClick}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <TuneIcon />
            </IconButton>
            <Popover
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper elevation={0} sx={{ paddingTop: 3,paddingBottom: 3 }}>
                    <MenuItem>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size='small'
                            value={thisState.search}
                            onChange={(e) => handleInputChange("search", e.target.value)}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>,
                            }}
                        />
                    </MenuItem>
                    <MenuItem >
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='status'
                            size="small"
                            value={thisState.status}
                            onChange={(e) => handleInputChange("status", e.target.value)}
                        >
                            <MenuItem key="any" value="any">any</MenuItem>
                            <MenuItem key="active" value="active">active</MenuItem>
                            <MenuItem key="inactive" value="inactive">inactive</MenuItem>
                        </TextField>
                    </MenuItem>
                    <MenuItem>
                        <Button
                            variant='outlined' color="primary" fullWidth
                            onClick={() => handleApplyDefault()}
                        >
                            Default
                        </Button>
                        <Button
                            variant='contained' color="primary" fullWidth
                            onClick={() => handleApplyFilters()}
                        >
                            Apply
                        </Button>
                    </MenuItem>
                </Paper>
            </Popover>
        </>
    );
}