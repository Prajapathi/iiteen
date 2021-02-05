import React from 'react';
import clsx from 'clsx';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
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
import avatar from '../assets/images/avatar.png'
import logo from '../assets/images/iiteenslogo.png'

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    menuButton: {
        marginRight: theme.spacing(2),
    },
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
        color:'#498E9C'
    },
    menuHead: {
        
    },
    logoName:{
        margin:'auto 5px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    profile: {
        margin: '10px auto',
        height: '120px',
        width: '120px',
        border: '1px solid grey',
        borderRadius: '50%'
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
            color:"#376B8E"
        },
        
    },
    notif: {
        padding: theme.spacing(1),
        marginRight: "1.5%",
        marginLeft:'15%',
        marginTop:'-5px',
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
            color:"#376B8E"
        },
    },
    notifBadge: {
        padding: theme.spacing(1),
        padding:'0px 0px',
        marginLeft:'-20px',
        marginTop:'5px',
        marginRight:'10px',
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
    navlogo:{
        height:'50px',
        [theme.breakpoints.down('sm')]: {
            height:'40px'
        },
    },
    navimg: {
        height: '35px',
        width: '35px',
        border: '1px solid grey',
        borderRadius: '50%',
        marginRight: "1.5%",
        marginLeft:'2.5%',
        [theme.breakpoints.down('sm')]: {
            marginRight:'15px'
        },
    }

}));

export default function LeftMenu() {
    
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return ( 
        <div className = { classes.root }>
            <CssBaseline/>
            <AppBar position = "fixed"
                className = {
                clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
            <Toolbar className = { clsx(classes.mynav)}>
            <IconButton color = "inherit"
                aria-label = "open drawer"
                onClick = { handleDrawerOpen }
                edge = "start"
                className = { clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon/>
            </IconButton> 
            <Grid container alignItems = "flex-start"
                justify = "flex-start"
                direction = "row"
            > 
                    {!open ? <Link to="/"> <img src={logo} className={classes.navlogo}/> </Link>
                           :null} 
            </Grid> 
            <Grid container alignItems = "flex-end"
                justify = "flex-end"
                direction = "row"
                style = {{ marginRight: '3%' }}
            >
                <div className = { clsx(classes.tab) } >
                    <Link to="/Home" className="menu-link">
                        <Typography className = { clsx(classes.tabs) } >Home </Typography>
                    </Link>
                    <Typography className = { clsx(classes.tabs) } >Report </Typography> 
                    <Typography className = { clsx(classes.tabs) } >IITeenCorner </Typography> 
                    <Typography className = { clsx(classes.tabs) } >Plan </Typography>
                    <Badge style={{}} className = { clsx(classes.notifBadge) }
                            overlap="circle" 
                            badgeContent={4} 
                            color="primary">
                                <NotificationsRoundedIcon className = { clsx(classes.notif) }/>
                    </Badge>
                    <img src = { avatar } className = { clsx(classes.navimg) }/>
                    <Typography className = { clsx(classes.tabs) } >Logout </Typography>
                </div>
            </Grid>
            </Toolbar> 
            </AppBar>
            <Drawer
                className = { classes.drawer }
                variant = "persistent"
                anchor = "left"
                open = { open }
                classes = {{paper: classes.drawerPaper,}}
            >
                <div className = {classes.menuHead}>
                    <div className = {classes.drawerHeader}>
                        <img src={logo} className={classes.navlogo} style={{}}/>
                        <IconButton onClick = { handleDrawerClose } > 
                                    <MenuIcon/>
                        </IconButton>
                    </div> 
                    <img src = { avatar }style = {{ marginLeft: '29%' }}className = { classes.profile }/>
                    <div className = { classes.name } >
                        <Badge overlap="circle" badgeContent={<EditIcon style={{ fontSize: '16px', marginLeft: '40px',marginTop:'40px'}}/>} color=""><Typography variant = "h6" > Anjali Patle </Typography></Badge> 
                        {/* <EditIcon style = {{ fontSize: '16px', marginLeft: '5px'}}/> */}
                    </div> 
                </div>
                <List>
                    {['My Purchases', 'Ask Experts', 'Study Materials', 'How to Study'].map((text, index) => ( 
                        <ListItem button key = { text } >
                            <ListItemText primary = { text }/> 
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List> 
                    {['About', 'Logout', 'Setting'].map((text, index) => ( 
                        <ListItem button key = { text } >
                            <ListItemText primary = { text }/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            </div>
        );
    }