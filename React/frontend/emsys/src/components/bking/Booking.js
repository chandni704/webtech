import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from 'axios';
import './book.css';

const EventBookingForm = () => {
  const bookingID = `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const [formData, setFormData] = useState({
    fullName: '',
    aadharNumber: '',
    phoneNumber: '',
    gender: '',
    age: '',
    address: '',
    email: '',
    eventDate: '',
    event: '',
    hall: '',
    BID:bookingID
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value
    }));
  };

  const validateForm = () => {
    const { fullName, aadharNumber, phoneNumber, gender, age, address, email, eventDate, event, hall } = formData;
    
    if (!fullName || !aadharNumber || !phoneNumber || !gender || !age || !address || !email || !eventDate || !event || !hall) {
      alert('Please fill all the fields!');
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address!');
      return false;
    }

    // Check if phone number is valid
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid phone number!');
      return false;
    }

    return true;
  };

  const handleBooking = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!validateForm()) {
      return;
    }

    try {
      // Send data using Axios to the backend API
      const response = await axios.post('http://localhost:5000/submit-form', formData, {
        headers: { 'Content-Type': 'application/json' }, // Set content type for JSON
      });

      if (response.status === 200 && response.data.ok) {
        alert('Booking successful!');
        setShowReceipt(true); // Show the receipt component or UI
      } else if (response.status === 401) {
        alert('Please login first');
      } else {
        alert('Error in booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Title and Subtitle Styling
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Booking Receipt', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Thank you for booking with us!', 105, 30, { align: 'center' });

    // Receipt Content
    const receiptData = [
        ['Field', 'Details'],
        ['Name', formData.fullName],
        ['Aadhar Number', formData.aadharNumber],
        ['Phone', formData.phoneNumber],
        ['Gender', formData.gender],
        ['Age', formData.age],
        ['Email', formData.email],
        ['Address', formData.address],
        ['Event Date', formData.eventDate],
        ['Event Type', formData.event],
        ['Venue', formData.hall],
        ['Booking ID', bookingID],
    ];

    // Add Table with Borders
    doc.autoTable({
        head: [receiptData[0]],
        body: receiptData.slice(1),
        margin: { top: 40 },
        styles: {
            font: 'helvetica',
            fontSize: 12,
            cellPadding: 4,
            lineWidth: 0.2,
            lineColor: [0, 0, 0], // Black border
            cellWidth: 'auto',
            tableWidth: 'auto',
            halign: 'center',
            valign: 'middle'
        },
        headStyles: {
            fillColor: [255, 220, 100], // Light yellow header color
            textColor: [0, 0, 0],
            fontSize: 14,
            fontStyle: 'bold',
            lineWidth: 0.5 // Header border
        },
        bodyStyles: {
            fillColor: [245, 245, 245], // Light gray for rows
            textColor: [0, 0, 0],
            fontSize: 12,
            lineWidth: 0.2
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255] // White for alternate rows
        }
    });

    // Add Signature Image
    const signatureSrc = '/assets/signatre.png'; // Replace with your signature image path
    const signatureWidth = 50; // Width of the signature
    const signatureHeight = 20; // Height of the signature
    const signatureX = 130; // X-coordinate for the signature
    const signatureY = doc.lastAutoTable.finalY + 20; // Place below the table

    // Add text label for signature
    doc.addImage(signatureSrc, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);

    // Save the PDF
    doc.save('receipt.pdf');
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      aadharNumber: '',
      phoneNumber: '',
      gender: '',
      age: '',
      address: '',
      email: '',
      eventDate: '',
      event: '',
      hall: ''
    });
  };

  const goHome = () => {
    navigate('/home');
  };

  return (
    <div>
      {!showReceipt ? (
        <div id="formContainer" className="form-container">
          <h2>Event Booking Form</h2>
          <form id="registrationForm" onSubmit={handleBooking}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <label htmlFor="aadharNumber">Aadhar Number</label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="457812459712"
            />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <div className="radio-group">
              <label>Gender</label>
              <div className="radio-container">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              max="70"
              value={formData.age}
              onChange={handleChange}
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="abcd@gmail.com"
            />

            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />

            <label htmlFor="event">Event Type</label>
            <select
              name="event"
              id="event"
              value={formData.event}
              onChange={handleChange}
            >
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Naming Ceremony">Naming Ceremony</option>
              <option value="Kitty Party">Kitty Party</option>
              <option value="Official Meetings">Official Meetings</option>
              <option value="Concert">Concert</option>
              <option value="Party">Party</option>
            </select>

            <label htmlFor="hall">Select Venue</label>
            <select
              name="hall"
              id="hall"
              value={formData.hall}
              onChange={handleChange}
            >
              <option value=" ">Choose Your Venu</option>
              <option value="Garden Hall">Garden Hall</option>
              <option value="Swimming Pool Pavilion">Swimming Pool Pavilion</option>
              <option value="Elegant Ballroom">Elegant Ballroom</option>
              <option value="Terrace Lounge">Terrace Lounge</option>
              <option value="Majestic Courtyard">Majestic Courtyard</option>
              <option value="Sky Lounge">Sky Lounge</option>
            </select>

            <div className="button-container">
              <input type="submit" value="Book Now" />
              <input type="button" value="Reset" onClick={resetForm} />
              <input type="button" value="Go Home" onClick={goHome} />
            </div>
          </form>
        </div>
      ) : (
        <div id="receiptContainer" className="receipt-container">
          <h2>Booking Receipt</h2>
          <div id="receiptDetails" className="receipt-details">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{formData.fullName}</td>
                </tr>
                <tr>
                  <td>Aadhar Number</td>
                  <td>{formData.aadharNumber}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{formData.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{formData.gender}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{formData.age}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{formData.address}</td>
                </tr>
                <tr>
                  <td>Event Date</td>
                  <td>{formData.eventDate}</td>
                </tr>
                <tr>
                  <td>Event Type</td>
                  <td>{formData.event}</td>
                </tr>
                <tr>
                  <td>Venue</td>
                  <td>{formData.hall}</td>
                </tr>
                <tr>
                  <td>Booking ID</td>
                  <td>{bookingID}</td>
                </tr>
              </tbody>
            </table>
            <div className="button-container">
              <button onClick={downloadReceipt}>Download PDF</button>
              <button onClick={goHome}>Go Home</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBookingForm;
