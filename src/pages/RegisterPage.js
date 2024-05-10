import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/UserActions'
import { Toolbar, Typography, Button, Card, CardContent, TextField } from '@mui/material'
import styled from '@emotion/styled'

const SCard = styled(Card)({
    minWidth: '275px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
})

const SButton = styled(Button)({
    background: '#2E86C1',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '8px',
    marginBottom: '16px',
    padding: '12px',
    '&:hover': {
        background: '#2874A6',
        color: '#FFFFFF'
    }
})

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000'
})

function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
    const navigate = useNavigate()

    const Register = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch(register(email, password))
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/user/login')
        }
    }, [navigate, dispatch, userInfo])

    return (
        <div>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <SCard elevation={3}>
                <CardContent>
                    <Typography variant='h5' sx={{ color: '#21618C', fontFamily: 'Oswald', m: 2 }}>
                        SIGN UP
                    </Typography>

                    {loading && <Typography variant='caption'>Loading...</Typography>}
                    {error && <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography>}
                    <br />
                    {message && <Typography variant='caption' sx={{ color: '#FF0000' }}>{message}</Typography>}

                    <form onSubmit={Register}>
                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Email'
                            type='email'
                            size='small'
                            value={email}
                            sx={{ mb: 2 }}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Password'
                            type='password'
                            size='small'
                            value={password}
                            sx={{ mb: 2 }}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Confirm Password'
                            type='password'
                            size='small'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <SButton type='submit'>
                            <Typography variant='body1'>
                                Register
                            </Typography>
                        </SButton>
                    </form>

                    <Typography variant='body1' sx={{ color: '#21618C', fontFamily: 'Oswald', m: 2 }}>
                        Have an Account?&nbsp;
                        <SLink to='/user/login'>
                            Log in
                        </SLink>
                    </Typography>
                </CardContent>
            </SCard>
        </div >
    )
}

export default RegisterPage
