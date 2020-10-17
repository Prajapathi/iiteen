import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BarChartIcon from '@material-ui/icons/BarChart';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme) => ({
  root: {
      margin:'20px 20px',
      textAlign:'center',
      background: '#36698d', /* Old browsers */
      background: '-moz-linear-gradient(top,  #36698d 0%, #52a0a3 100%)', /* FF3.6-15 */
      background: '-webkit-linear-gradient(top,  #36698d 0%,#52a0a3 100%)', /* Chrome10-25,Safari5.1-6 */
      background: 'linear-gradient(to bottom,  #36698d 0%,#52a0a3 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#36698d", endColorstr="#52a0a3",GradientType=0 )', /* IE6-9 */
      color:'white',
      display:'flex',
      flexWrap:'wrap',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:'15px',
      '&:hover': {
      boxShadow:'2px 2px 10px #838587',
      },
        width:'200px',
        height:'200px',
        padding:'5px',
   
  },
  icon:{
    width:'100px',
    height:'100px'
  },
  title: {
      wordWrap: 'normal',
      margin:'0px 20px',
      fontSize:'24px'
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function HomeCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
      {(props.icon=='mock')?
        <ImportContactsIcon className={classes.icon}/>
        :((props.icon=='subject-wise')?
            <BarChartIcon className={classes.icon} />
            :((props.icon=='AITS')?
                <TrackChangesIcon className={classes.icon}/>
                :<ReplayIcon className={classes.icon}/>)
        )}
        <Typography className={classes.title} component="h2">
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
