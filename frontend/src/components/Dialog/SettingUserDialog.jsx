import React from 'react'
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { requestWithAuth, update_object } from '../../api/auth';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { ParamContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function SettingUserDialog({user, fetchUsers}) {
  const {host} = useContext(ParamContext);
  const navigate = useNavigate();
  const url_update = `https://${host}/api/v1/user/update`;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const dataRequest= {"name": formData.name,
                        "phone": formData.phone,
                        "email":  formData.email,
                        "role":  formData.role
                      }
    let isSuccessfull = await requestWithAuth(navigate, () => update_object(url_update, dataRequest));
    if(isSuccessfull === true){
      fetchUsers()
      alert("Update User Successfully");
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
          <Typography variant="h5">Update User Profile!</Typography>
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
            disabled
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
            select
            name="role"
            label="Role"
            fullWidth
            margin="dense"
            variant="outlined"
            onChange={handleChange}
            value={formData.role}
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ASSISTANT">Assistant</MenuItem>
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

export default SettingUserDialog
