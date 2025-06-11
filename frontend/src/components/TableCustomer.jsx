import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { delete_object, getData, requestWithAuth, update_object } from '../api/auth';
import {useNavigate } from "react-router-dom";
import { ParamContext } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './Dialog/ConfirmDialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';

function TableCustomer() {
  const theme = useTheme();
  const isMobile1 = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {host} = useContext(ParamContext);
  const [dataAppointment, setDataAppointment] = useState([]);
  const [dataType, setDataType] = useState([]);
  const navigate = useNavigate();
  const url_update = `https://${host}/api/v1/appointment/update`;
  const url_list_type = `https://${host}/api/v1/banking_product/list/type`;
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [openFilter1, setOpenFilter1] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [idDenied, setIdDenied] = useState(null)
  const [userEmail, setUserEmail] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState("ALL");
  const [select, setSelect] = useState(true);
  const pageSize = 10;

  const handleOnClick = async()=>{
    const url_filter= `https://${host}/api/v1/appointment/list/filter/email?email=${userEmail}`
    await getData(url_filter, setDataAppointment, navigate);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const currencyFormat = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);

  const handleDelete= async(id)=>{
    setAppointmentIdToDelete(null)
    const url_delete= `https://${host}/api/v1/appointment/delete?id=${id}`
    let isSuccessfull = await requestWithAuth(navigate, () => delete_object(url_delete));
    if(isSuccessfull === true){
      fetchAppointment(0,filterType);
    }
  }

  const handleClickOption= async (id, status)=>{
    const dataRequest= {
      "id": id,
      "status": status,
      "message": status === "ACCEPTED" ? "No Message" : message
    }
    let isSuccessfull = await requestWithAuth(navigate, () => update_object(url_update, dataRequest));
    if(isSuccessfull === true){
      fetchAppointment(0,filterType);
    }
  }

  const handleSubmit = async () => {
    handleClose();
    await handleClickOption(idDenied, "DENIED")
    fetchAppointment(0, filterType);
  }

  const handleSelectType = async(type) => {
    setFilterType(type)
    fetchAppointment(0,type);
    setOpenFilter(null);
  };

  const handleSelectStatus = async(status) => {
    setFilterType(status);
    fetchAppointment(0, status);
    setOpenFilter1(null);
  };

  const fetchAppointment = async (pageIndex, option) => {
    let url;
    if (option === "ALL") {
      url = `https://${host}/api/v1/appointment/list/page?page=${pageIndex}&size=${pageSize}`;
    } else {
      select ?
      url = `https://${host}/api/v1/appointment/list/typeProduct?type=${option}&page=${pageIndex}&size=${pageSize}`:
      url = `https://${host}/api/v1/appointment/list/filter/status?status=${option}&page=${pageIndex}&size=${pageSize}`
    }
    await getData(url, (response) => {
      if (response) {
        setDataAppointment(response.appointments);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      }
    }, navigate);
  }

  useEffect(()=>{
    fetchAppointment(0, filterType);
    getData(url_list_type, setDataType, navigate);
  },[])

  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "white",  height: isMobile1? "400px": "560px" , width: isMobile1?"100vw": isMobile ? "100vw" :"1200px", marginTop: "40px", border: '1px solid #ccc', overflowX: "auto", overflowY: "auto"}}>
      <Box sx={{ textAlign: "center", p: 2,}}>
        <Typography variant='h5' fontWeight={'bold'}>Customer Appointments</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 1, mb: 1 }}>
        <TextField
          id="search-bar"
          label="Enter a email user"
          variant="outlined"
          size="small"
          onChange={(e) => setUserEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="search" onClick={handleOnClick}>
                  <SearchIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Table size="small" sx={{tableLayout: isMobile? "auto": "fixed",width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Id</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Email User</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white", width: "250px"}}>Product Name</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>
              <Button
                aria-control='filter-menu'
                onClick={e => {
                  setOpenFilter(e.currentTarget)
                  setSelect(true);
                }}
                color="primary"
                sx={{fontWeight: 'bold'}}
              >
                Product Type
              </Button>
            </TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Amount</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Date</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>
              <Button
                aria-control='filter-status'
                onClick={e => {
                  setOpenFilter1(e.currentTarget)
                  setSelect(false);
                }}
                sx={{fontWeight: 'bold'}}
              >Status
              </Button>
              </TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Message</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Options</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}
            > Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataAppointment.map((appointment, index) =>
            <TableRow key={appointment.id}>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{index+1}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{appointment.email}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{appointment.productName}</TableCell>
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
                <Button onClick={()=> {
                  handleClickOption(appointment.id, "ACCEPTED")
                  }}>
                  <CheckCircleIcon sx={{color:"green", fontSize: 30}}
                  />
                </Button>
                <Button onClick={() => {
                  setIdDenied(appointment.id)
                  setOpen(true)
                  }
                  }>
                  <CancelIcon sx={{color:"red", fontSize: 30}}/>
                </Button>
              </TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
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
          onChange={(e, value) => fetchAppointment(value - 1, filterType)}
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
            <Typography variant="h5">Message Denied</Typography>
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              type="text"
              name="name"
              label="Description"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={(e)=> setMessage(e.target.value)}
              value={message}
            />
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
      <Menu
        id='filter-menu'
        open={Boolean(openFilter)}
        anchorEl={openFilter}
        onClose={() => setOpenFilter(null)}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            style: {
              minWidth: '80px',
            }
          }
        }}
      >{
        dataType.map((option)=>(
          <MenuItem onClick={() => handleSelectType(`${option.name}`)}>
            <Typography variant="subtitle1">
              {option.name}
            </Typography>
          </MenuItem>
        ))
      }
      <MenuItem onClick={() => handleSelectType("ALL")}>
        <Typography variant="subtitle1">
          ALL
        </Typography>
          </MenuItem>
      </Menu>
      <Menu
        id='filter-status'
        open={Boolean(openFilter1)}
        anchorEl={openFilter1}
        onClose={() => setOpenFilter1(null)}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            style: {
              minWidth: '80px',
            }
          }
        }}
      >
      <MenuItem onClick={() => handleSelectStatus("PENDING")}>
        <Typography variant="subtitle1">
          PENDING
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSelectStatus("ACCEPTED")}>
        <Typography variant="subtitle1">
          ACCEPTED
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSelectStatus("DENIED")}>
        <Typography variant="subtitle1">
          DENIED
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSelectStatus("ALL")}>
        <Typography variant="subtitle1">
          ALL
        </Typography>
          </MenuItem>
      </Menu>
      </>
  )
}

export default TableCustomer