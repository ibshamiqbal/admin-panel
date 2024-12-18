import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import Stream from './components/stream/stream';
import Games from './components/games/games';
import H2h from './components/h2h/h2h';
import Standings from './components/standings/standings';
import Liveteam from './components/liveteam/liveteam';
import LiveGame from './components/livegame/livegame';
import LiveChannel from './components/livechannel/livechannel';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const { sidebarOpen, setsidebarOpen } = useState(false);

  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Navbar />
              <Main />
              <Sidebar />
            </div>
          }
        />

        <Route
          path="/stream"
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
                <Stream />
              </div>
              <Sidebar />
            </div>
          }
        />
        
        
        <Route
          path="/games"
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
                <Games />
              </div>
              <Sidebar />
            </div>
          }
        />

        <Route
          path="/head-to-head"
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
                <H2h />
              </div>
              <Sidebar />
            </div>
          }
        />

        <Route
          path="/standings"
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
                <Standings />
              </div>
              <Sidebar />
            </div>
          }
        />

        <Route
          path="/live-team" 
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
                <Liveteam />
              </div>
              <Sidebar />
            </div>
          }
        />

        <Route
          path="/live-game" 
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
              <LiveGame />
              </div>
              <Sidebar />
            </div>
          }
        />
        <Route
          path="/live-channels" 
          element={
            <div className="container">
              <Navbar />
              <div className="stream-main">
              <LiveChannel />
              </div>
              <Sidebar />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
