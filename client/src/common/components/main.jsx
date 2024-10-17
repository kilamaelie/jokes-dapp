'use client';
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DialogBox } from '../utils/dialog';
import { AddJoke } from './addJoke';
import { UpdateJoke } from './updateJoke';

export const MainContent = () => {
  const [endTime, setEndTime] = useState({
    isUpdated: false,
    time: null,
  });
  const [joke, setJoke] = useState({
    isAdded: false,
  });

  return (
    <Grid
      item
      container
      direction='column'
      marginTop={'50px'}
      justifyContent='center'
      alignItems='center'
    >
      <Grid item container direction='column' gap={4} marginTop={10}>
        <Grid item>
          <Typography variant='h5' align='center'>
            Joke Dapp is a playful decentralized application (DApp)
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant='body1'
            align='center'
            sx={{
              color: '#00DAEF',
            }}
          >
            Try your luck 😀 🚀
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant='body1'
            align='center'
            sx={{
              color: '#FFD493',
            }}
          >
            1d 12 h 30 min 45 sec
          </Typography>
        </Grid>
        <Grid item container justifyContent='center'>
          <Button variant='outlined'>Get's start with 1 eth</Button>
        </Grid>
        {/* <Grid item>
         <Jokes/>
        </Grid> */}
        <Grid item container direction='row' spacing={1}>
          <Grid item>
            <Button>Reward</Button>
          </Grid>
          <Grid item>
            <Button>Withdrawal</Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setJoke((prev) => ({
                  ...prev,
                  isAdded: true,
                }));
              }}
            >
              Add joke
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setEndTime((prev) => ({
                  ...prev,
                  isUpdated: true,
                  data: null,
                }));
              }}
            >
              Update time
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DialogBox
        open={endTime.isUpdated}
        title={
          <Typography variant='subtitle1' color='black'>
            Update End time
          </Typography>
        }
        content={<UpdateJoke />}
      />
      <DialogBox
        title={
          <Typography variant='subtitle1' color='black'>
            Add a joke
          </Typography>
        }
        open={joke.isAdded}
        content={<AddJoke />}
      />
    </Grid>
  );
};
