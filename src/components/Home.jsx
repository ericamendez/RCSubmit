import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faPen, 
  faHouse, 
  faBookOpen, 
  faCircleUser, 
  faCommentDots,
  faHeart} from "@fortawesome/free-solid-svg-icons"
import '../styles/home.css'
import AdminView from './AdminView'
import StudentView from './StudentView'
import SubmissionView from './SubmissionView'
import ResourcesView from './ResourcesView'
import logo from '../assets/logo.png'
import SubmitView from './SubmitView'
import EditProfile from './EditProfile'

function Home ({user, logout}) {
  const [selectedView, setSelectedView] = useState('home')
  const [isHover, setIsHover] = useState(false)

  const getSelectedView = (path) => {
    setSelectedView(path)
  }  

  return (
    <div>
        <div className="nav">
            <Link to="/">
              <div onClick={() => getSelectedView('home')} className={selectedView === 'home' ? 'selected' : null} >
                <FontAwesomeIcon className="navIcons" icon={faHouse} />
              </div>
            </Link>
            <Link to="/submit">
              <div onClick={() => getSelectedView('submit')} className={selectedView === 'submit' ? 'selected' : null}>
                <FontAwesomeIcon className="navIcons" icon={faPen} />
              </div>
            </Link>
            <Link to="/submissionView">
              <div onClick={() => getSelectedView('submissionView')} className={selectedView === 'submissionView' ? 'selected' : null}>
                <FontAwesomeIcon className="navIcons" icon={faBookOpen} />
              </div>
            </Link>
            <Link to="/resources">
              <div onClick={() => getSelectedView('resources')} className={selectedView === 'resources' ? 'selected' : null}>
                <FontAwesomeIcon className="navIcons" icon={faHeart} />
              </div>
            </Link>
            <Link to="/misc">
              <div onClick={() => getSelectedView('misc')} className={selectedView === 'misc' ? 'selected' : null}>
                <FontAwesomeIcon className="navIcons" icon={faCommentDots} />
              </div>
            </Link>
        </div>
        <main className='main'>
          <header>
            <div className="logo"><img src={logo} alt="logo" /></div>
            <div className='welcome'>Welcome {user.username}!</div>
            <div className='user' onMouseEnter={() => setIsHover(true)} 
                onMouseLeave={() => setIsHover(false)} >
              {user.picture ? 
                <img src={`http://localhost:4001/uploads/${user.picture}`} />
                : <FontAwesomeIcon className="userIcon" icon={faCircleUser} />
              }
              <ul onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={isHover ? 'profile outer':'profile outer hidden'}>
                <li>
                  <Link to="/profile">
                    <a href="#">Edit Profile</a>
                  </Link>
                </li>
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </div>
          </header>
          {/* either show student home or admin home */}
          {/* student or admin */}
          <Routes>
              <Route path="/" element={user.accountType === 'admin' || user.accountType === 'owner' ? <AdminView className="inner" /> : <StudentView className="inner" />} />
              <Route path="/submit" element={<SubmitView />} />
              <Route path="/submissionView" element={user.accountType === 'admin' || user.accountType === 'owner' ? <SubmissionView />: null} />
              <Route path="/resources" element={<ResourcesView />} />
              <Route path="/profile" element={<EditProfile id={user.id} />} />
          </Routes>

        </main>
    </div>
  );
}

export default Home;