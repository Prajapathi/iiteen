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
                    id="signin-dialog"
                    open={props.openLogin}
                    onClose={props.closeLogin}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    style= {{
                        backgroundColor: 'transparent',}}
                >
                    <DialogTitle id="alert-dialog-title" className="dialog-content-signin">{"Please enter your mobile number"}</DialogTitle>
                    <DialogContent className="dialog-content-signin">
                        <DialogContentText id="alert-dialog-description">
                            
                            <Button>
                                Enter
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
        </div>
    )
}
