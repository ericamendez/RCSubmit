import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faHouse} from "@fortawesome/free-solid-svg-icons"
import '../styles/home.css'

function StudentHome () {
  return (
    <div>
        <div className="nav">
            <div><FontAwesomeIcon className="navIcons" icon={faHouse} /></div>
            <div><FontAwesomeIcon className="navIcons" icon={faPen} /></div>
            <div><FontAwesomeIcon className="navIcons" icon={faPen} /></div>
            <div><FontAwesomeIcon className="navIcons" icon={faPen} /></div>
            <div><FontAwesomeIcon className="navIcons" icon={faPen} /></div>
        </div>
        <main className='main'>

        </main>
    </div>
  );
}

export default StudentHome;