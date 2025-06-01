import { Box, Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { delete_user, getData } from '../api/auth';
import {useNavigate } from "react-router-dom";
import { ParamContext } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CreateUserDialog from './Dialog/CreateUserDialog';
import SettingUserDialog from './Dialog/SettingUserDialog';
import ConfirmDialog from './Dialog/ConfirmDialog';

function TableUsers() {
  const {host} = useContext(ParamContext);
  const [dataUser, setDataUser] = useState([]);
  const navigate = useNavigate();
  const url_list = `https://${host}/api/v1/user/list`;
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);

  const handleDelete= async(id)=>{
    setUserIdToDelete(null)
    const url_delete= `https://${host}/api/v1/user/delete?id=${id}`
    let isSuccessfull = await delete_user(url_delete);
    if(isSuccessfull === true){
      getData(url_list, setDataUser, navigate);
      alert("Delete User Successfully");
    }
  }

  const handleSelect = async(role) => {
    console.log('Selected:', role);
    if (role === "ALL"){
      await getData(url_list, setDataUser, navigate);
      return;
    } else{
      const url_filter= `https://${host}/api/v1/user/list/role?role=${role}`
      await getData(url_filter, setDataUser, navigate);
    }
    setOpenFilter(null);
  };
  

  useEffect(()=>{
    getData(url_list, setDataUser, navigate)
  },[])

  return (
    <>
    {
      dataUser.length === 0 ? <Typography variant='h4' fontWeight={'bold'}>Loading ...</Typography>:
      <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto", backgroundColor: "white",  maxHeight: "600px", overflowY: "auto", marginTop: "12px"}}>
      <Box sx={{ textAlign: "center", p: 2,}}>
        <Typography variant='h5' fontWeight={'bold'}>User Profile</Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}>Id</TableCell>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}>Username</TableCell>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}>Email</TableCell>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}>Phone</TableCell>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}>Role</TableCell>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}
            >
              <CreateUserDialog setDataUser={setDataUser}/>
            </TableCell>
            <TableCell align="center" sx={{"fontWeight": "600", "fontSize": "15px"}}
            >
              <Button
                  startIcon={<FilterAltIcon/>}
                  sx={{
                      backgroundColor: "#1976d2",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "5px 12px",
                      width: "90px",
                      height: "32px"
                      }}
                  variant="contained"
                  aria-control='filter-menu'
                  onClick={e => setOpenFilter(e.currentTarget)}
                >
                  Filter
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataUser.map((user, index) =>
            <TableRow key={user.id}>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>{index+1}</TableCell>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>{user.name}</TableCell>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>{user.email}</TableCell>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>{user.phone}</TableCell>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>{user.role}</TableCell>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>
                <SettingUserDialog setDataUser={setDataUser} user={user}/>
              </TableCell>
              <TableCell align="center" sx={{"fontWeight": "400", "fontSize": "13px"}}>
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
                onClick={() => setUserIdToDelete(user.id)}
              >
                Delete
              </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    }
    <ConfirmDialog
      open={userIdToDelete !== null}
      setUserIdToDelete = {() => setUserIdToDelete(null)}
      option={"delete"}
      onConfirm={() => handleDelete(userIdToDelete)}
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
            marginLeft: '10px',
          }
        }
      }}
    >
      <MenuItem onClick={() => handleSelect('ALL')}>
        <Typography variant="subtitle1">
          ALL
        </Typography>
      </MenuItem>

      <MenuItem onClick={() => handleSelect('ADMIN')}>
        <Typography variant="subtitle1">
          ADMIN
        </Typography>
      </MenuItem>

      <MenuItem onClick={() => handleSelect('USER')}>
        <Typography variant="subtitle1">
          USER
        </Typography>
      </MenuItem>

      <MenuItem onClick={() => handleSelect('ASSISTANT')}>
        <Typography variant="subtitle1">
          ASSISTANT
        </Typography>
      </MenuItem>
    </Menu>
    </>
  )
}

export default TableUsers