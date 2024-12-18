import React, { useState, useEffect } from "react";
import './games.css';
import link from '../../assets/link.png';
import key from '../../assets/key.png';
import refree from '../../assets/refree.png';

const Games = () => {
  const [url, setUrl] = useState(""); // State for the API URL
  const [rapidApiHost, setRapidApiHost] = useState(""); // State for the RapidAPI host
  const [rapidApiKey, setRapidApiKey] = useState(""); // State for the RapidAPI key

  // Fetch games data when the component mounts
  useEffect(() => {
    const fetchGamesData = async () => {
      const league = 12; // Your desired league ID
      const season = "2021-2022"; // Your desired season
      const rapidapiurl = `https://api-basketball.p.rapidapi.com/games?season=${season}&league=${league}`;
      const headers = {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY, // Use environment variable for security
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST
      };

      try {
        const response = await fetch(rapidapiurl, { headers });
        const data = await response.json();
        console.log("Fetched Games Data:", data); // Log fetched data to the console

        // Set the URL and headers to state variables
        setUrl(rapidapiurl);
        setRapidApiHost(headers['x-rapidapi-host']);
        setRapidApiKey(headers['x-rapidapi-key']); // This might be sensitive, consider security
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    fetchGamesData();
  }, []);

  return (
    <div className="container-games">
      <div className="header">
        <div className="text">Games</div>
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

export default Games;
