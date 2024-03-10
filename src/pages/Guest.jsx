import React from 'react'
import Navbar from '../components/Guest/Navbar'
import Hero from '../components/Guest/Hero'
import About from '../components/Guest/About'
import Testimonials from '../components/Guest/Testimonials'
import Demo from '../components/Guest/Demo'
import Footer from '../components/Guest/Footer'
import './Guest.css'


const Guest = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
     
      <Demo />
      <Footer />
    </div>
  );
};

export default Guest;
