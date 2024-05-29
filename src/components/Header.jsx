import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({user, logout, profilePicture, getSelectedView}) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <header>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="welcome">
            Welcome {user.name ? user.name : user.username}!
          </div>
          <div
            className="user"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {user.profilePicture ? (
              <img src={profilePicture} />
            ) : (
              <FontAwesomeIcon className="userIcon" icon={faCircleUser} />
            )}
            <ul
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className={isHover ? "profile outer" : "profile outer hidden"}
            >
              <li>
                <Link to="/profile">
                  <span onClick={() => getSelectedView("editProfile")}>
                    Edit Profile
                  </span>
                </Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </header>
    )
}

export default Header;