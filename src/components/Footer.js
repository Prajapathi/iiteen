import React from 'react'
import '../styles/footer.css'
import Contact from './elements/Contact/Contact'

export default function Footer() {
    const [open,setOpen]=React.useState(false)
    return (
        <>
            {open?<Contact open={open} close={()=>setOpen(false)}/>:null}
            <div id="footer">
                <div>
                    iiteens.in@gmail.com
                </div>
                <div>
                    <ul>
                    <li> Terms of Use</li>
                    <li> Privacy Notice</li>
                    <li> Conditions of Use</li>
                    </ul>
                </div>
                <div>
                    <div>
                        Need Help?
                    </div>
                    <button id="footer-button" onClick={()=>setOpen(true)}>Contact Us</button>
                </div>
            </div>
        </>
    )
}
