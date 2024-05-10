import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/UserActions'
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

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    const Login = (e) => {
        e.preventDefault()
        if (!email || !password) {
            setMessage('Enter correct details!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            dispatch(login(email, password))
        }
    }

    return (
        <div>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <SCard elevation={3}>
                <CardContent>
                    <Typography variant='h5' sx={{ color: '#21618C', fontFamily: 'Oswald', m: 2 }}>
                        LOG IN
                    </Typography>

                    {loading && <Typography variant='caption'>Loading...</Typography>}
                    {error && <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography>}
                    {message && <Typography variant='caption' sx={{ color: '#FF0000' }}>{message}</Typography>}

                    <form onSubmit={Login}>
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
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <SButton type='submit'>
                            <Typography variant='body1'>
                                Log in
                            </Typography>
                        </SButton>
                    </form>

                    <Typography variant='body1' sx={{ color: '#21618C', fontFamily: 'Oswald', m: 2 }}>
                        New Customer?&nbsp;
                        <SLink to='/user/register'>
                            Register
                        </SLink>
                    </Typography>
                </CardContent>
            </SCard>
        </div>
    )
}

export default LoginPage
