import React from 'react'
import '../styles/footer.css'

export default function Footer() {
    return (
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
                <button id="footer-button">Contact Us</button>
            </div>
        </div>
    )
}
