import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {

  const [token, setToken] = useState(null)
  const client = useApolloClient()


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken} setError={"notify"} />
      </>
    )
  }

  return (
    <Router>
      <Home logout={logout} />
    </Router>
  )
}

export default App
