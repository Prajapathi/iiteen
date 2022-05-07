import React from 'react';
import { connect } from 'react-redux'
import { signOut } from '../../store/action/Authentication'
import firebase from 'firebase'
import clsx from 'clsx';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/iiteenslogo.png'
import About from '../elements/About/About'
import EditName from './EditName'
import EditImage from './EditImage'
import ComingSoon from '../screens/ComingSoon/ComingSoon';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: '55px',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    // },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    mynav: {
        background: 'white',
        color: '#498E9C'
    },
    menuHead: {

    },
    logoName: {
        margin: 'auto 5px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: ' 5px auto',
        marginBottom: '10px',
        color: '#498E9C'
    },
    tab: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        margin: '0px'
    },
    tabs: {
        cursor: 'pointer',
        padding: theme.spacing(1),
        marginRight: "2%",
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '20px',
        },
        '&:hover': {
            color: "#376B8E"
        },

    },
    notif: {
        padding: theme.spacing(1),
        marginRight: "1.5%",
        marginLeft: '15%',
        marginTop: '-5px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '40px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '44px',
        },
        '&:hover': {
            color: "#376B8E"
        },
    },
    notifBadge: {
        padding: theme.spacing(1),
        padding: '0px 0px',
        marginLeft: '-20px',
        marginTop: '5px',
        marginRight: '10px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '40px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '44px',
        },

    },
    navlogo: {
        height: '56px',
        [theme.breakpoints.down('sm')]: {
            height: '45px'
        },
        marginTop: "0px",
        marginBottom: "0px"
    },
    navimg: {
        height: '35px',
        width: '35px',
        objectFit: "cover",
        objectPosition: "center center",
        background: "grey",
        border: '1px solid grey',
        borderRadius: '50%',
        marginRight: "1.5%",
        marginLeft: '2.5%',
        [theme.breakpoints.down('sm')]: {
            marginRight: '15px'
        },
    },
    logoutConfirmMessage: {
        padding: "5px 10px"
    },
    logoutConfirmOption: {
        textAlign: "center"
    }
}));

export function LeftMenu(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openAbout, setOpenAbout] = React.useState(false)
    const [openEditName, setOpenEditName] = React.useState(false)
    const [openEditImage, setOpenEditImage] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const logoutConfirm = Boolean(anchorEl);
    const [openComingSoon, setOpenComingSoon] = React.useState(false);

    console.log(props.user, "??")
    //for confirm logout
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const signout = () => {
        firebase.auth().signOut().then(() => {
            console.log("Sign-out successful")
            props.signOut()
        }).catch((error) => {
            console.log("An error happened.", error)
        });
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {open ? <About open={openAbout} close={() => setOpenAbout(false)} /> : null}
            <div className={classes.root} style={{ background: "white !important" }}>
                <CssBaseline />
                <AppBar position="fixed"
                    className={
                        clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}

                >
                    <Toolbar className={clsx(classes.mynav)}>
                        {
                            props.isAuthenticated ?
                                <IconButton color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                : null
                        }
                        <Grid container alignItems="flex-start"
                            justify="flex-start"
                            direction="row"
                        >
                            {!open ? <Link to="/"> <img src={logo} className={classes.navlogo} /> </Link>
                                : null}
                        </Grid>
                        <Grid container alignItems="flex-end"
                            justify="flex-end"
                            direction="row"
                            style={{ marginRight: '3%' }}
                        >
                            <div className={clsx(classes.tab)} >
                                {
                                    props.isAuthenticated ?
                                        <>
                                            <Link to="/" className="menu-link">
                                                <Typography className={clsx(classes.tabs)} >Home </Typography>
                                            </Link>
                                            <Link to="/Report" className="menu-link">
                                                <Typography className={clsx(classes.tabs)} >Report </Typography>
                                            </Link>
                                            <Typography className={clsx(classes.tabs)} >IITeenCorner </Typography>
                                            <Link to="/Plan" className="menu-link"><Typography className={clsx(classes.tabs)} >Plan </Typography></Link>

                                            <Badge style={{}} className={clsx(classes.notifBadge)}
                                                overlap="circle"
                                                badgeContent={4}
                                                color="primary">
                                                <NotificationsRoundedIcon className={clsx(classes.notif)} />
                                            </Badge>
                                            <img src={props.user.photoURL ? props.user.photoURL : avatar} className={clsx(classes.navimg)} />
                                            <Typography className={clsx(classes.tabs)} onClick={handleMenu}>Logout </Typography>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                                open={logoutConfirm}
                                                onClose={handleClose}
                                            >
                                                <div className={clsx(classes.logoutConfirmMessage)}>Are you Sure?</div>
                                                <MenuItem onClick={() => {
                                                    setAnchorEl(false)
                                                    signout()
                                                }} >Yes</MenuItem>
                                                <MenuItem onClick={handleClose} >No</MenuItem>
                                            </Menu>
                                        </>
                                        :
                                        <>
                                            <Link href="/" hash="#section3" className="menu-link">
                                                <Typography className={clsx(classes.tabs)} >Home </Typography>
                                            </Link>
                                        </>
                                }

                            </div>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {props.isAuthenticated ?
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{ paper: classes.drawerPaper, }}
                    >
                        <div className={classes.menuHead}>
                            <div className={classes.drawerHeader}>
                                <img src={logo} className={classes.navlogo} style={{}} />
                                <IconButton onClick={handleDrawerClose} >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <div className="profile-pic-container">
                                <img src={props.user.photoURL ? props.user.photoURL : avatar} className="left-menu-profile-pic" />
                                {
                                    openEditImage ?
                                        null
                                        :
                                        <div className="profile-pic-edit-overlay">
                                            <EditIcon className="edit-image-icon" style={{ fontSize: "36px" }} onClick={() => setOpenEditImage(true)} />
                                        </div>
                                }
                            </div>
                            {
                                openEditImage ? <EditImage closeEdit={() => setOpenEditImage(false)} /> : null
                            }

                            <div className={classes.name} >
                                {openEditName ?
                                    <EditName closeEdit={() => setOpenEditName(false)} data={props.user ? props.user.displayName : null} />
                                    :
                                    <Typography variant="h6" style={{ width: "60%", margin: "0px 20%", textAlign: "center" }}>
                                        {(props.user && props.user.displayName) ? props.user.displayName : "Unnamed User"}
                                        <EditIcon style={{ fontSize: '16px', marginTop: "15px", cursor: "pointer" }} onClick={() => setOpenEditName(true)} />
                                    </Typography>
                                }
                            </div>
                        </div>
                        <List>
                            <ListItem button  >
                                <ListItemText primary={"My Purchases"} />
                            </ListItem>
                            <Link to="/comingSoon" style={{ color: 'black' }}>
                                <ListItem button  >
                                    <ListItemText primary={"Ask Experts"} />
                                </ListItem>
                            </Link>
                            <Link to="/comingSoon" style={{ color: 'black' }}>
                                <ListItem button  >
                                    <ListItemText primary={"Study Materials"} />
                                </ListItem>
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button  >
                                <ListItemText primary={"About Us"} onClick={() => setOpenAbout(true)} />
                            </ListItem>
                            <ListItem button  >
                                <ListItemText primary={"Logout"} />
                            </ListItem>
                        </List>
                    </Drawer>
                    : null
                }
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        user: state.AuthReducer.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)