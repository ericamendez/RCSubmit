import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faHouse,
  faBookOpen,
  faCommentDots,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/home.css";
import AdminView from "./admin/AdminView";
import StudentView from "./student/StudentView";
import SubmissionView from "./admin/SubmissionView";
import ResourcesView from "./ResourcesView";
import SubmitView from "./SubmitView";
import EditProfile from "./EditProfile";
import Header from "./Header";

function Home({ user, logout, pictureURL }) {
  const [selectedView, setSelectedView] = useState("home");

  const profilePicture = `${pictureURL}${user.profilePicture}`;

  const getSelectedView = (path) => {
    setSelectedView(path);
  };

  return (
    <div>
      <div className="nav">
        <Link to="/">
          <div
            onClick={() => getSelectedView("home")}
            className={selectedView === "home" ? "selected" : null}
          >
            <FontAwesomeIcon className="navIcons" icon={faHouse} />
          </div>
        </Link>
        <Link to="/submit">
          <div
            onClick={() => getSelectedView("submit")}
            className={selectedView === "submit" ? "selected" : null}
          >
            <FontAwesomeIcon className="navIcons" icon={faPen} />
          </div>
        </Link>
        <Link to="/submissionView">
          <div
            onClick={() => getSelectedView("submissionView")}
            className={selectedView === "submissionView" ? "selected" : null}
          >
            <FontAwesomeIcon className="navIcons" icon={faBookOpen} />
          </div>
        </Link>
        <Link to="/resources">
          <div
            onClick={() => getSelectedView("resources")}
            className={selectedView === "resources" ? "selected" : null}
          >
            <FontAwesomeIcon className="navIcons" icon={faHeart} />
          </div>
        </Link>
        <Link to="/misc">
          <div
            onClick={() => getSelectedView("misc")}
            className={selectedView === "misc" ? "selected" : null}
          >
            <FontAwesomeIcon className="navIcons" icon={faCommentDots} />
          </div>
        </Link>
      </div>
      <main className="main">
        <Header user={user} logout={logout} profilePicture={profilePicture} getSelectedView={getSelectedView} />
        <Routes>
          <Route
            path="/"
            element={
              user.accountType === "admin" || user.accountType === "owner" ? (
                <AdminView className="inner" />
              ) : (
                <StudentView user={user} className="inner" />
              )
            }
          />
          <Route path="/submit" element={<SubmitView />} />
          <Route
            path="/submissionView"
            element={
              user.accountType === "admin" || user.accountType === "owner" ? (
                <SubmissionView />
              ) : null
            }
          />
          <Route path="/resources" element={<ResourcesView />} />
          <Route
            path="/profile"
            element={
              <EditProfile user={user} profilePicture={profilePicture} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
