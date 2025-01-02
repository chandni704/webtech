import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Astar from './Astar.js'; // Import the standalone Astar component
import './common.css';

function HomePage() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post('http://localhost:5000/logout')
      .then((response) => {
        if (response.status === 200) {
          alert("Logout Successful!");
          navigate('/');
        } else {
          alert('Logout failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during logout. Please try again.');
      });
  };

  const events = [
    { imgSrc: '/assets/wedding.jpg', alt: 'Wedding', href: '/wedding', name: 'Wedding' },
    { imgSrc: '/assets/birtthday.jpg', alt: 'Birthday', href: '/birthday', name: 'Birthday' },
    { imgSrc: '/assets/naming-ceremony.jpg', alt: 'Naming Ceremony', href: '/naming', name: 'Naming Ceremony' },
    { imgSrc: '/assets/kitty_party.jpg', alt: 'Kitty Party', href: '/kitty', name: 'Kitty Party' },
    { imgSrc: '/assets/meetings.jpg', alt: 'Official Meetings', href: '/official', name: 'Official Meetings' },
    { imgSrc: '/assets/concerts.jpeg', alt: 'Concerts and Parties', href: '/concert', name: 'Concerts and Parties' },
  ];

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="icon">
          <img src="/assets/icon.png" alt="Logo" />
        </div>
        <div className="nav-buttons" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
  <button 
    onClick={() => navigate('/mybookings')} 
    className="btn-mybookings" 
    style={{
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
  >
    My Bookings
  </button>
  <a 
    href="#" 
    onClick={logout} 
    className="btn-logout" 
    style={{
      padding: '10px 15px',
      backgroundColor: '#dc3545',
      color: '#fff',
      borderRadius: '4px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i> Logout
  </a>
</div>
      </div>

      {/* Events List */}
      <div className="events-list">
        <div className="events-list-description">
        <h1 className="welcome-text">Welcome to Hotel Atom</h1>
         <h3 className="connect-text">Where Connections Meet Comfort and Luxury</h3>

        </div>

        {/* Heading for Events */}
        <h2 className="events-heading">Events</h2>

        <div className="lists">
          {events.map((event, index) => (
            <div className="event-block" key={index} style={{ marginBottom: '20px' }}>
              <img
                src={event.imgSrc}
                alt={event.alt}
                onClick={() => (window.location.href = event.href)}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <h3
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  textShadow: '0 0 2px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.5)',
                  fontSize: '1.5rem',
                  marginTop: '10px',
                }}
              >
                {event.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Venue List */}
      <div className="venues">
        <h2>All Venues</h2>
        <div className="venue-cards">
          {/* You can fill out this section similarly to the Events section */}
        </div>
      </div>

      {/* Astar Component */}
      <Astar />

      {/* Footer Section */}
      <div className="footer">
        <div className="social-links">
          <a href="https://x.com/prashantuppar89"  target="_blank"><i className="fa-brands fa-square-twitter"></i></a>
          <a href="mailto:msscetengineeringprojects@gmail.com"><i className="fa-solid fa-envelope"></i></a>
          <a href="#insta"><i className="fa-brands fa-instagram" target="_blank"></i></a>
          <a href="https://www.linkedin.com/in/prashant-uppar-soft89/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
          <a href="#facebook"><i className="fa-brands fa-facebook" target="_blank"></i></a>
        </div>
        <div className="footer-links">
          <a href="#privacy-policy">Legal Disclaimer |</a>
          <a href="#privacy-policy">Privacy Policy |</a>
          <a href="#terms">Terms of Use |</a>
          <a href="#support">Privacy & Cookies |</a>
          <a href="#support">Support |</a>
          <a href="tel:+91 8050018611"><i className="fa-solid fa-phone"></i> +91 8050018611</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
