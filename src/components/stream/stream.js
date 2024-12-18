import React, { useState, useEffect } from "react";
import './stream.css';
import link from '../../assets/link.png';
import key from '../../assets/key.png';
import refree from '../../assets/refree.png';

const Stream = () => {
  const [streamData, setStreamData] = useState({
    link: "",
    origin: "",
    referer: "",
    useragent: ""
  });

  // Fetch stream data when the component loads
  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        const response = await fetch("https://basketball-backend-dun.vercel.app/stream/fetchstream");
        const data = await response.json();
        console.log("Fetched Stream Data:", data[0]);  // Console log the fetched data
        setStreamData(data[0]); // Populate the input fields with fetched data
      } catch (error) {
        console.error("Error fetching stream data:", error);
      }
    };

    fetchStreamData();
  }, []);

  // Handle input change to update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStreamData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission to post stream data
  const handleSubmit = async () => {
    try {
      console.log("Stream Data before submission:", streamData);  // Log data before submitting
      const response = await fetch("https://basketball-backend-dun.vercel.app/stream/poststream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(streamData)
      });

      if (response.ok) {
        alert("Stream data submitted successfully!");
      } else {
        alert("Failed to submit stream data.");
      }
    } catch (error) {
      console.error("Error submitting stream data:", error);
    }
  };

  return (
    <div className="container-stream">
      <div className="header">
        <div className="text">Stream</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={link} alt="" />
          <input
            type="text"
            name="link"
            value={streamData.link}
            onChange={handleInputChange}
            placeholder="Stream link"
          />
        </div>

        <div className="input">
          <img src={key} alt="" />
          <input
            type="text"
            name="origin"
            value={streamData.origin}
            onChange={handleInputChange}
            placeholder="Stream key"
          />
        </div>

        <div className="input">
          <img src={refree} alt="" />
          <input
            type="text"
            name="referer"
            value={streamData.referer}
            onChange={handleInputChange}
            placeholder="Stream referer"
          />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>Submit</div>
      </div>

      
    </div>
  );
};

export default Stream;
