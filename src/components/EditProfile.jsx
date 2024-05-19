import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPLOAD_PROFILE_PICTURE } from '../queries';

const EditProfile = ({id}) => {
    const [file, setFile] = useState(null);
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
      await uploadProfilePicture({ variables: { file, userID: id } });
      console.log('uploaded');
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default EditProfile