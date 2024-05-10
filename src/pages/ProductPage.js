import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails } from '../redux/actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'
import { Toolbar, Typography, Card, CardContent, Grid, Box, IconButton, FormControl, Select, MenuItem } from '@mui/material'
import styled from '@emotion/styled'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const SCard = styled(Card)({
    marginLeft: 'auto',
    marginRight: 'auto'
})

const SIconButton = styled(IconButton)({
    background: '#2874A6',
    color: '#FFFFFF',
    marginLeft: '8px',
    '&:hover': {
        backgroundImage: '#FFFFFF',
        color: '#2874A6'
    }
})

function ProductPage() {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const AddToCart = () => {
        navigate(`/cart/${id}/${qty}`)
    }

    return (
        <div>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <Box textAlign='left' sx={{ m: 2 }}>
                <Link to='/'>
                    <SIconButton>
                        <ArrowBackRoundedIcon />
                    </SIconButton>
                </Link>
            </Box>

            <Box sx={{ m: 2 }}>
                <Grid container spacing={2}>
                    <Grid item lg={8} md={6} xs={12} >
                        <SCard>
                            <CardContent>
                                {
                                    loading ? <Typography variant='caption'>Loading...</Typography> :
                                        error ? <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography> :
                                            <>
                                                <img src={product.image} alt={product.name} height={300} />
                                                <Typography variant='h6'>
                                                    {product.name}
                                                </Typography>

                                                <Box textAlign='left'>
                                                    <Typography variant='body2'>
                                                        <b>Brand:</b> {product.brand}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Network:</b> {product.network}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Launch:</b> {product.launch}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Body:</b> {product.body}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Display:</b> {product.display}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Platform:</b> {product.platform}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Memory:</b> {product.memory}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Main Camera:</b> {product.maincamera}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Selfie Camera:</b> {product.selfiecamera}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Sound:</b> {product.sound}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Features:</b> {product.features}
                                                    </Typography>

                                                    <Typography variant='body2'>
                                                        <b>Battery:</b> {product.battery}
                                                    </Typography>
                                                </Box>
                                            </>
                                }
                            </CardContent>
                        </SCard>
                    </Grid>

                    <Grid item lg={4} md={6} xs={12}>
                        <SCard>
                            <CardContent>
                                <Box textAlign='left'>
                                    <Typography variant='body1'>
                                        <b>Price:</b> ₹ {product.price}
                                    </Typography>

                                    <Typography variant='body1'>
                                        <b>Status:</b> {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <Typography variant='body1'>
                                            <b>Qty:&nbsp;</b>
                                        </Typography>
                                        {
                                            product.countInStock > 0 &&
                                            (
                                                <FormControl size='small'>
                                                    <Select
                                                        labelId='demo-simple-select-label'
                                                        id='demo-simple-select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].length >= 10 ?
                                                                [...Array(10).keys()].map((x) => (
                                                                    <MenuItem key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </MenuItem>
                                                                )) :
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <MenuItem key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </MenuItem>
                                                                ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )
                                        }

                                        <SIconButton disabled={product.countInStock === 0} onClick={AddToCart}>
                                            <AddShoppingCartIcon />
                                        </SIconButton>
                                    </Box>
                                </Box>
                            </CardContent>
                        </SCard>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default ProductPage
