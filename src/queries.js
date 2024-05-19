import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      username
      id
      accountType
      profilePicture
    }
  }
`

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!, $accountType: String!) {
    createUser(username: $username, password: $password, accountType: $accountType) {
      username
    }
  }
`

export const GET_USER_DATA = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      username
      accountType
      name
      email
      cohort
      pronouns
      profilePicture
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation UploadProfilePicture($file: Upload!, $userID: String!) {
    uploadProfilePicture(file: $file, userID: $userID)
  }
`