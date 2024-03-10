import React, { useState, useEffect, useContext } from 'react';
import wlogo from "../assets/wlogo.png";
import './Sidebar.css';
import {
  FaTh,
  FaBars,
  FaShoppingBag,
  FaThList,
} from 'react-icons/fa';
import { ImExit } from "react-icons/im";
import { BsRobot , BsFillSafeFill} from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import StoreContext from '../store/store.js'; // Import your context

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { Walletstore, setWalletStore } = useContext(StoreContext); // Use useContext to access the context

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/vault',
      name: 'Vault',
      icon: <BsFillSafeFill />,
    },
    {
      path: '/assistant',
      name: 'AI Assistant',
      icon: <BsRobot />,
    },
    {
      path: '/watch',
      name: 'Demo',
      icon: <MdOutlineOndemandVideo />,
    },
    
  ];

  // Use useEffect to detect screen width and open the sidebar for laptops and tablets
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Open sidebar for laptops and tablets
      } else {
        setIsOpen(false); // Close sidebar for mobile
      }
    };

    // Add event listener to window resize
    window.addEventListener('resize', handleResize);

    // Initialize sidebar state based on initial screen width
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to close the sidebar on mobile
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Function to handle link clicks on mobile
  const handleLinkClick = () => {
    closeSidebar();
  };

  const handleDisconnect = () => {
    // Update the Connected state using the context
    setWalletStore({
      ...Walletstore,
      Connected: false, // Update the Connected state
      // Reset other relevant states if needed
    });

    // Remove the "Connected" item from local storage
    localStorage.removeItem('Connected');
  };

  return (
    <div className="container">
      <div
        style={{ width: isOpen ? '200px' : '50px' }}
        className={`sidebar bg-0a0939 text-white min-h-screen transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'open' : ''}`}
      >
        <div className="top_section p-4">
          <img src={wlogo} alt="Logo" className="w-15 h-8" 
            style={{ display: isOpen ? 'block' : 'none' }}
          />
           
          {window.innerWidth < 768 && (
            <div
              style={{ marginLeft: isOpen ? '30px' : '0px' }}
              className="bars text-2xl cursor-pointer"
              onClick={toggle} // Handle toggle button click
            >
              <FaBars />
            </div>
          )}
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link flex items-center p-3 gap-2 hover:bg-8cacc5 hover:text-white"
            activeClassName="active bg-blue-500 text-white"
            onClick={handleLinkClick} // Handle link click (close sidebar on mobile)
          >
            <div className="icon text-xl">{item.icon}</div>
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className="link_text text-base font-semibold"
            >
              {item.name}
            </div>
          </NavLink>
          
        ))}
        
        {isOpen && (
          <div className="disconnect-button-container" style={{ marginTop: window.innerWidth >= 768 ? '360px' : '200px' }}>
            <button onClick={handleDisconnect} className="disconnect-button">
              <ImExit className="button-icon" /> Leave
            </button>
          </div>
        )}
      </div>
      
      <main className="pl-6 flex-grow">
        <div style={{ overflowY: 'auto', paddingLeft: window.innerWidth >= 768 ? '200px' : '40px', maxHeight: '100vh' }}>{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
