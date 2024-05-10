import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent } from '@mui/material'
import styled from '@emotion/styled'

const SCard = styled(Card)({
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '350px'
})

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000'
})

function Product({ product }) {
    return (
        <div>
            <SCard elevation={3}>
                <CardContent>
                    <Link to={`/product/${product._id}`}>
                        <img src={product.image} alt={product.name} height={250} />
                    </Link>
                    <br />

                    <SLink to={`/product/${product._id}`}>
                        <Typography variant='body1'>
                            {product.name}
                        </Typography>

                        <Typography variant='body1'>
                            ₹ {product.price}
                        </Typography>
                    </SLink>
                </CardContent>
            </SCard>
        </div >
    )
}

export default Product
