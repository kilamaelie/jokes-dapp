'use client';
import React, { useRef } from 'react';
import Grid from '@mui/material/Grid2';
import { AppBar, Typography, Chip, Button } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { injected } from 'wagmi/connectors';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { shortAccount } from '../hook/shortAccount';

export const NavBar = () => {
  const navBack = useRef(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectAsync } = useConnect();

  navBack.current = trigger;

  return (
    <AppBar
      position='fixed'
      elevation={0}
      component='nav'
      style={{
        background: !navBack.current ? `rgb(0, 0, 0,0)` : `hsla(0,0%,7%,.10)`,
        backdropFilter: 'blur(12px)',
      }}
      sx={{
        alignItems: 'center',
      }}
    >
      <Grid
        item
        size={{
          xs: 10,
          sm: 10,
          md: 8,
          xl: 6,
        }}
        sx={{
          margin: '20px 0px',
        }}
        container
        justifyContent='space-between'
        alignContent='center'
      >
        <Grid item container alignItems='center'>
          <Typography variant='h3' color='primary.main'>
            Joke DApp
            <Typography variant='h3' color='#FFD493' component='span'>
              .
            </Typography>
          </Typography>
        </Grid>

        <Grid item>
          {isConnected ? (
            <Chip
              label={shortAccount(address)}
              variant='outlined'
              onDelete={() => disconnect()}
            />
          ) : (
            <Button
              sx={{
                margin: '15px 0px',
                textTransform: 'capitalize',
                color: '#FFD493',
              }}
              onClick={() => connectAsync({ connector: injected() })}
            >
              Connect
            </Button>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
};
