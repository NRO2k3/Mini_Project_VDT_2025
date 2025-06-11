import React from 'react'
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { getData, requestWithAuth, update_object, update_user } from '../../api/auth';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { ParamContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function SettingProductDialog({product, dataType, fetchProduct}) {
  const {host} = useContext(ParamContext);
  const navigate = useNavigate();
  const url_list = `https://${host}/api/v1/banking_product/list`;
  const url_update = `https://${host}/api/v1/banking_product/update`;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    minAmount: product.minAmount,
    maxAmount: product.maxAmount,
    type: product.type
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
                        "type": formData.type,
                        "id": formData.id
                      }
    let isSuccessfull = await requestWithAuth(navigate, () => update_object(url_update, dataRequest));
    if(isSuccessfull === true){
      fetchProduct();
      alert("Update Product Successfully");
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
        startIcon={<PermDataSettingIcon />}
        sx={{
            backgroundColor: "#ed6c02",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "5px 12px",
            width: "90px",
            height: "32px"
            }}
        variant="contained"
        onClick={handleOPen}
      >
        Setting
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
          <Typography variant="h5">Update Product Profile!</Typography>
          <Button onClick={handleClose}><CloseIcon/></Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            type="text"
            name="name"
            label="Product Name"
            fullWidth
            margin="dense"
            variant="outlined"
            onChange={handleChange}
            value={formData.name}
          />
          <TextField
            type="text"
            name="description"
            label="Description"
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
            value={formData.minAmount}
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
          >
            {dataType.map((option)=>(
              <MenuItem key={option.id} value={option.name}>
                  {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
}

export default SettingProductDialog
