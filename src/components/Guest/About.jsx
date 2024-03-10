import React from 'react'
import john from './images/john-doe.png'
import './About.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img src={john} alt='john' />
                <div className='col-2'>
                    <h2>About</h2>
                    <span className='line'></span>
                    <p>Securium is a password management by adding blockchain technology. This means your passwords are super secure! Our system uses top-notch encryption and easy-to-use features, so you can manage your passwords stress-free. Plus, our application has an extra layer of security with AES encryption, giving you peace of mind for all your online accounts. Join us and keep your online life safe with Securium!</p>
                    <p></p>
                    
                </div>
            </div>
        </div>
    )
}

export default About
