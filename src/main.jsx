import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uri = "http://localhost:4001/graphql";
// "https://rcsubmit.onrender.com/graphql"
//"http://localhost:4001/graphql";
const pictureURL = "http://localhost:4001/uploads/";
// "https://rcsubmit.onrender.com/uploads/";
//"http://localhost:4001/uploads/";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createUploadLink({
  uri: uri,
});
// https://tasksgpt.onrender.com/graphql
//'http://localhost:4001/graphql',

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App pictureURL={pictureURL} />
  </ApolloProvider>,
);
