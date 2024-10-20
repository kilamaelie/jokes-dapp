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
import { LoadingButton } from '@mui/lab';

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
    refetch: refreshEntryFees,
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

  const { writeContractAsync, isPending: isPendingPayEntryFee } =
    useWriteContract();

  const handlePayEntryFees = async () => {
    if (!address) {
      await connectAsync({ connector: injected() });
    }

    const feesInWei = parseEther('0.2');
    const data = await writeContractAsync({
      address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
      functionName: 'payEntryFees',
      abi: abi,
      value: feesInWei,
      // gasLimit: 3000000,
    });
    if (data) {
      hasPaidRefetch();
      refreshEntryFees();
    }
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
  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'getContractBalance',
  });

  const { writeContractAsync: reward, isPendingReward } = useWriteContract();
  const { writeContractAsync: Withdrawal, isPendingWithdrawal } =
    useWriteContract();

  console.log('====================================');
  console.log(jokeEndTime);
  console.log('====================================');

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
            Try your luck 😀 🚀, balance:&nbsp;
            {isLoadingBalance ? 'Loading ...' : formatEther(balance)} ETH
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
              <LoadingButton
                loading={isPendingPayEntryFee}
                variant='outlined'
                onClick={() => handlePayEntryFees()}
              >
                Get's start with {formatEther(entryFees)} ETH
              </LoadingButton>
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
            <LoadingButton
              loading={isPendingReward}
              onClick={async () =>
                await reward({
                  abi: abi,
                  address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
                  functionName: 'claimReward',
                })
              }
            >
              Reward
            </LoadingButton>
          </Grid>

          {address === owner && (
            <>
              <Grid item>
                <LoadingButton
                  loading={isPendingWithdrawal}
                  onClick={async () =>
                    await Withdrawal({
                      abi: abi,
                      address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
                      functionName: 'withdrawal',
                    })
                  }
                >
                  Withdrawal
                </LoadingButton>
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
