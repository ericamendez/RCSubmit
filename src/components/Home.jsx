import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faHouse, faBookOpen, faCircleUser} from "@fortawesome/free-solid-svg-icons"
import '../styles/home.css'
import AdminView from './AdminView'
import StudentView from './StudentView'
import logo from '../assets/logo.png'
import {Routes, Route, Link} from 'react-router-dom'
import SubmissionView from './SubmissionView'
import { useState } from 'react'

function Home () {
  const [user, setUser] = useState('student')
  const [selectedView, setSelectedView] = useState('home')

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
                <FontAwesomeIcon className="navIcons" icon={faPen} />
              </div>
            </Link>
            <Link to="/misc">
              <div onClick={() => getSelectedView('misc')} className={selectedView === 'misc' ? 'selected' : null}>
                <FontAwesomeIcon className="navIcons" icon={faPen} />
              </div>
            </Link>
        </div>
        <main className='main'>
          <header>
            <div className="logo"><img src={logo} alt="logo" /></div>
            <div className='welcome'>Welcome Erica!</div>
            <div className='user'><FontAwesomeIcon className="userIcon" icon={faCircleUser} /></div>
          </header>
          {/* either show student home or admin home */}
          {/* student or admin */}
          <Routes>
              <Route path="/" element={user === 'admin' ? <AdminView /> : <StudentView />} />
              <Route path="/submissionView" element={<SubmissionView />} />
          </Routes>

        </main>
    </div>
  );
}

export default Home;