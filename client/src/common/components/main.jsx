'use client';
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DialogBox } from '../utils/dialog';
import { AddJoke } from './addJoke';
import { UpdateJoke } from './updateJoke';
import abi from '../../lib/JokeDappABI.json';
import { injected } from 'wagmi/connectors';

import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { formatEther, parseEther } from 'viem';
import useTimeFormatter from '../hook/useTimeFormatter';
import { Jokes } from './jokes';

export const MainContent = () => {
  const { address } = useAccount();
  const { connectAsync } = useConnect();
  const [endTime, setEndTime] = useState(false);
  const [joke, setJoke] = useState(false);

  const {
    data: entryFees,
    isLoading: isLoadingEntryFees,
    isError: isErrorEntryFees,
    error: errorEntryFees,
  } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'entryFees',
  });

  const {
    data: jokeEndTime,
    isLoading: isLoadingJokeEndTime,
    refetch: refreshJokeEndTime,
  } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'getRemaindingTime',
  });
  const { data: owner } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'owner',
  });

  const formattedTime = useTimeFormatter(jokeEndTime);

  const { data: hasPaid, refetch: hasPaidRefetch } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'hasPaidEntryFees',
    args: [address],
  });

  const { writeContractAsync } = useWriteContract();

  const handlePayEntryFees = async () => {
    if (!address) {
      await connectAsync({ connector: injected() });
    }

    const feesInWei = parseEther(entryFees.toString());
    await writeContractAsync({
      address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
      functionName: 'payEntryFees',
      abi: abi,
      args: [feesInWei],
    });
    hasPaidRefetch();
  };

  const {
    data: allJokes,
    isLoading: isLoadingAllJokes,
    refetch: refetchAllJoke,
  } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'getAllJokes',
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
            {isLoadingJokeEndTime ? 'loading ...' : formattedTime}
          </Typography>
        </Grid>

        {hasPaid ? (
          <Grid item>
            <Jokes allJokes={allJokes} isLoadingAllJokes={isLoadingAllJokes} />
          </Grid>
        ) : (
          <Grid item container justifyContent='center'>
            {isLoadingEntryFees ? (
              <Typography color='black'>Loading ...</Typography>
            ) : (
              <Button variant='outlined' onClick={() => handlePayEntryFees()}>
                Get's start with {formatEther(entryFees)} Eth
              </Button>
            )}
            {isErrorEntryFees && <Typography>{errorEntryFees}</Typography>}
          </Grid>
        )}
        <Grid
          item
          container
          direction='row'
          spacing={1}
          justifyContent='center'
        >
          <Grid item>
            <Button>Reward</Button>
          </Grid>

          {address === owner && (
            <>
              <Grid item>
                <Button>Withdrawal</Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setJoke(!joke);
                  }}
                >
                  Add joke
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setEndTime(!endTime);
                  }}
                >
                  Update time
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <DialogBox
        open={endTime}
        title={
          <Typography variant='subtitle1' color='black'>
            Update End time
          </Typography>
        }
        content={
          <UpdateJoke
            close={() => setEndTime(!endTime)}
            formattedTime={formattedTime}
            refreshJokeEndTime={refreshJokeEndTime}
          />
        }
      />
      <DialogBox
        title={
          <Typography variant='subtitle1' color='black'>
            Add a joke
          </Typography>
        }
        open={joke}
        content={
          <AddJoke
            close={() => setJoke(false)}
            refetchAllJoke={refetchAllJoke}
          />
        }
      />
    </Grid>
  );
};
