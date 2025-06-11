import { Box, Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { delete_object, getData, requestWithAuth } from '../api/auth';
import {useNavigate } from "react-router-dom";
import { ParamContext } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CreateUserDialog from './Dialog/CreateUserDialog';
import SettingUserDialog from './Dialog/SettingUserDialog';
import ConfirmDialog from './Dialog/ConfirmDialog';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';

function TableUsers() {
  const theme = useTheme();
  const isMobile1 = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {host} = useContext(ParamContext);
  const [dataUser, setDataUser] = useState([]);
  const navigate = useNavigate();
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterRole, setFilterRole] = useState("ALL");
  const pageSize = 20;

  const handleDelete= async(id)=>{
    setUserIdToDelete(null)
    const url_delete= `https://${host}/api/v1/user/delete?id=${id}`
    let isSuccessfull = await requestWithAuth(navigate, () => delete_object(url_delete));
    if(isSuccessfull === true){;
      fetchUsers(0, filterRole);
      alert("Delete User Successfully");
    }
  }

  const handleSelect = async(role) => {
    setFilterRole(role)
    await fetchUsers(0, role);
    setOpenFilter(null);
  };
  
  const handleOnClick = async()=>{
    const url_filter= `https://${host}/api/v1/user/list/filter?email=${userEmail}`
    await getData(url_filter, setDataUser, navigate);
  }

  const fetchUsers = async (pageIndex, role) => {
    let url;
    if (role === "ALL") {
      url = `https://${host}/api/v1/user/list/page?page=${pageIndex}&size=${pageSize}`;
    } else {
      url = `https://${host}/api/v1/user/list/role?role=${role}&page=${pageIndex}&size=${pageSize}`;
    }
    await getData(url, (response) => {
      if (response) {
        setDataUser(response.users);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      }
    }, navigate);
  };

  useEffect(()=>{
    fetchUsers(0, filterRole);
  },[])

  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center" }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "white",  height: isMobile1? "400px": "560px" , width: isMobile1?"100vw": isMobile ? "100vw" :"1200px", marginTop: "40px", border: '1px solid #ccc', overflowX: "auto", overflowY: "auto"}}>
      <Box sx={{ textAlign: "center", p: 2,}}>
        <Typography variant='h5' fontWeight={'bold'}>User Profile</Typography>
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
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Table size="small" sx={{ tableLayout: isMobile? "auto": "fixed",width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Id</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Username</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Email</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Phone</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Role</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}
            >
              <CreateUserDialog fetchUsers={() => fetchUsers(0, filterRole)}/>
            </TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}
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
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{page*pageSize+index+1}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{user.name}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{user.email}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{user.phone}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{user.role}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
                <SettingUserDialog user={user} fetchUsers={() => fetchUsers(0, filterRole)}/>
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
      <Box sx={{ display: "flex", justifyContent: "center", m: 2}}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(e, value) => fetchUsers(value - 1, filterRole)}
          color="primary"
        />
      </Box>
    </Box>
      <ConfirmDialog
        open={userIdToDelete !== null}
        onClose = {() => setUserIdToDelete(null)}
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