import React from 'react'
import '../../../styles/subjectwise.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from '../../elements/Loading'
import PreviousYearSubjectSection from './PreviousYearSubjectSection'

export default function PreviousYearSubjectwise() {
    const [open, setOpen] = React.useState(true)
    const [classNumber, setClassNumber] = React.useState("11")
    const [loading, setLoading] = React.useState(false)

    const selectClass = (n) => {
        setClassNumber(n)
        setOpen(false)
    }
    document.title = "PreviousYearSubjectwise | IITEENS"
    return (
        <div className="screen" id="PreviousYearsubjectwise">
            {loading ? <Loading /> :
                open ?
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth={true}
                        id="class-select-dialog"
                    >
                        <DialogTitle id="alert-dialog-title">{"Please select your class"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Button onClick={() => selectClass("11")}>
                                    Class 11
                                </Button>
                                <Button onClick={() => selectClass("12")}>
                                    Class 12
                                </Button>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    :
                    <>
                        <h1 style={{ textAlign: 'center', fontWeight: '800', letterSpacing: '5px', wordSpacing: '15px', color: '#3F7B94', padding: '15px 0px' }}>SUBJECT-WISE PREVIOUS YEAR QUESTION BANK</h1>
                        <div id="phy"><PreviousYearSubjectSection subject="physics" classNumber={classNumber} loadingStart={setLoading} /></div>
                        <div id="chem"><PreviousYearSubjectSection subject="chemistry" classNumber={classNumber} loadingStart={setLoading} /></div>
                        <div id="mat"><PreviousYearSubjectSection subject="maths" classNumber={classNumber} loadingStart={setLoading} /></div>
                    </>
            }
        </div>
    )
}
