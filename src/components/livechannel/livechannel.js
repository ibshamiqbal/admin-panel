import React, { useState, useEffect } from "react";

const LiveChannel = () => {
  const [channels, setChannels] = useState([]); // State for channel entries
  const [newChannel, setNewChannel] = useState({
    name: "",
    liveStream: "",
  });
  const [showForm, setShowForm] = useState(false); // State for toggling the form

  // Fetch existing channels from the backend
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch("https://basketball-backend-dun.vercel.app/liveChannel/get-LiveChannels");
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChannel({
      ...newChannel,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://basketball-backend-dun.vercel.app/liveChannel/create-LiveChannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newChannel.name,
          livestream: newChannel.liveStream, // Make sure it matches the backend schema field name
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create channel");
      }

      const savedChannel = await response.json();

      // Update state with the newly added channel
      setChannels([...channels, savedChannel]);
      setNewChannel({ name: "", liveStream: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

// Handle channel deletion
const handleDelete = async (id) => {
  try {
    const response = await fetch(`https://basketball-backend-dun.vercel.app/liveChannel/liveChannel/delete-LiveChannel/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete channel");
    }

    // Update the state to remove the deleted channel
    const updatedChannels = channels.filter((channel) => channel._id !== id);
    setChannels(updatedChannels);
  } catch (error) {
    console.error("Error deleting channel:", error);
    alert("Error deleting channel. Please try again.");
  }
};

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Channels</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + New Channel
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Live Stream</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {channels.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No Channels Added
              </td>
            </tr>
          ) : (
            channels.map((channel) => (
              <tr key={channel._id}>
                <td>{channel.name}</td>
                <td>
                  <a href={channel.livestream} target="_blank" rel="noopener noreferrer">
                    {channel.livestream}
                  </a>
                </td>
                <td>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(channel._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="btn btn-info">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add New Channel Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Add New Channel</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label>Channel Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newChannel.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Channel Live Stream</label>
                <input
                  type="text"
                  className="form-control"
                  name="liveStream"
                  value={newChannel.liveStream}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChannel;
