import React from 'react'
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { getData, requestWithAuth, update_object } from '../../api/auth';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { ParamContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function SettingInRateDialog({setDataInRate, inRate}) {
  const {host} = useContext(ParamContext);
  const navigate = useNavigate();
  const url_list = `https://${host}/api/v1/interest_rate/list`;
  const url_update = `https://${host}/api/v1/interest_rate/update`;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    term: inRate.term,
    rate: inRate.rate
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const dataRequest= {"term": formData.term,
                        "rate": formData.rate
                      }
    let isSuccessfull = await requestWithAuth(navigate, () => update_object(url_update, dataRequest));
    if(isSuccessfull === true){
      getData(url_list, setDataInRate, navigate);
      alert("Update InterestRate Successfully");
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
          <Typography variant="h5">Update Interest Rate!</Typography>
          <Button onClick={handleClose}><CloseIcon/></Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            type="number"
            name="term"
            label="Term"
            fullWidth
            margin="dense"
            variant="outlined"
            disabled
            value={formData.term}
          />
          <TextField
            name="rate"
            label="Rate Percent"
            fullWidth
            margin="dense"
            variant="outlined"
            onChange={handleChange}
            value={formData.rate}
            type="number"
            slotProps={{
              input: {
                step: '0.01',
                min: '0',
                max: '99.99'
              }
            }}
          />
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

export default SettingInRateDialog
