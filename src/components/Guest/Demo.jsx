import React from 'react'
import './Demo.css'

const Demo = () => {
    return (
        <div className='demo' id='demo'>
            <div className='container'>
                <div className='col-1'>
                    <p>Have questions or feedback? </p>
                    <p>We'd love to hear from you! Reach out to us anytime via email at </p>
                    <a href="mailto:info@securium.com" class="email-link">info@securium.com</a>

                    <p> Our friendly support team is here to assist you with any inquiries or concerns you may have. Your satisfaction and security are our top priorities. Let's stay connected and keep your online world secure with Securium!</p>
                   
                </div>
                <div className='col-2'>
                    <iframe width='570' height='320' src='https://www.youtube.com/embed/IDJD65SNFuQ?si=FYrhVGt6OyEAcEPo' title='Youtube video player' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

                </div>
            </div>
        </div>
    )
}

export default Demo
