import React from 'react'
import '../../styles/signin.css'
import Button from 'react-bootstrap/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Signin(props) {
    return (
        <div>
                <Dialog
                    className="signin-dialog"
                    open={props.openLogin}
                    onClose={props.closeLogin}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    id="class-select-dialog"
                >
                    <DialogTitle id="alert-dialog-title">{"Please select your class"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Button>
                                Class 11
                            </Button>
                            <Button>
                                Class 12
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
        </div>
    )
}
