import React, { useState , useEffect } from 'react';
import './liveteam.css' // Add any custom styles here


const Liveteam = () => {
    const [teams, setTeams] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTeam, setNewTeam] = useState({
        name: '',
        league: 'Racing',
        logo: null
    });

    // Handle opening and closing of the modal
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setNewTeam({ name: '', league: 'Racing', logo: null });
    };

    // Handle input change for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file upload for the team logo
    const handleFileChange = (e) => {
        setNewTeam(prevState => ({
            ...prevState,
            logo: e.target.files[0]
        }));
    };

    // Handle form submission to add a new team
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare team entry
        const newTeamEntry = {
            ...newTeam,
            logo: newTeam.logo ? URL.createObjectURL(newTeam.logo) : null
        };
    
        try {
            // Make API call
            const response = await fetch('https://basketball-backend-dun.vercel.app/liveTeam/create-team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTeam)
            });
    
            // Parse the JSON response
            const responseData = await response.json();
    
            if (response.ok) {
                console.log('Team created successfully:', responseData);
    
                // Add the new team to the state
                setTeams([...teams, responseData]);
            } else {
                console.error('Error creating team:', responseData.message);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    
        // Close the modal
        handleCloseModal();
    };

    const handleGetTeams = async() =>{
        try {
            // Make API call
            const response = await fetch('https://basketball-backend-dun.vercel.app/liveTeam/get-team', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Parse the JSON response
            const responseData = await response.json();
    
            if (response.ok) {
                console.log('Team created successfully:', responseData);
    
                // Add the new team to the state
                setTeams(responseData);
            } else {
                console.error('Error creating team:', responseData.message);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    
    }
    useEffect(() => {
        handleGetTeams();
    }, []); 

    const handleDeleteTeam = async (id) => {
        try {
            console.log(`Deleting team with ID: ${id}`);
    
            const response = await fetch(`https://basketball-backend-dun.vercel.app/liveTeam/team/delete-team/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                // Remove the deleted team from the state
                setTeams((prevTeams) => prevTeams.filter((team) => team._id !== id));
                console.log('Team deleted successfully:', responseData);
            } else {
                console.error('Failed to delete team:', responseData.message);
            }
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };
    


    

    

    // Render the Teams table and modal form
    return (
        <div className="teams-container">
            <h2>Teams</h2>
            <button onClick={handleOpenModal} className="btn btn-primary">+ New Team</button>

            <table className="teams-table">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>League</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={index}>
                            <td>
                                {team.logo ? (
                                    <img src={team.logo} alt={`${team.name} logo`} className="team-logo" />
                                ) : (
                                    <span>No Logo</span>
                                )}
                            </td>
                            <td>{team?.name}</td>
                            <td>{team?.league}</td>

                            <button
    className="btn btn-danger"
    onClick={() => handleDeleteTeam(team._id)}
>
    <i className="fas fa-trash"></i>
</button>


                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Team</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Team Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newTeam.name}
                                onChange={handleInputChange}
                                placeholder="Enter Team Name"
                                required
                            />
                            
                            <label>League</label>
                            <select
                                name="league"
                                value={newTeam.league}
                                onChange={handleInputChange}
                            >
                                <option value="Racing">Racing</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Football">Football</option>
                                {/* Add more options as needed */}
                            </select>

                            <label>Team Logo</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />

                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseModal} className="btn">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Liveteam;
