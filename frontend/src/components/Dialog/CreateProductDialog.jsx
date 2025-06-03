import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { create_object, create_user, getData } from '../../api/auth';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { ParamContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function CreateProductDialog({setDataProduct, dataType}) {
  const {host} = useContext(ParamContext);
  const navigate = useNavigate();
  const url_list = `https://${host}/api/v1/banking_product/list`;
  const url_create = `https://${host}/api/v1/banking_product/create`;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minAmount: "",
    maxAmount:"",
    type: ""
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const dataRequest= {"name": formData.name,
                        "description": formData.description,
                        "minAmount":  formData.minAmount,
                        "maxAmount":  formData.maxAmount,
                        "type":formData.type
                      }
    let isSuccessfull = await create_object(url_create ,dataRequest);
    if(isSuccessfull === true){
      getData(url_list, setDataProduct, navigate);
      alert("Create Product Successfully");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOPen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        startIcon={<AddIcon/>}
        sx={{
            backgroundColor: "#2e7d32",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "5px 12px",
            width: "90px",
            height: "32px"
            }}
        variant="contained"
        onClick={handleOPen}
      >
        Create
      </Button>
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
            <Typography variant="h5">Setting Product Profile!</Typography>
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              name="name"
              label="Product Name"
              type="text"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.name}
            />
            <TextField
              name="description"
              label="Description"
              type="text"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.description}
            />
            <TextField
              name="minAmount"
              label="Min Amount"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              type="number"
              value={formData.minAmount}
              slotProps={{
                input:{
                  step: "0.01",
                  min: "0",
                  max: "9999999999999999.99"
                }
              }}
            />
            <TextField
              name="maxAmount"
              label="Max Amount"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.maxAmount}
              type="number"
              slotProps={{
                input:{
                  step: "0.01",
                  min: "0",
                  max: "9999999999999999.99"
                }
              }}
            />
            <TextField
              select
              name="type"
              label="Type"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.type}
            >{
              dataType.map((option)=> (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))
            }</TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            CREATE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default CreateProductDialog
