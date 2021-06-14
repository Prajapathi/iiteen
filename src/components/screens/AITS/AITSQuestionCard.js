import React, { useState } from 'react'
import { Grid, Paper, Card, CardHeader, CardContent, CardActions } from '@material-ui/core'
import QuestionPad from './QuestionPad'
import { Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const UseStyles = makeStyles((theme) => {
    return {
        paper: {
            width: '100%',
            height: '100vh'
        },
        grid: {
            width: '100%',
            height: '100vh'
        },
        card: {
            width: '100%',
            height: '100%',
            position: 'relative',
            border: '1px solid #bababa'
        },
        root: {
            width: '80%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        pad: {
            border: '1px solid #bababa',
            borderBottomLeftRadius: '2rem',
            overflow: 'hidden',

        },
        spacing: {
            '& > :not(:first-child)': {
                margin: 'auto'
            }
        }
    }
})


const AITSQuestionCard = (props) => {

    const classes = UseStyles()

    const [showQuestion, setShowQuestion] = useState(0)
    const question = props.questions[showQuestion]

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container className={classes.grid}>
                    <Grid item xs={12} md={5}>
                        <Card className={classes.card}>
                            <Box>
                                <CardHeader title={`Q. ${question.id}`} />
                            </Box>
                            <CardContent classes={{ root: classes.root }}>
                                <Typography variant='h6'>
                                    {question.question}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} md={7}>
                        <Grid item md={6} style={{ height: '50vh' }}>
                            <Card
                                className={classes.card}
                                style={{
                                    border: 'none',
                                    boxShadow: 'none'
                                }}>
                                <CardHeader title='Multiple Correct Answer' />
                            </Card>
                        </Grid>
                        <Grid item md={6} style={{ height: '50vh' }}>
                            <Box className={classes.pad}>
                                <QuestionPad
                                    questions={props.questions}
                                    showQuestion={showQuestion}
                                    setShowQuestion={setShowQuestion} />
                            </Box>
                        </Grid>
                        <Grid item md={12} style={{ height: '50vh' }}>
                            <Card
                                className={classes.card}
                                style={{
                                    border: 'none',
                                    boxShadow: 'none'
                                }}
                            >
                                {/* options */}
                                <CardContent>
                                    {question.options.map((option, index) =>
                                        <Box m={1} >
                                            <Button value={option.id} variant='outlined'>
                                                {option.value}
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>

                                <CardActions classes={{ spacing: classes.spacing }}>
                                    <IconButton
                                        onClick={() => setShowQuestion(showQuestion - 1)}
                                        disabled={showQuestion === 0 ? true : false}>
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                    <Button
                                        variant='contained'
                                        color='default'
                                        disabled={showQuestion === props.questions.length - 1 ? true : false}
                                        onClick={() => setShowQuestion(showQuestion + 1)}>
                                        Next
                                    </Button>
                                    <Button variant='contained' color='primary'>
                                        Submit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        </>
    )
}

export default AITSQuestionCard
