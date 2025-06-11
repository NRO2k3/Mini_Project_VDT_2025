import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
import { ParamContext } from '../App';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './Dialog/ConfirmDialog';
import { delete_object, getData, requestWithAuth } from '../api/auth';
import CreateInRateDialog from './Dialog/CreateInRateDialog';
import SettingInRateDialog from './Dialog/SettingInRateDialog';

function TableInRate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile1 = useMediaQuery(theme.breakpoints.down('sm'));
  const {host} = useContext(ParamContext);
  const [dataInRate, setDataInRate] = useState([]);
  const url_list = `https://${host}/api/v1/interest_rate/list`;
  const [inRateIdToDelete, setInRateIdToDelete] = useState(null);
  const navigate = useNavigate();
  const handleDelete= async(id)=>{
    setInRateIdToDelete(null)
    const url_delete= `https://${host}/api/v1/interest_rate/delete?id=${id}`
    let isSuccessfull = await requestWithAuth(navigate, () => delete_object(url_delete));
    if(isSuccessfull === true){
      getData(url_list, setDataInRate, navigate);
      alert("Delete Interest Rate Successfully");
    }
  }
  useEffect(()=>{
    getData(url_list, setDataInRate, navigate)
  },[])
  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: "white",  height: isMobile1? "400px": "560px", marginTop: "40px", border: '1px solid #ccc', width: isMobile1?"100vw": isMobile ? "100vw" :"1200px", overflowX: "auto", overflowY: "auto"}}>
      <Box sx={{ textAlign: "center", p: 2,}}>
        <Typography variant='h5' fontWeight={'bold'}>Interest Rate</Typography>
      </Box>
      <Table size="small" sx={{tableLayout: isMobile? "auto": "fixed",width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Id</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Term</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}}>Rate</TableCell>
            <TableCell align="center" sx={{fontWeight: "600", fontSize: "15px", position: "sticky", top: 0, zIndex: 1, backgroundColor: "white"}} colSpan={2}
            >
              <CreateInRateDialog setDataInRate={setDataInRate}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataInRate.map((inRate, index) =>
            <TableRow key={inRate.id}>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{index+1}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{inRate.term}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>{inRate.rate}</TableCell>
              <TableCell align="center" sx={{fontWeight: "400", fontSize: "13px"}}>
                <SettingInRateDialog setDataInRate={setDataInRate} inRate={inRate}/>
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
                onClick={() => setInRateIdToDelete(inRate.id)}
              >
                Delete
              </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <ConfirmDialog
      open={inRateIdToDelete !== null}
      onClose = {() => setInRateIdToDelete(null)}
      option={"delete"}
      onConfirm={() => handleDelete(inRateIdToDelete)}
    />
    </>
  )
}

export default TableInRate