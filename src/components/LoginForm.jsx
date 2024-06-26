import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGNUP, GET_USER_DATA } from "../queries";
import { useApolloClient, gql } from "@apollo/client";

const LoginForm = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getSignup, setGetSignup] = useState(false);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("error", error);
    },
  });

  const [signup, signUpResult] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log("error", error);
      console.log(error.graphQLErrors[0].message);
    },
  });

  const client = useApolloClient();

  const getUserInfo = async (id) => {
    try {
      const { data } = await client.query({
        query: GET_USER_DATA,
        variables: { id },
      });
      setUser({
        username: data.getUser.username,
        id,
        accountType: data.getUser.accountType,
        profilePicture: data.getUser.profilePicture,
        name: data.getUser.name,
        email: data.getUser.email,
        pronouns: data.getUser.pronouns,
        cohort: data.getUser.cohort,
        submissions: data.getUser.submissions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Reffresh
  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      setToken(token);
      const id = localStorage.getItem("user-id");

      getUserInfo(id);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  //Login
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", result.data.login.id);
      localStorage.setItem("user-username", result.data.login.username);

      setUser({
        username: result.data.login.username,
        id: result.data.login.id,
        accountType: result.data.login.accountType,
        profilePicture: result.data.login.profilePicture,
        name: result.data.login.name,
        email: result.data.login.email,
        cohort: result.data.login.cohort,
        pronouns: result.data.login.pronouns,
      });
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  const signUpSubmit = async (event) => {
    event.preventDefault();
    signup({ variables: { username, password } });
    setGetSignup(false);
  };
  return (
    <div>
      {!getSignup ? (
        <div className="signup-form">
          <h2>Log In</h2>
          <form onSubmit={submit}>
            <div>
              Username:{" "}
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password:{" "}
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className="tasks-button" type="submit">
              login
            </button>
          </form>
          <button className="tasks-button" onClick={() => setGetSignup(true)}>
            Sign Up
          </button>
        </div>
      ) : (
        <div>
          <div className="login-form">
            <h2>Sign Up</h2>
            <form onSubmit={signUpSubmit}>
              <div>
                username{" "}
                <input
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password{" "}
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button className="tasks-button" type="submit">
                signup
              </button>
            </form>
            <button
              className="tasks-button"
              onClick={() => setGetSignup(false)}
            >
              login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
