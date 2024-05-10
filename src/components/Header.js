import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/UserActions'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import styled from '@emotion/styled'

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#FFFFFF'
})

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const Logout = () => {
        dispatch(logout())
    }

    return (
        <div>
            <AppBar elevation={0} sx={{ background: '#17202A' }}>
                <Toolbar>
                    <SLink to='/'>
                        <Typography variant='h6'>
                            GG-Online Mobile Store
                        </Typography>
                    </SLink>

                    {userInfo ?
                        <Toolbar sx={{ ml: 'auto' }}>
                            <SLink to='/cart/:id/:qty'>
                                <Typography variant='body1' sx={{ p: 2 }}>
                                    Cart
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <ShoppingCartIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>

                            <SLink to='/user/profile'>
                                <Typography variant='body1' sx={{ p: 2 }}>
                                    My Account
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>

                            <SLink onClick={Logout}>
                                <Typography variant='body1' sx={{ p: 2 }}>
                                    Logout
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>
                        </Toolbar> :
                        <Toolbar sx={{ ml: 'auto' }}>
                            <SLink to='/user/login'>
                                <Typography variant='body1' sx={{ p: 2 }}>
                                    Log in
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <LoginIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>

                            <SLink to='/user/register'>
                                <Typography variant='body1'>
                                    Sign up
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>
                        </Toolbar>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
