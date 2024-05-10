import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../redux/actions/UserActions'
import { listMyOrders } from '../redux/actions/OrderActions'
import { Toolbar, Typography, Card, CardContent, Box, Divider } from '@mui/material'
import styled from '@emotion/styled'

const SCard = styled(Card)({
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '250px',
    maxWidth: '700px'
})

function MyAccountPage() {
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails
    console.log(user)
    console.log(sessionStorage.getItem('userInfo'))

    const myOrderList = useSelector(state => state.myOrderList)
    const { orders } = myOrderList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/user/login')
        } else {
            dispatch(getUserDetails())
            dispatch((listMyOrders()))
        }
    }, [navigate, userInfo, dispatch])

    return (
        <div>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <SCard elevation={3}>
                <CardContent>
                    <Box textAlign='left' sx={{ p: 2 }}>
                        <Typography variant='body1'>
                            {user.username ? <><b>Username:</b> {user.username.split('@')[0]}</> : null}
                        </Typography>

                        <Typography variant='body1'>
                            <b>Email:</b> {user.email}
                        </Typography>
                    </Box>

                    <Box sx={{ background: '#2874A6', borderRadius: 2 }}>
                        <Typography variant='h5' sx={{ color: '#FFFFFF', p: 2 }}>
                            My Orders
                        </Typography>
                    </Box>

                    {orders ?
                        <>
                            {orders.map((order) => (
                                <Box textAlign='left' sx={{ p: 2 }} key={order._id}>
                                    <Typography variant='body2'>
                                        Order date: {order.createdAt.split('T')[0]}
                                    </Typography>

                                    {order.isDelivered ?
                                        <Typography variant='body2' sx={{ color: '#008000' }}>
                                            Status: Delivered
                                        </Typography> :
                                        <Typography variant='body2' sx={{ color: '#FF0000' }}>
                                            Status: Not delivered
                                        </Typography>
                                    }

                                    <Typography variant='body2'>
                                        Price: {order.price}
                                    </Typography>

                                    <Typography variant='body2'>
                                        Ordered item(s): {order.orderItems.map((orderItem) => (
                                            <li key={orderItem._id}>{orderItem.name}</li>
                                        ))}
                                    </Typography>
                                    <Divider />
                                </Box>
                            ))}
                        </> :
                        null
                    }
                </CardContent>
            </SCard>
        </div>
    )
}

export default MyAccountPage
