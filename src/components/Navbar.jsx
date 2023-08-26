import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    Avatar,
    Divider,
    Grid,
    Menu,
    MenuItem,
    styled,
    useTheme,
} from '@mui/material';
import Search from './Search';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThemeContext from '../style/theme';
import MuiAppBar from '@mui/material/AppBar';
const drawerWidth = 340;
const profiles = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = ['Search', 'More Information'];

const Navbar = (props) => {
    // menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseSetting = () => {
        setAnchorEl1(null);
    };
    const handleClickSetting = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    //
    const { toggleTheme, mode } = useContext(ThemeContext);
    const theme = useTheme();
    //   drawer
    const [Draweropen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const Main = styled('main', {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' open={Draweropen}>
                <Toolbar>
                    <Grid
                        container
                        spacing={2}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Grid item xs>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={handleDrawerOpen}
                                edge='start'
                                sx={{
                                    mr: 2,
                                    ...(Draweropen && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            ml={5}
                            sx={{
                                display: { md: 'block', xs: 'none' },
                            }}
                        >
                            <Search />
                        </Grid>
                        <Grid item align='right' sx={{ flexGrow: '1' }}>
                            <IconButton onClick={handleClickSetting}>
                                <SettingsIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <Menu
                                id='basic-menu'
                                anchorEl={anchorEl1}
                                open={open1}
                                onClose={handleCloseSetting}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseSetting}
                                    >
                                        <Typography textAlign='center'>
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <QuestionMarkIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={toggleTheme}>
                                {mode === 'light' ? (
                                    <WbSunnyIcon sx={{ color: 'white' }} />
                                ) : (
                                    <DarkModeIcon sx={{ color: 'white' }} />
                                )}
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClick}>
                                <Avatar
                                    alt='Remy Sharp'
                                    src='/static/images/avatar/1.jpg'
                                />
                            </IconButton>
                            <Menu
                                id='basic-menu'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {profiles.map((profile) => (
                                    <MenuItem
                                        key={profile}
                                        onClick={handleClose}
                                    >
                                        <Typography textAlign='center'>
                                            {profile}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant='persistent'
                    anchor='left'
                    open={Draweropen}
                >
                    <DrawerHeader>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: 'bold', mr: 13 }}
                        >
                            ToDo App
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List sx={{ mt: 5, px: 2 }}>
                        {[
                            'My Day',
                            'Important',
                            'Planned',
                            'Assigned to me',
                            'Tasks',
                        ].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
            <Main open={Draweropen}>{props.children}</Main>
        </Box>
    );
};

export default Navbar;
