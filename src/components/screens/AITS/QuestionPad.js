import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';



const useStyles = makeStyles((theme) => {
    return {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            placeItems: 'center',
            backgroundColor: '#efefef',
            padding: theme.spacing(2)
        },
        button: {
            minWidth: theme.spacing(7),
        }
    }
})

const QuestionPad = (props) => {


    //props has an array questions, which is an object with 2 properties id and isBookmarked
    const classes = useStyles(props.questions[props.showQuestion], props.showQuestion)

    return (
        <>
            <div className={classes.grid}>
                {props.questions.map((question, index) =>
                    <Box m={1} component='div' key={index}>
                        <Button
                            variant='contained'
                            classes={{ root: classes.button }}
                            style={{
                                backgroundColor:
                                    props.showQuestion + 1 === question.id ? red[600]
                                        : question.isBookmarked ? blue[600] : 'white'
                            }}
                            onClick={() => { props.setShowQuestion(index) }}>
                            <Typography variant='h6'>
                                {index + 1}
                            </Typography>
                        </Button>
                    </Box>
                )}
            </div>
        </>
    )
}

export default QuestionPad

