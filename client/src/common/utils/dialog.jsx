import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const DialogBox = ({ handleClose, open, title, content }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            minWidth: {
              xs: '280px',
              sm: '350px',
              md: '450px',
              lg: '500px',
              xl: '650px',
            },
            borderRadius: '15px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#FFF',
          mb: 5,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <Grid container direction={'column'} gap={4}>
          <Grid item xs={12} sm={12} md={12}>
            {content}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
