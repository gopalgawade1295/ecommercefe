import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { listProducts } from '../redux/actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Toolbar, Typography, TextField } from '@mui/material'

function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <Box sx={{ m: 2 }}>
            <Toolbar sx={{ mb: 3, '@media (max-width: 500px)': { mb: 9 } }} />
            <Box textAlign='left'>
                <TextField
                    id='outlined-size-small'
                    label='Search'
                    type='text'
                    size='small'
                    value={keyword}
                    sx={{ mb: 2 }}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </Box>
            {
                loading ? <Typography variant='caption'>Loading...</Typography> :
                    error ? <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography> :
                        <Box sx={{ m: 2 }}>
                            <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                {products.filter((Product) => {
                                    if (!keyword) {
                                        return Product
                                    }
                                    else if (Product.name.toLowerCase().includes(keyword.toLowerCase())) {
                                        return Product
                                    }
                                }).map((product) => (
                                    <Grid item lg={3} md={4} sm={6} xs={12} key={product._id}>
                                        <Product product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
            }
        </Box>
    )
}

export default HomePage
