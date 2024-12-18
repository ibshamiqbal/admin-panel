import "./Sidebar.css";
import basketball from "../../assets/basketball.svg";
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar">
                <div className="side__img">
                    <img src={basketball} alt="basketball" className="circle-image" />
                    <h1 className="h1">NBA Live Stream</h1>
                </div>
                <i className="fas fa-times" id="sidebarIcon" onClick={closeSidebar}></i>
            </div>

            <div className="sidebar__menu">
                <div className="sidebar__link active_menu_link">
                    <i className="fas fa-home"></i>
                    <Link to="/">Dashboard</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-gamepad"></i>
                    <Link to="/live-game">Live Game</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-users"></i>
                    <Link to="/live-team">Live Team</Link> 
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-tv"></i>
                    <Link to="/live-channels">Live Channels</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-basketball"></i>
                    <Link to="/games">Games</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-person"></i>
                    <Link to="/head-to-head">Head to Head</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-flag"></i>
                    <Link to="/standings">Standings</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-ad"></i>
                    <Link to="/admob">Ad Mob</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fas fa-bell"></i>
                    <Link to="/subscription">Subscription</Link>
                </div>

                <div className="sidebar__logout">
                    <i className="fas fa-power-off"></i>
                    <Link to="/logout">Logout</Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
