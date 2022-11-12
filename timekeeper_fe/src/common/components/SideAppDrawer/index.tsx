import React, { ReactNode, useEffect, useContext } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../context/Store';
import { EAppPages } from '../../enums/global';
import { GlobalActionTypes } from '../../context/Actions';
import BrandIcon from '../../icons/brand/BrandIcon';
import AppDrawerButtons from './components/AppDrawerButtons';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

type ISideAppDrawerProps = { children: ReactNode };

const SideAppDrawer = ({ children }: ISideAppDrawerProps) => {
    const open = false;
    const { state, dispatch } = useContext(GlobalContext);
    const location = useLocation();

    const { selectedPage } = state;

    const getActivePage = (pageId: string): EAppPages => {
        switch (pageId) {
            case '': return EAppPages.DASHBOARD;
            case 'tasks': return EAppPages.TASKS;
            case 'courses': return EAppPages.COURSE;
            case 'settings': return EAppPages.SETTINGS;
            case 'students': return EAppPages.STUDENTS;
            case 'performance': return EAppPages.PERFORMANCE;
            case 'notifications': return EAppPages.NOTIFICATIONS;
            default: return EAppPages.DASHBOARD;
        }
    }

    const handlePageSelect = (pageName: EAppPages): void => {
        dispatch({
            type: GlobalActionTypes.APP_DRAWER_SELECT_PAGE,
            payload: { selectedPage: pageName }
        });
    }

    useEffect(() => {
        const currentPage = location.pathname.split('/')[1];
        const activePage = getActivePage(currentPage);
        if (selectedPage !== activePage) {
            handlePageSelect(activePage)
        }
    }, [location.pathname, selectedPage])

    const menuList = [
        { icon: <DashboardOutlinedIcon />, link: '/', text: EAppPages.DASHBOARD, blockId: 1 },
        { icon: <PeopleAltOutlinedIcon />, link: '/students', text: EAppPages.STUDENTS, blockId: 1 },
        { icon: <SchoolOutlinedIcon />, link: '/courses', text: EAppPages.COURSE, blockId: 1 },
        { icon: <TaskOutlinedIcon />, link: '/performance', text: EAppPages.PERFORMANCE, blockId: 1 },
        { icon: <TimerOutlinedIcon />, link: '/tasks', text: EAppPages.TASKS, blockId: 1 },
        { icon: <NotificationsNoneOutlinedIcon />, link: '/notifications', text: EAppPages.NOTIFICATIONS, blockId: 2 },
        { icon: <SettingsOutlinedIcon />, link: '/settings', text: EAppPages.SETTINGS, blockId: 2 },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ alignItems: 'center' }}>
                <DrawerHeader>
                    <Avatar sx={{ backgroundColor: 'transparent' }}>
                        <BrandIcon fontSize='large' />
                    </Avatar>
                </DrawerHeader>
                <Divider />
                <List sx={{ marginTop: 15 }}>
                    {menuList.map(({ icon, text, blockId, link }, index) => (
                        <React.Fragment key={text}>
                            {blockId === 1 && (
                                <AppDrawerButtons
                                    link={link}
                                    handlePageSelect={handlePageSelect}
                                    text={text}
                                    open={open}
                                    selectedPage={selectedPage}
                                    icon={icon}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuList.map(({ icon, text, blockId, link }, index) => (
                        <React.Fragment key={text}>
                            {blockId === 2 && (
                                <AppDrawerButtons
                                    link={link}
                                    handlePageSelect={handlePageSelect}
                                    text={text}
                                    open={open}
                                    selectedPage={selectedPage}
                                    icon={icon}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </List>
                <List sx={{ bottom: 10, position: 'absolute' }}>
                    <ListItem sx={{ marginLeft: -0.5 }}>
                        <Avatar >A</Avatar>
                    </ListItem>
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, minHeight: window.innerHeight, backgroundColor: "#555" }}>
                {children}
            </Box>
        </Box>
    );
}

export default SideAppDrawer