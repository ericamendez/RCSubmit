import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      username
      id
      accountType
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
  query GetUser($token: String!) {
    user(token: $token) {
      id
      username
      accountType
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation UploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file)
  }
`