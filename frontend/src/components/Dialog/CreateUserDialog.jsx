import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { create_user } from '../../api/auth';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

function CreateUserDialog({fetchUsers}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password:"",
    password_verify:""
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    if(formData.password !== formData.password_verify){
      alert("Password not equal Password Verify !!!");
      return;
    } else {
        const dataRequest= {"name": formData.name,
                            "password": formData.password,
                            "email":  formData.email,
                            "phone":  formData.phone
                          }
        let isSuccessfull = await create_user(dataRequest);
        if(isSuccessfull === true){
          fetchUsers();
          alert("Create User Successfully");
        }
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
            <Typography variant="h5">Setting User Profile!</Typography>
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              name="name"
              label="Username"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.name}
              autoComplete="off"
            />
            <TextField
              name="email"
              label="Email Address"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.email}
            />
            <TextField
              name="phone"
              label="Phone Number"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.phone}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.password}
              autoComplete="new-password"
            />
            <TextField
              name="password_verify"
              label="Verrify Password"
              type="password"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              value={formData.password_verify}
            />
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
export default CreateUserDialog
