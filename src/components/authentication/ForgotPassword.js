import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import {
    Card,
    TextField,
    Button,
    Container
} from '@material-ui/core'

export default function ForgotPassword() {

    const { resetPassword, credentials, handleCredentials } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(credentials.email)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }
    }

    return (
        <div className="App">
            <Container maxWidth="sm" style={{ paddingTop: '5rem' }}>
                <h2>Reset Password</h2>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <form className="credentials-form" onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        onChange={handleCredentials}
                        label="Email"
                        type="email" />
                    <Button
                        type="submit"
                        className="login-button"
                        variant="contained"
                        disabled={loading}>Reset Password</Button>
                </form>
                <div style={{ textAlign: "center" }}>
                    Need an account? <Link to='/signup' style={{ textDecoration: "underline" }}>Sign Up</Link>
                </div>
            </Container>
        </div>
    )
}