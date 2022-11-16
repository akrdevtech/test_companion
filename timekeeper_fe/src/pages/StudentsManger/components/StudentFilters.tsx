import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, Card, InputAdornment, Checkbox, FormControl, Grid, Grow, InputLabel, ListItemText, Select, TextField } from '@mui/material';

export default function StudentFilters() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size='small'
                        // value={searchText}
                        // onChange={(e) => handleInputChange("search", e.target.value)}
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
                        label='admission'
                        size="small"
                    // sx={{ minWidth: 300 }}
                    // value={admission}
                    // onChange={(e) => handleInputChange("admission", e.target.value)}
                    >
                        <MenuItem key="any" value="any">any</MenuItem>
                        <MenuItem key="active" value="active">active</MenuItem>
                        <MenuItem key="inactive" value="inactive">inactive</MenuItem>
                    </TextField>
                </MenuItem>
                <MenuItem >
                    <TextField
                        select
                        fullWidth
                        variant='outlined'
                        label='graduation'
                        size="small"
                    // value={graduation}
                    // onChange={(e) => handleInputChange("graduation", e.target.value)}
                    >
                        <MenuItem key="any" value="any">any</MenuItem>
                        <MenuItem key="ongoing" value="ongoing">ongoing</MenuItem>
                        <MenuItem key="completed" value="completed">completed</MenuItem>
                    </TextField></MenuItem>
                <MenuItem >
                    <TextField
                        select
                        fullWidth
                        variant='outlined'
                        label='presence'
                        size="small"
                    // value={presence}
                    // onChange={(e) => handleInputChange("presence", e.target.value)}
                    >
                        <MenuItem key="any" value="any">any</MenuItem>
                        <MenuItem key="present" value="present">present</MenuItem>
                        <MenuItem key="absent" value="absent">absent</MenuItem>
                    </TextField>
                </MenuItem>
                <MenuItem>
                    <Button
                        variant='outlined' color="primary" fullWidth
                    // onClick={handleApplyDefault}
                    >
                        Default
                    </Button>
                    <Button
                        variant='contained' color="primary" fullWidth
                    // onClick={handleApplyFilters}
                    >
                        Apply
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
}