import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { create_object, getData, requestWithAuth } from '../../api/auth';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { ParamContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function CreateInRateDialog({setDataInRate}) {
  const {host} = useContext(ParamContext);
  const navigate = useNavigate();
  const url_list = `https://${host}/api/v1/interest_rate/list`;
  const url_create = `https://${host}/api/v1/interest_rate/create`;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    term: "",
    rate: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const dataRequest= {"term": formData.term,
                        "rate": formData.rate}
    let isSuccessfull = await requestWithAuth(navigate, () => create_object(url_create, dataRequest));
    if(isSuccessfull === true){
      getData(url_list, setDataInRate, navigate);
      alert("Create Interest Rate Successfully");
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
            <Typography variant="h5">Setting Interest Rate</Typography>
            <Button onClick={handleClose}><CloseIcon/></Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              name="term"
              label="Term"
              fullWidth
              margin="dense"
              variant="outlined"
              onChange={handleChange}
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
              inputProps={{
                step: "0.01",
                min: 0
              }}
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

export default CreateInRateDialog