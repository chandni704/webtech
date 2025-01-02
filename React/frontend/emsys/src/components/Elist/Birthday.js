import React, { useState } from "react";
import "./wedding.css"; // Ensure your CSS file is in the correct path

const Birthday = () => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [availableDates, setAvailableDates] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Available dates by month
  const calendarHash = {
    January: ["2024-01-01", "2024-01-05", "2024-01-12", "2024-01-20", "2024-01-28"],
    February: ["2024-02-01", "2024-02-07", "2024-02-14", "2024-02-22"],
    March: ["2024-03-03", "2024-03-07", "2024-03-15", "2024-03-21", "2024-03-28"],
    April: ["2024-04-02", "2024-04-10", "2024-04-15", "2024-04-20", "2024-04-27"],
    May: ["2024-05-01", "2024-05-06", "2024-05-12", "2024-05-18", "2024-05-25"],
    June: ["2024-06-03", "2024-06-09", "2024-06-14", "2024-06-19", "2024-06-26"],
    July: ["2024-07-01", "2024-07-07", "2024-07-13", "2024-07-19", "2024-07-28"],
    August: ["2024-08-01", "2024-08-05", "2024-08-12", "2024-08-17", "2024-08-30"],
    September: ["2024-09-01", "2024-09-05", "2024-09-10", "2024-09-15", "2024-09-22"],
    October: ["2024-10-04", "2024-10-11", "2024-10-20", "2024-10-25"],
    November: ["2024-11-01", "2024-11-07", "2024-11-14", "2024-11-21", "2024-11-28"],
    December: ["2024-12-01", "2024-12-05", "2024-12-11", "2024-12-18", "2024-12-25"],
  };
  

  // Handle calendar button click
  const handleCalendarButtonClick = () => {
    const dates = calendarHash[selectedMonth] || [];
    setAvailableDates(dates.length > 0 ? dates : ["No dates available"]);
    setIsPopupVisible(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="icon">
          <img src="/assets/icon.png" alt="Logo" />
        </div>
        <div className="home">
          <a href="/home">
            <i className="fa-solid fa-house"></i> Home
          </a>
        </div>
      </div>

      {/* Carousel */}
      <div className="carousel">
        <div className="slides">
          <img src="/assets/bir4.jpg" alt="Image 1" />
          <img src="/assets/bir2.jpg" alt="Image 2" />
          <img src="/assets/bir3.jpg" alt="Image 3" />
          <img src="/assets/bir1.jpg" alt="Image 4" />
        </div>
      </div>

      {/* Description */}
      <div className="description" style={{ textAlign: "center" }}>
        <h1 className="animated fadeIn">Celebrate Your Special Day with Us!</h1>
        <p
          className="animated fadeIn delay-1s"
          style={{ fontSize: "20px", color: "rgb(255, 255, 255)" }}
        >
          "A birthday is a moment to cherish, and we make it unforgettable."
        </p>
      </div>

      {/* Availability Section */}
      <div className="row2">
        <div className="col2 animated fadeInLeft">
          <h1>Check Venue Availability</h1>
          <p className="animated fadeIn delay-1s"
          style={{ fontSize: "20px", color: "rgb(243, 243, 243)" }}>
            Planning your birthday? Select a month to find the perfect date for
            your celebration. Let's make it magical together!
          </p>
        </div>
        <div className="col2 animated fadeInRight">
          <div className="calendar-icon">
            <i className="fa-solid fa-calendar-days"></i>
          </div>
          <label htmlFor="month-select" style={{ alignSelf: "center" }}>
            Select a month:
          </label>
          <br />
          <select
  id="month-select"
  style={{ alignSelf: "center", color: "white" }}
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
>
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>

          <br />
          <button className="calendar-button" onClick={handleCalendarButtonClick}>
            Check Calendar
          </button>
        </div>
      </div>

      {/* Calendar Popup */}
      {isPopupVisible && (
        <div id="calendar-popup" className="calendar-popup">
          <div className="calendar-popup-content animated zoomIn">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="calendar">
              <h2>Available Dates</h2>
              <ul id="calendar-slots">
                {availableDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <div className="row3">
        <h3>Hit the button below to reserve your party!</h3>
        <button
          className="book"
          onClick={() => (window.location.href = "/booking")}
        >
          Book now
        </button>
      </div>

      {/* Footer */}
      <footer className="footer animated fadeInUp">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="social-links">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Birthday;
