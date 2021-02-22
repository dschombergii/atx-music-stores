import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../App.css'

import { AuthProvider } from '../contexts/AuthContext'
import { ListingsProvider } from '../contexts/ListingsContext'

import Router from '../Router'
import Navigation from './app/Navigation'

function App() {

  return (
    <ListingsProvider>
      < AuthProvider >
        <BrowserRouter>
          <Navigation />
          <Router />
        </BrowserRouter >
      </AuthProvider >
    </ListingsProvider>

  )
}

export default App;
