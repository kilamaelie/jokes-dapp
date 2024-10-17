'use client';
import Grid from '@mui/material/Grid2';
import { Typography, Button, TextField } from '@mui/material';

export const UpdateJoke = () => {
  return (
    <Grid container direction='column' gap={2}>
      <Grid item>
        <Typography variant='body1' color='black'>
          Current joke end time is 12h 30 min
        </Typography>
      </Grid>
      <Grid item>
        <TextField fullWidth placeholder='Enter time ' />
      </Grid>
      <Grid item container justifyContent='flex-end' gap={1}>
        <Button
          sx={{
            color: 'red',
            textTransform: 'capitalize',
          }}
          onClick={() => {
            setEndTime((prev) => ({
              ...prev,
              isUpdated: false,
              data: null,
            }));
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          disableElevation
          sx={{
            color: 'green',
            textTransform: 'capitalize',
            ':hover': {
              backgroundColor: '#fff',
            },
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
