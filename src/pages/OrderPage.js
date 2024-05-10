import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../redux/actions/OrderActions'
import { Toolbar, Typography, Button, Card, Grid, Box, Divider } from '@mui/material'
import styled from '@emotion/styled'

const SCard = styled(Card)({
    marginLeft: 'auto',
    marginRight: 'auto'
})

const SBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    marginBottom: '16px'
})

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000'
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

function OrderPage() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { address, city, district, state, country, pincode, mobilenumber } = cart.shippingAddress
    const navigate = useNavigate()
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice
        }))
        setTimeout(() => {
            navigate('/user/profile')
        }, 1000)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    return (
        <div>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <Box sx={{ m: 2 }}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={6} xs={12} >
                        <SCard>
                            <Box textAlign='left' sx={{ p: 2, height: '300px' }}>
                                <Typography variant='h5'>
                                    Address & payment method
                                </Typography>

                                <Typography variant='body1'>
                                    <b>Address:</b> {address}, {city}, {district}, {state}, {country}, Pincode: {pincode}
                                </Typography>

                                <Typography variant='body1'>
                                    <b>Mobile No.:</b> {mobilenumber}
                                </Typography>

                                <Typography variant='body1'>
                                    <b>Payment Method:</b> {cart.paymentMethod}
                                </Typography>
                            </Box>
                        </SCard>
                    </Grid>

                    <Grid item lg={4} md={6} xs={12} >
                        <SCard>
                            <Box textAlign='left' sx={{ p: 2 }}>
                                <Typography variant='h5'>
                                    Order item(s)
                                </Typography>
                                {
                                    cart.cartItems.length === 0 ?
                                        <Typography variant='body1'>
                                            Your cart is empty
                                        </Typography> :
                                        <Box sx={{ p: 2 }}>
                                            {cart.cartItems.map((item, index) => (
                                                <Box textAlign='left' key={index}>
                                                    <SBox>
                                                        <img src={item.image} alt={item.name} height={100} />

                                                        <SLink to={`/product/${item.product}`}>
                                                            <Typography variant='body2'>
                                                                {item.name}
                                                            </Typography>
                                                        </SLink>
                                                    </SBox>

                                                    <Typography variant='body2'>
                                                        {item.qty} X ₹ {item.price} = ₹ {(item.qty * item.price).toFixed(2)}
                                                    </Typography>
                                                    <Divider />
                                                </Box>
                                            ))}
                                        </Box>
                                }
                            </Box>
                        </SCard>
                    </Grid>

                    <Grid item lg={4} md={6} xs={12} >
                        <SCard>
                            <Box textAlign='left' sx={{ p: 2 }}>
                                <Typography variant='h5'>
                                    Order summary
                                </Typography>

                                <Typography variant='body1'>
                                    Total: ₹ {cart.itemsPrice}
                                </Typography>

                                <SButton disabled={cart.cartItems === 0} onClick={placeOrder}>
                                    <Typography variant='body1'>
                                        Place order
                                    </Typography>
                                </SButton>
                            </Box>
                        </SCard>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default OrderPage
