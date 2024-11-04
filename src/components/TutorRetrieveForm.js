import React, { useState } from 'react';
import './TutorRetrieveForm.css';

const TutorRetrieveForm = () => {
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const handleChangeField = (e) => {
    setField(e.target.value);
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    try {
      const response = await fetch(`http://localhost:5000/retrieve?field=${field}&value=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        setData(result); // Update state with retrieved data
      } else {
        alert('No data found or an error occurred');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Retrieve Tutor Form Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="field">Select Field:</label><br />
          <select id="field" value={field} onChange={handleChangeField} required>
            <option value="">--Select Field--</option>
            <option value="batchId">Batch ID</option>
            <option value="countryLocation">Country Location</option>
            <option value="tutorId">Tutor ID/Name</option>
            <option value="phone">Phone Number</option>
            <option value="startDate">Batch Start Date</option>
          </select><br />
        </div>
        <div className="form-group">
          <label htmlFor="value">Enter Value:</label><br />
          <input
            type="text"
            id="value"
            value={value}
            onChange={handleChangeValue}
            required
          /><br />
        </div>
        <button type="submit">Retrieve</button>
      </form>

      {data.length > 0 && (
        <div className="data-container">
          <h3>Retrieved Data</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Country Location</th>
                <th>Tutor ID</th>
                <th>Phone</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.batchid}</td>
                  <td>{row.countrylocation}</td>
                  <td>{row.tutorid}</td>
                  <td>{row.phone}</td>
                  <td>{row.startdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TutorRetrieveForm;
