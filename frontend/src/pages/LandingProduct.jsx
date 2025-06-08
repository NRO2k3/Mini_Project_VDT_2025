import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../layouts/Topbar'
import Footer from '../layouts/Footer'
import { ParamContext } from '../App';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { create_object, delete_object, getData, requestWithAuth } from '../api/auth';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogActions, DialogContentText, Dialog, DialogTitle, TextField, DialogContent, useMediaQuery } from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../components/Dialog/ConfirmDialog';
import Pagination from '@mui/material/Pagination';

function LandingProduct() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null);
  const location = useLocation();
  const { typeName } = location.state || {};
  const {host} = useContext(ParamContext);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataAppointment, setDataAppointment] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null)
  const url_create = `https://${host}/api/v1/appointment/create`
  const url_list = `https://${host}/api/v1/banking_product/list/product?type=${typeName}`;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [formData, setFormData] = useState({
    productId: selectProduct,
    amount: "",
    date: ""
  });

  const handleDelete= async(id)=>{
    setAppointmentIdToDelete(null)
    const url_delete= `https://${host}/api/v1/appointment/delete?id=${id}`
    let isSuccessfull = await requestWithAuth(navigate, () => delete_object(url_delete));
    if(isSuccessfull === true){
      fetchAppointment(0);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if(e.target.name==="amount"){
      if(e.target.value > 9999999999999999.99){
        alert("Nhập tối đa 16 chữ số thập phân");
        return;
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currencyFormat = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  
  const handleSubmit = async() => {
    console.log("Form Data:", formData);
    let isSuccessfull = await requestWithAuth(navigate, () => create_object(url_create, formData));
    if(isSuccessfull === true){
      fetchAppointment(0);
      alert("Create Appointment Successfully");
    }
    handleClose();
  };

  const fetchAppointment = async (pageIndex) => {
    const url = `https://${host}/api/v1/appointment/list/user/filter?type=${typeName}&page=${pageIndex}&size=${pageSize}`;
    await getData(url, (response) => {
      if (response) {
        setDataAppointment(response.appointments);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      }
    }, navigate);
  }
    

  useEffect(()=>{

    getData(url_list, setDataProduct, navigate);
    fetchAppointment(0);
  
    if (selectProduct !== null) {
      setFormData(prev => ({
        ...prev,
        productId: selectProduct
      }));
    }
  },[typeName, selectProduct])

  return (
    <>
      <Topbar/>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{m:2}}>
        <Typography variant='h4' fontWeight={'bold'}>List of Product</Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
      {dataProduct.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{m: 2, height:"400px", width: isMobile? "300px" :"380px" } }>
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
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: "normal",
                wordWrap: "break-word"}}>
                {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
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
              <Button size="small" variant="contained" color="secondary" sx={{height:40, width:110}}
                onClick={() => {
                  setOpen(true)
                  setSelectProduct(product.id)}
                  }>
                <CalendarMonthIcon sx={{ mr: 1 }} />
                  Schedule
              </Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} sx={{ backgroundColor: "white",  maxHeight: "560px" , width: "100%", marginTop: "40px", border: '1px solid #ccc', overflowX: "auto", overflowY: "auto"}}>
        <Box sx={{ textAlign: "center", p: 2,}}>
          <Typography variant='h5' fontWeight={'bold'}>User Appointments</Typography>
        </Box>
        <Table size="small" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Id</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Email User</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white", width: "250px"}}>Product Name</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Product Type</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Amount</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Date</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Status</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Message</TableCell>
              <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {dataAppointment.map((appointment, index) =>
              <TableRow key={appointment.id}>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{page*pageSize+index+1}</TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{appointment.email}</TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px", whiteSpace: "normal",
                  wordWrap: "break-word"}}>{appointment.productName}</TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{appointment.productType}</TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{currencyFormat(appointment.amount)}</TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
                  {dayjs(appointment.date).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px",fontWeight: "bold",
                color:
                appointment.status === "PENDING"
                  ? "gold"
                  : appointment.status === "ACCEPTED"
                  ? "green"
                  : appointment.status === "DENIED"
                  ? "red"
                  : "black"
                }}>{appointment.status}</TableCell>
                <TableCell align="left" sx={{fontWeight: "400", fontSize: "13px", whiteSpace: "normal",
                  wordWrap: "break-word"}}>{appointment.message ? appointment.message : "No Message"}</TableCell>
                <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
                  {
                    appointment.status !== "ACCEPTED" ?
                      <Button
                      startIcon={<DeleteIcon />}
                      sx={{
                          backgroundColor: "#d32f2f",
                          fontSize: "10px",
                          fontWeight: "bold",
                          padding: "5px 12px",
                          width: "90px",
                          height: "32px"
                          }}
                      variant="contained"
                      onClick={() => setAppointmentIdToDelete(appointment.id)}
                    >
                      Delete
                    </Button>
                    : <Typography color='grey'>None</Typography>
                  }
                </TableCell>
              </TableRow>
          )}
          </TableBody>
        </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", m: 2}}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(e, value) => fetchAppointment(value - 1)}
          color="primary"
        />
      </Box>
      </Box>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
          >
            <Typography variant="h5">Form Register</Typography>
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" width={isMobile?"260px":"400px"}>
            <TextField
              type="number"
              name="amount"
              label="Amount"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.amount}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Appointment Date"
                value={formData.date ? dayjs(formData.date) : null}
                onChange={(newValue) => {
                  setFormData({ ...formData, date: newValue ? newValue.toISOString() : "" });
                }}
                slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
              />
            </LocalizationProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={appointmentIdToDelete !== null}
        onClose = {() => setAppointmentIdToDelete(null)}
        option={"delete"}
        onConfirm={() => handleDelete(appointmentIdToDelete)}
      />
      <Footer/>

    </>
  )
}

export default LandingProduct;