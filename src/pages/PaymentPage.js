import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/CartActions'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Typography, Button, Card, CardContent, RadioGroup, Radio, FormControlLabel } from '@mui/material'
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

function PaymentPage() {
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('C.O.D')
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const navigate = useNavigate()

    const SavePaymentMethod = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/order/add')
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
                        Payment
                    </Typography>

                    <form onSubmit={SavePaymentMethod}>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name='controlled-radio-buttons-group'
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <FormControlLabel value='C.O.D' control={<Radio />} label='Cash on delivery' />
                        </RadioGroup>

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

export default PaymentPage
