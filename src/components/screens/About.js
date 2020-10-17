import React from 'react'
import about from '../../assets/images/about.jpg'
import '../../styles/about.css'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    aboutHead:{
        [theme.breakpoints.down('sm')]: {
            fontSize:'32px'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '38px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '48px',
        },
    },
    aboutsubHead:{
        [theme.breakpoints.down('sm')]: {
            margin:'8px 10px',
            fontSize:'1.5em'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '30px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '34px',
        },
    },
    aboutcontent:{
        [theme.breakpoints.down('sm')]: {
            fontSize:'1.5em'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '24px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '28px',
        },
    },
}))

export default function About() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div>
            <div className="about-img">
                <div id="overlay">
                    <Typography component="h1" variant="h2" align="center" gutterBottom className={classes.aboutHead} id="overlay-text">
                            Know More About Us
                            <hr style={{background:'white'}}/>
                    </Typography>
                </div>
            </div>
            <Paper  elevation={8} id="about-ppr">
                <div id="about-content">
                    <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom style={{paddingTop:'2%'}} className={classes.aboutsubHead}>
                        Money should not stop you to become IITian in future
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph style={{padding:'2% 10%'}} className={classes.aboutcontent}>
                            We provide online engineering entrance exam test at a very cheap rate so that money shouldnt be a problem for students to study and practise.
                            Exiitians sponser those who are not able to afford the test .
                    </Typography>
                
                </div>
            </Paper>
        </div>
    )
}
