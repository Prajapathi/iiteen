import React from 'react'
import '../../../styles/contact.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Contact(props) {
    return (
        <div>
          <Dialog
                id="contact-dialog"
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                style= {{
                    backgroundColor: 'transparent',}}
            >
                <DialogTitle id="alert-dialog-title" disableTypography className="contact-title-sec">
                    <IconButton onClick={props.close} className="dialog-close-icon">
                        <CloseIcon />
                    </IconButton>
                    <div id="contact-title">Contact Us</div>
                </DialogTitle>
                <DialogContent className="dialog-content-contact">
                    <DialogContentText id="alert-dialog-description">
                       <h5 className="contact-list" style={{marginTop:"0px"}}>Need Help?</h5>
                       We are here to help you. You can call our support team or can just drop a mail to us.
                       <br/>
                       <div className="contact-list">Email</div>
                       iiteens.in@gmail.com
                       <div className="contact-list">Customer Support</div>
                       +91 6265188325
                    </DialogContentText>
                </DialogContent>
            </Dialog>  
        </div>
    )
}
