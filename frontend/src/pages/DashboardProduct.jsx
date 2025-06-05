import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../layouts/Topbar'
import Footer from '../layouts/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Divider, Stack, Grid, TextField, MenuItem } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { getData } from '../api/auth';
import { ParamContext } from '../App';

function DashboardProduct() {
  const {host} = useContext(ParamContext);
  const location = useLocation();
  const { product } = location.state || {};
  const [dataInRate, setDataInRate] = useState([]);
  const navigate = useNavigate();
  const url_list = `https://${host}/api/v1/interest_rate/list`;
  const currencyFormat = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  
  const [formData, setFormData] = useState({
    money: 0,
    term: 0,
  });

  const rateSelectObj = dataInRate.find(rate => rate.term === Number(formData.term));
  const rateSelect = rateSelectObj ? rateSelectObj.rate : 0;
  const MoneyInrate = Number(rateSelect)/100 * Number(formData.money)
  const TotalMoney = Number(MoneyInrate) + Number(formData.money)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    getData(url_list, setDataInRate, navigate)
  },[])
  
  return (
    <>
      <Topbar />

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ m: 3 }}>
        <Typography variant="h4" fontWeight="bold">Product Information</Typography>
      </Box>

      <Box display="flex" justifyContent="center" sx={{ px: 2 }}>
        <Card
          sx={{
            width: '1000px',
            boxShadow: 3,
            borderRadius: 2,
            p: 3
          }}
        >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="medium">Tiền gửi tối thiểu:</Typography>
                <Typography variant="h6">{currencyFormat(product.minAmount)}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="medium">Tiền gửi tối đa:</Typography>
                <Typography variant="h6">{currencyFormat(product.maxAmount)}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Grid container justifyContent="center" alignItems="center" sx={{ m: 3 }} spacing={4}>
        <Grid item xs={12} sm={6} sx={{ border: "1px solid black", borderRadius: "15px", height: '260px', width:'600px'}}>
          <Box display="flex" alignItems="center" gap={1} sx={{p:3}}>
            <MonetizationOnIcon sx={{ fontSize: 50 }} />
            <TextField
              name="money"
              label="Input Money"
              fullWidth
              margin="dense"
              variant="outlined"
              type="number"
              sx={{width: "500px"}}
              onChange={handleChange}
              value={formData.money}
              slotProps={{
                step: "0.01",
                min: "0",
                max: "9999999999999999.99"
              }}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1} sx={{p:3}}>
            <EditCalendarIcon sx={{ fontSize: 50 }} />
            <TextField
              select
              name="term"
              label="Select Term"
              fullWidth
              margin="dense"
              variant="outlined"
              type="number"
              onChange={handleChange}
              sx={{width: "500px"}}
              value={formData.term}
            >
              {
                dataInRate.map((option)=>(
                <MenuItem key={option.id} value={option.term}>
                  {option.term} tháng
                </MenuItem>
                ))
              }
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ border: "1px solid black", borderRadius: "15px", height: '260px', width:'600px'}}>
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1} sx={{p:3, m: 1}}>
            <Typography>
              {currencyFormat(formData.money)}
            </Typography>
            <Typography>
              {rateSelect} %
            </Typography>
            <Typography>
              {currencyFormat(MoneyInrate)}
            </Typography>
            <Divider sx={{ my: 2, width: '100%' }}/>
            <Typography>
              Total:
            </Typography>
            <Typography>
              {currencyFormat(TotalMoney)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardProduct;
