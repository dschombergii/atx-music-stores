import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';

import { useAuth } from '../../contexts/AuthContext'
import { theme } from './theme'

function Navigation() {

    const [error, setError] = useState('')
    const { currentUser, logout, credentials } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to logout')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: "1", color: "white" }}>
                        <Link to="/">Austin Music Stores</Link>
                    </Typography>
                    {currentUser === null ?
                        <ul className="nav-list">
                            <li className="nav-list-item">
                                <Link to="/businesses">Listings</Link>
                            </li>
                            <li className="nav-list-item">
                                <Link to="/login">Login</Link>
                            </li>
                        </ul> :
                        <ul className="nav-list">
                            <li className="nav-list-item">
                                <Link to="/businesses">Listings</Link>
                            </li>
                            <li className="nav-list-item">
                                <Link to="/add-business">Add</Link>
                            </li>
                            <li className="nav-list-item">
                                <Link to="/login" onClick={handleLogout}>Log Out</Link>
                            </li>
                        </ul>}
                </Toolbar>
            </AppBar>
            {currentUser !== null ?
                <div className="logged-as-bar">
                    Logged in as: {currentUser.displayName}</div> :
                <></>}
        </ThemeProvider>
    )
}

export default Navigation