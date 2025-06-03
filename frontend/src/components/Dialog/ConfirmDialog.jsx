import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

function ConfirmDialog({ open, onClose, onConfirm, option}) {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
    }}>
      <DialogTitle>Confirm {option}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {option} this object?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">{option}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
