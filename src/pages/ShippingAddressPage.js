import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../redux/actions/CartActions'
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

function ShippingAddressPage() {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [pincode, setPincode] = useState('')
    const [mobilenumber, setMobilenumber] = useState('')
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault()
        if (!address && !city && !district && !state && !country && !pincode && !mobilenumber) {
            setMessage('Fill all fields!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            dispatch(saveShippingAddress({ address, city, district, state, country, pincode, mobilenumber }))
            navigate('/cart/payment')
            setAddress('')
            setCity('')
            setDistrict('')
            setState('')
            setCountry('')
            setPincode('')
            setMobilenumber('')
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    return (
        <div>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <SCard elevation={3}>
                <CardContent>
                    <Typography variant='h5' sx={{ color: '#21618C', fontFamily: 'Oswald', m: 2 }}>
                        Shipping Address
                    </Typography>

                    {message && <Typography variant='caption' sx={{ color: '#FF0000' }}>{message}</Typography>}

                    <form onSubmit={Submit}>
                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Address'
                            type='text'
                            size='small'
                            value={address}
                            sx={{ mb: 2 }}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='City'
                            type='text'
                            size='small'
                            value={city}
                            sx={{ mb: 2 }}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='District'
                            type='text'
                            size='small'
                            value={district}
                            sx={{ mb: 2 }}
                            onChange={(e) => setDistrict(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='State'
                            type='text'
                            size='small'
                            value={state}
                            sx={{ mb: 2 }}
                            onChange={(e) => setState(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Country'
                            type='text'
                            size='small'
                            value={country}
                            sx={{ mb: 2 }}
                            onChange={(e) => setCountry(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Pin Code'
                            type='number'
                            size='small'
                            value={pincode}
                            sx={{ mb: 2 }}
                            onChange={(e) => setPincode(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Mobile No.'
                            type='number'
                            size='small'
                            value={mobilenumber}
                            sx={{ mb: 2 }}
                            onChange={(e) => setMobilenumber(e.target.value)}
                        />

                        <SButton type='submit'>
                            <Typography variant='body1'>
                                Continue
                            </Typography>
                        </SButton>
                    </form>
                </CardContent>
            </SCard>
        </div>
    )
}

export default ShippingAddressPage
