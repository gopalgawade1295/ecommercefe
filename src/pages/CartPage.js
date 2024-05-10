import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/actions/CartActions'
import { Toolbar, Typography, Button, Card, CardContent, IconButton, Box, Grid, Divider } from '@mui/material'
import styled from '@emotion/styled'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DeleteIcon from '@mui/icons-material/Delete'

const SCard = styled(Card)({
    marginLeft: 'auto',
    marginRight: 'auto'
})

const SIconButton1 = styled(IconButton)({
    background: '#2874A6',
    color: '#FFFFFF',
    marginLeft: '8px',
    '&:hover': {
        backgroundImage: '#FFFFFF',
        color: '#2874A6'
    }
})

const SIconButton2 = styled(IconButton)({
    background: '#FF0000',
    color: '#FFFFFF',
    margin: '8px',
    '&:hover': {
        backgroundImage: '#FFFFFF',
        color: '#FF0000'
    }
})

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000'
})

const SBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
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

function CartPage() {
    const { id, qty } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const RemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
    }

    const Buy = () => {
        navigate('/cart/shipping_address')
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/user/login')
        }
        else {
            dispatch(addToCart(id, qty))
        }
    }, [userInfo, navigate, dispatch, id, qty])

    return (
        <div style={{ margin: '16px' }}>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <Grid container spacing={2}>
                <Grid item lg={8} md={6} xs={12} >
                    <SCard>
                        <CardContent>
                            {
                                cartItems.length === 0 ?
                                    <>
                                        <Box sx={{ p: 2 }}>
                                            <Typography variant='body1'>
                                                <Link to='/'>
                                                    <SIconButton1>
                                                        <ArrowBackRoundedIcon />
                                                    </SIconButton1>
                                                </Link>
                                                &emsp;Your cart is empty.
                                            </Typography>
                                        </Box>
                                    </> :
                                    <>
                                        {cartItems.map(item => (
                                            <Box sx={{ p: 2 }} key={item.product}>
                                                <SBox>
                                                    <img src={item.image} alt={item.name} height={100} />

                                                    <SLink to={`/product/${item.product}`}>
                                                        <Typography variant='body1'>
                                                            {item.name}
                                                        </Typography>
                                                    </SLink>
                                                </SBox>

                                                <SBox>
                                                    <Typography variant='body2'>
                                                        ₹ {item.price} x {item.qty}
                                                    </Typography>

                                                    <SIconButton2 onClick={() => RemoveFromCart(item.product)}>
                                                        <DeleteIcon />
                                                    </SIconButton2>
                                                </SBox>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </>
                            }
                        </CardContent>
                    </SCard>
                </Grid>

                <Grid item lg={4} md={6} xs={12} >
                    <SCard>
                        <CardContent>
                            <Box textAlign='left'>
                                <Typography variant='body1'>
                                    Total: {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} item(s)
                                </Typography>

                                <Typography variant='body1'>
                                    ₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                </Typography>

                                <SButton disabled={cartItems.length === 0} onClick={Buy}>
                                    Buy
                                </SButton>
                            </Box>
                        </CardContent>
                    </SCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default CartPage
