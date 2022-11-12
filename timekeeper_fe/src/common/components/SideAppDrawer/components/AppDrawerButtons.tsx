import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { EAppPages } from '../../../enums/global';
import { useTheme } from '@mui/material/styles';

interface IAppDrawerButtonsProps {
    link: string,
    handlePageSelect: (param: EAppPages) => void,
    text: EAppPages,
    open: boolean,
    selectedPage: EAppPages,
    icon: JSX.Element,
};

const AppDrawerButtons = ({ link, handlePageSelect, text, open, selectedPage, icon }: IAppDrawerButtonsProps) => {
    const theme = useTheme();
    return (
        <Link to={link} onClick={() => handlePageSelect(text)}>
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: selectedPage === text ?
                            theme.palette.primary.main :
                            theme.palette.common.white,
                        margin: 1,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: selectedPage === text ?
                                theme.palette.primary.main :
                                theme.palette.grey[300],
                        }
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: selectedPage === text ?
                                theme.palette.common.white :
                                theme.palette.text.secondary,
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        </Link>
    )
}

export default AppDrawerButtons