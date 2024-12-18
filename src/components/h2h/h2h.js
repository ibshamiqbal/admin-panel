import React, { useState, useEffect } from "react";
import './h2h.css';
import link from '../../assets/link.png';
import key from '../../assets/key.png';
import refree from '../../assets/refree.png';

const H2h = () => {
  const [url, setUrl] = useState(""); // State for the API URL
  const [rapidApiHost, setRapidApiHost] = useState(""); // State for the RapidAPI host
  const [rapidApiKey, setRapidApiKey] = useState(""); // State for the RapidAPI key

  // Fetch head-to-head data when the component mounts
  useEffect(() => {
    const fetchH2hData = async () => {
      const h2h = "team1_team2"; // Replace with your desired teams
      const rapidapiurl = `https://api-basketball.p.rapidapi.com/games?h2h=${h2h}`;
      const headers = {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY, // Use environment variable for security
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST
      };

      // Set the API URL and headers to state variables
      setUrl(rapidapiurl);
      setRapidApiHost(headers['x-rapidapi-host']);
      setRapidApiKey(headers['x-rapidapi-key']); // This might be sensitive, consider security

      // Fetch the data
      try {
        const response = await fetch(rapidapiurl, { headers });
        const data = await response.json();
        console.log("Fetched Head-to-Head Data:", data); // Log fetched data to the console
      } catch (error) {
        console.error("Error fetching head-to-head data:", error);
      }
    };

    fetchH2hData();
  }, []);

  return (
    <div className="container-h2h">
      <div className="header">
        <div className="text">Head To Head</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={link} alt="" />
          <input
            type="text"
            value={url}
            placeholder="url https"
            readOnly // Set input as read-only if you don't want to allow editing
          />
        </div>

        <div className="input">
          <img src={key} alt="" />
          <input
            type="text"
            value={rapidApiHost}
            placeholder="x-rapidapi-host"
            readOnly // Set input as read-only
          />
        </div>

        <div className="input">
          <img src={refree} alt="" />
          <input
            type="text"
            value={rapidApiKey}
            placeholder="x-rapidapi-key"
            readOnly // Set input as read-only
          />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit">Submit</div>
      </div>
    </div>
  );
};

export default H2h;
