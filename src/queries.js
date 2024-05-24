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

export const ADD_ASSIGNMENT = gql`
  mutation Mutation($description: String!, $show: Boolean!, $week: Int!, $link: String, $assignmentType: String) {
    addAssignment(description: $description, show: $show, week: $week, link: $link, assignmentType: $assignmentType) {
      id
      description
      link
      week
      show
      assignmentType
    }
  }
`

export const DELETE_ASSIGNMENT = gql`
  mutation DeleteAssignment($id: ID!) {
    deleteAssignment(id: $id)
  }
`

export const UPLOAD_PROFILE_PICTURE = gql`
mutation UploadProfilePicture($file: Upload!, $userID: String!) {
  uploadProfilePicture(file: $file, userID: $userID)
}
`

export const ALL_WEEKS = gql`
    query {
      getAllWeeks {
            week
            assignments
            current
            dueDate
        }
    }
`
export const GET_WEEKS_ASSIGNMENTS = gql`
    query getWeeksAssignments($week: Int!) {
      getWeeksAssignments(week: $week) {
                id
                description
                link
                show
        }
    }
`

export const ADD_COHORT = gql`
  mutation addCohort($name: String!, $startDate: String!, $endDate: String!) {
    addCohort(name: $name, startDate: $startDate, endDate: $endDate) {
      name
    }
  }

`

export const ALL_COHORTS = gql`
    query {
      getAllCohorts {
            name
            startDate
            endDate
            isCurrentCohort
            currentWeek
            students {
                id
            }
        }
    }
`

export const CURRENT_COHORT = gql`
  query {
    getAllCohorts {
          name
          startDate
          endDate
          isCurrentCohort
          currentWeek
          students {
              id
          }
      }
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

export const CURRENT_ASSIGNMENTS_SHOWN = gql`
  query {
    getCurrentAssignmentsShown{
      id
      description
      link
      show
    }
  }
`

export const EDIT_ASSIGNMENT = gql`
  mutation editAssignment($id: ID!, $description: String, $link: String, $show: Boolean, $assignmentType: String) {
    editAssignment(id: $id, description: $description, link: $link, show: $show, assignmentType: $assignmentType) {
      id
      description
      link
      week
      show
      assignmentType
    }
  }
`