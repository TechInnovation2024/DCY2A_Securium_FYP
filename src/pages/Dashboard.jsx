// Dashboard.jsx

import React, { useState } from 'react';
import './Dashboard.css'; // Import your CSS file
import AddDetails from '../components/Form/AddDetails';
import PasswordGenerator from '../components/PasswordGenerator';
import PasswordAnalytics from '../components/PasswordAnalytics';

function Dashboard({ safePasswords, unsafePasswords, userAddress }) {
  return (
    <div className="container">
      <section className="">
        <div className="main-top">
          <h1>Dashboard</h1>
        </div>
        <section className="main-course">

        <div className="analytics-box">
          <PasswordAnalytics userAddress={userAddress} />
        </div>
        
        <div className="course-box">
            <AddDetails />
          </div>
      <div className="password-course-box">
        <PasswordGenerator />
      </div>
        </section>
      </section>
      
    
      
    </div>
  );
}

export default Dashboard;
