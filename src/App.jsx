import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import "./App.css";
``
function App({ pictureURL}) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const client = useApolloClient();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken} setError={"notify"} setUser={setUser} />
      </>
    );
  }

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {user ? (
          <Home logout={logout} user={user} pictureURL={pictureURL} />
        ) : (
          <LoginForm
            setToken={setToken}
            setError={"notify"}
            setUser={setUser}
            setId={setId}
          />
        )}
      </QueryClientProvider>
    </Router>
  );
}

export default App;
