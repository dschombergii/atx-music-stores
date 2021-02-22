import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Alert from '@material-ui/lab/Alert'
import {
    TextField,
    Button,
    Container
} from '@material-ui/core'

import { useAuth } from '../../contexts/AuthContext'

export default function Login() {

    const { login, credentials, handleCredentials } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(credentials.email, credentials.password)
            history.push('/')
        } catch {
            setError(`Failed to log in. ${<Link to="/signup">Sign Up</Link>}?`)
            setLoading(false)
        }
    }

    return (
        <div className="App">
            <Container maxWidth="sm" style={{ paddingTop: '5rem' }}>
                <h2>Log In</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <form className="credentials-form" onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        onChange={handleCredentials}
                        label="Email"
                        type="email" />
                    <TextField
                        required
                        id="password"
                        name="password"
                        onChange={handleCredentials}
                        label="Password"
                        type="password" />
                    <Button
                        type="submit"
                        className="login-button"
                        variant="contained"
                        disabled={loading}>Login</Button>
                </form>
                <div style={{ textAlign: "center" }}>
                    Need an account? <Link to='/signup' style={{ textDecoration: "underline" }}>Sign Up</Link>
                    <br />
                    <Link to='/forgot-password' style={{ textDecoration: "underline" }}>Forgot Password?</Link>
                </div>
            </Container>
        </div>
    )
}
