import { gql } from '@apollo/client';

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

export const EDIT_USER_INFO = gql`
  mutation editUserInfo($userID: String!, $name: String, $email: String, $cohort: String, $pronouns: String) {
    editUserInfo(userID: $userID, name: $name, email: $email, cohort: $cohort, pronouns: $pronouns) {
      name
      email
      cohort
      pronouns
    }
  }
`

export const UPLOAD_PROFILE_PICTURE = gql`
mutation UploadProfilePicture($file: Upload!, $userID: String!) {
  uploadProfilePicture(file: $file, userID: $userID)
}
`

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