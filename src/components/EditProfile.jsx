import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { UPLOAD_PROFILE_PICTURE, EDIT_USER_INFO, GET_USER_DATA } from '../queries';
import '../styles/editProfile.css'

const EditProfile = ({user, profilePicture}) => {
    const [file, setFile] = useState(null);
    const [isEdit, setIsEdit] = useState(null)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [pronouns, setPronouns] = useState(user.pronouns)
    const [cohort, setCohort] = useState(user.cohort)

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

  const [editInfo] = useMutation(EDIT_USER_INFO, {
    onCompleted: () => {
      console.log('User Updated')
    },
    refetchQueries: [{ query: GET_USER_DATA }],
    onError: (error) => {
      console.log(error)
    }
  });

  const handleSubmitEdit = async () => {
    await editInfo({variables: { userID:user.id, name, email, cohort, pronouns }})
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
                    <form onSubmit={handleSubmitEdit}>
                        <li>
                            <div>
                                <label>
                                    Name: {isEdit ? 
                                    <input type="text" value={name} onChange={({ target }) => setName(target.value)} /> 
                                    : user.name}
                                </label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>
                                    Email: {isEdit ? 
                                    <input type="text" value={email} onChange={({ target }) => setEmail(target.value)} /> 
                                    : user.email}
                                </label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>
                                    Cohort: {isEdit ? 
                                    <input type="text" value={cohort} onChange={({ target }) => setCohort(target.value)} /> 
                                    : user.cohort}
                                </label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>
                                    Pronouns: {isEdit ? 
                                    <input type="text" value={pronouns} onChange={({ target }) => setPronouns(target.value)} /> 
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