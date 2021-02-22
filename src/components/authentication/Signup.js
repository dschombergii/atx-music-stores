import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import {
    Card,
    TextField,
    Button,
    Container
} from '@material-ui/core'

export default function Signup() {

    const { signup, updateProfile, credentials, handleCredentials } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(credentials.email, credentials.password)

        if (credentials.password !==
            credentials.passwordConfirm) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(credentials.email, credentials.password, credentials.username)
                .then(() => updateProfile(credentials.username))
            history.push('/user')
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
    }

    return (
        <div className="App">
            <Container maxWidth="sm" style={{ paddingTop: '5rem' }}>
                <h2>Sign Up</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <form className="credentials-form" onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="username"
                        name="username"
                        onChange={handleCredentials}
                        label="Username"
                        type="text" />
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
                    <TextField
                        required
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={handleCredentials}
                        label="Confirm Password"
                        type="password" />
                    <Button
                        type="submit"
                        className="login-button"
                        variant="contained"
                        disabled={loading}>Sign Up</Button>
                </form>
                <div style={{ textAlign: "center" }}>
                    Already have an account? <Link to='/login' style={{ textDecoration: "underline" }}>Log In</Link>
                </div>
            </Container>
        </div>
    )
}