import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import AITSCard from '../AITS/AITSCard'
import '../../../styles/pagination.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationComponent() {
  const initialCards=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [cards,setCards]=React.useState([1,2,3,4,5,6])
  const [cardNumber,setcardNumber]=React.useState(6)

  const handleChange = (event, value) => {
    setPage(value);
    setCards(initialCards.slice((value-1)*cardNumber,((value-1)*cardNumber)+cardNumber))
  };
  console.log(cards,(page-1)*cardNumber)
  return (
    <div className={classes.root}>
      <div className="report-cards-section">
        {
          cards.map((card,index) => (
              <div className="report-page-card" >
                <AITSCard index={initialCards[((page-1)*cardNumber)+index+1]}/>
              </div>
          ))
        }
      </div>
        <Pagination className="pagination-section" count={Math.ceil(initialCards.length/cardNumber)} page={page} onChange={handleChange} />
    </div>
  );
}