import { Box, Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { delete_object, getData, requestWithAuth } from '../api/auth';
import {useNavigate } from "react-router-dom";
import { ParamContext } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ConfirmDialog from './Dialog/ConfirmDialog';
import CreateProductDialog from './Dialog/CreateProductDialog';
import SettingProductDialog from './Dialog/SettingProductDialog';
import Pagination from '@mui/material/Pagination';

function TableProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {host} = useContext(ParamContext);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataType, setDataType] = useState([]);
  const navigate = useNavigate();
  const url_list_type = `https://${host}/api/v1/banking_product/list/type`;
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState("ALL");
  const pageSize = 20;

  const handleDelete= async(id)=>{
    setProductIdToDelete(null)
    const url_delete= `https://${host}/api/v1/banking_product/delete?id=${id}`
    let isSuccessfull = await requestWithAuth(navigate, () => delete_object(url_delete));
    if(isSuccessfull === true){
      fetchProduct(0,filterType);
      alert("Delete Product Successfully");
    }
  }

  const handleSelect = async(type) => {
    setFilterType(type)
    fetchProduct(0,type);
    setOpenFilter(null);
  };
  
  const fetchProduct = async (pageIndex, type) => {
    let url;
    if (type === "ALL") {
      url = `https://${host}/api/v1/banking_product/list/page?page=${pageIndex}&size=${pageSize}`;
    } else {
      url = `https://${host}/api/v1/banking_product/list/product/type?type=${type}&page=${pageIndex}&size=${pageSize}`;
    }
    await getData(url, (response) => {
      if (response) {
        setDataProduct(response.products);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      }
    }, navigate);
  }

  useEffect(()=>{
    fetchProduct(0,filterType);
    getData(url_list_type, setDataType, navigate);
  },[])

  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "white",  height: "560px" , width: "1200px", marginTop: "40px", border: '1px solid #ccc', overflowX: "auto", overflowY: "auto"}}>
      <Box sx={{ textAlign: "center", p: 2,}}>
        <Typography variant='h5' fontWeight={'bold'}>Product Detail</Typography>
      </Box>
      <Table size="small" sx={{tableLayout: isMobile? "auto": "fixed",width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Id</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Name</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white", width: "250px"}}>Description</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Min Amount</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Max Amount</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Type</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}
            >
              <CreateProductDialog setDataProduct={setDataProduct} dataType={dataType}/>
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
        {dataProduct.map((product, index) =>
            <TableRow key={product.id}>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{page*pageSize+index+1}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px", whiteSpace: "normal",
                wordWrap: "break-word"}}>
                {product.name}
                  </TableCell>
              <TableCell align="left"
              sx={{fontWeight: "400",
                fontSize: "13px",
                width: "250px",
                whiteSpace: "normal",
                wordWrap: "break-word"}}>
                  {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
                  : product.description}
                </TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(product.minAmount)}
              </TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(product.maxAmount)}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{product.type}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
                <SettingProductDialog setDataProduct={setDataProduct} product={product} dataType={dataType}/>
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
                onClick={() => setProductIdToDelete(product.id)}
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
          onChange={(e, value) => fetchProduct(value - 1, filterType)}
          color="primary"
        />
      </Box>
    </Box>
      <ConfirmDialog
        open={productIdToDelete !== null}
        onClose = {() => setProductIdToDelete(null)}
        option={"delete"}
        onConfirm={() => handleDelete(productIdToDelete)}
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
              marginLeft: '14px',
            }
          }
        }}
      >{
        dataType.map((option)=>(
          <MenuItem onClick={() => handleSelect(`${option.name}`)}>
            <Typography variant="subtitle1">
              {option.name}
            </Typography>
          </MenuItem>
        ))
      }
      <MenuItem onClick={() => handleSelect("ALL")}>
        <Typography variant="subtitle1">
          ALL
        </Typography>
          </MenuItem>
      </Menu>
      </>
  )
}

export default TableProducts