import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { UPLOAD_PROFILE_PICTURE } from '../queries';
import '../styles/editProfile.css'

const EditProfile = ({user, profilePicture}) => {
    const [file, setFile] = useState(null);
    const [isEdit, setIsEdit] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [pronouns, setPronouns] = useState(null)
    const [cohort, setCohort] = useState(null)

    const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE, {
        onError: (error) => {
          console.log('error', error)
        }
    });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      await uploadProfilePicture({ variables: { file, userID: user.id } });
      console.log('uploaded');
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const handleSubmitEdit = () => {

  }

  return (
    <div className=''>
        <h1>Edit Profile</h1>
        <div className='editContainer'>
            <section className='editInfo'>

                {/* show this or show edit form */}
                <ul>
                    <li>
                        <label>Username: {user.username}</label>
                    </li>
                    <li>
                        <label>Account Type: {user.accountType}</label>
                    </li>
                        <div className='right'>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEdit(!isEdit) } />
                        </div>
                    <form action="">
                        <li>
                            <div>
                                <label>
                                    Name: {isEdit ? 
                                    <input type="text" value={user.name} onChange={({ target }) => setName(target.value)} /> 
                                    : user.name}
                                </label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>
                                    Email: {isEdit ? 
                                    <input type="text" value={user.email} onChange={({ target }) => setEmail(target.value)} /> 
                                    : user.email}
                                </label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>
                                    Cohort: {isEdit ? 
                                    <input type="text" value={user.cohort} onChange={({ target }) => setCohort(target.value)} /> 
                                    : user.cohort}
                                </label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>
                                    Pronouns: {isEdit ? 
                                    <input type="text" value={user.pronouns} onChange={({ target }) => setPronouns(target.value)} /> 
                                    : user.pronouns}
                                </label>
                            </div>
                        </li>
                        <div className='right'>
                            {isEdit? <button className='tasks-button' type='submit'>Submit</button> : null}
                        </div>
                    </form>
                </ul>
            </section>
            <section className='picture'>
                <img src={profilePicture} alt="" />
                <section className='upload'>
                    <p>Upload/replace Profile Picture</p>
                    <input id="file-upload" type="file" onChange={handleFileChange} />
                    <button onClick={handleSubmit}>Upload</button>
                </section>
            </section>
        </div>
    </div>
  );
}

export default EditProfile