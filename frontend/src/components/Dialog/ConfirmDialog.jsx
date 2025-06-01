import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

function ConfirmDialog({ open, onclose, onConfirm, option}) {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onclose();
        }
    }}>
      <DialogTitle>Confirm {option}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {option} this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onclose} color="primary">Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">{option}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
