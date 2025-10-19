import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Home} from "./components/home.jsx"
import SignIn from './components/login.jsx'

function App() {

  return (
    <>
      <Home/>
      <SignIn/>
    </>
  )
}

export default App
