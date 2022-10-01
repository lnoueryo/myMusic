
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function FormDialog({buttonText, func}) {
  const [snackBar, setSnackBar] = useState({message: '更新しました', color: 'success'});
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  };

  const excuteFunc = async(f) => {
    const isSuccess = await f()
    setOpen(false)
    if(!isSuccess) {
      setSnackBar({message: '更新に失敗しました', color: 'error'});
    }
    setOpenSnackbar(true)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {buttonText}します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => excuteFunc(func)}>Yes</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnackbar}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackBar.color} sx={{ width: '100%' }}>
          {snackBar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
