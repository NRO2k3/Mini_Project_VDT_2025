import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../layouts/Topbar'
import Footer from '../layouts/Footer'
import { ParamContext } from '../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getData } from '../api/auth';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid, Box } from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function LandingProduct() {
  const location = useLocation();
  const { typeName } = location.state || {};
  const {host} = useContext(ParamContext);
  const [dataProduct, setDataProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const url_list = `https://${host}/api/v1/banking_product/list/product?type=${typeName}`;
    getData(url_list, setDataProduct, navigate);
  },[typeName])
  return (
    <>
      <Topbar/>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{m:2}}>
        <Typography variant='h4' fontWeight={'bold'}>List of Product</Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
      {dataProduct.map((product) => (
        <Grid item key={product.id}>
          <Card sx={{m: 2, height:"400px", width:"380px" }}>
            <CardMedia
              component="img"
              height="200px"
              image="/money.jpg"
              alt="Random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description.length > 150
                  ? product.description.slice(0, 150) + "..."
                  : product.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                component={Link}
                to="/product/dashboard"
                size="small"
                variant="contained"
                color="primary"
                state={{ product }}
                sx={{height:40, width:110}}>
                <DetailsIcon sx={{ mr: 1 }} />
                  Detail
              </Button>
              <Button size="small" variant="contained" color="secondary" sx={{height:40, width:110}}>
                <CalendarMonthIcon sx={{ mr: 1 }} />
                  Schedule
              </Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>

      <Footer/>
    </>
  )
}

export default LandingProduct;