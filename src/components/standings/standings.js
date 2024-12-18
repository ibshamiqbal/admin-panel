import React, { useState, useEffect } from "react";
import './standings.css';
import link from '../../assets/link.png';
import key from '../../assets/key.png';
import refree from '../../assets/refree.png';

const Standings = () => {
  const [url, setUrl] = useState(""); // State for the API URL
  const [rapidApiHost, setRapidApiHost] = useState(""); // State for the RapidAPI host
  const [rapidApiKey, setRapidApiKey] = useState(""); // State for the RapidAPI key

  // Fetch standings data when the component mounts
  useEffect(() => {
    const fetchStandingsData = async () => {
      const league = "YOUR_LEAGUE"; // Replace with your desired league
      const season = "YOUR_SEASON"; // Replace with your desired season

      const rapidapiurl = `https://api-basketball.p.rapidapi.com/standings?league=${league}&season=${season}`;
      const headers = {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY, // Use REACT_APP_ prefix for env variables
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST
      };

      try {
        const response = await fetch(rapidapiurl, { headers });
        const data = await response.json();
        console.log("Fetched Standings Data:", data); // Log fetched data to the console

        // Assuming you want to set these values from the fetched data
        setUrl(rapidapiurl);
        setRapidApiHost(headers['x-rapidapi-host']);
        setRapidApiKey(headers['x-rapidapi-key']); // This might be sensitive, consider security
      } catch (error) {
        console.error("Error fetching standings data:", error);
      }
    };

    fetchStandingsData();
  }, []);

  return (
    <div className="container-h2h">
      <div className="header">
        <div className="text">Standings</div>
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

export default Standings;
